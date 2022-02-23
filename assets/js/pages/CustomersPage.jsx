import React, {useEffect, useState} from 'react';
import Pagination from "../components/Pagination";

import CustomersAPI from "../services/customersAPI";

const CustomersPage = (props) =>{
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const  itemsPerPage = 10;

    // Récupération des Customers
    const  fetchCustomers = async () => {
        try{
            const data = await CustomersAPI.findAll();
            setCustomers(data);
        }catch (error) {
            console.log(error.response)
        }
    };

    // Charger les customers au chargement des composants
    useEffect(() => {
        fetchCustomers();
        }, []
    );

    //  GEstion de la suppression
    const handleDelete = async (id) => {
        const  originalCustomers = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id));

        try{
            await CustomersAPI.delete(id);
        }catch (error) {
            setCustomers(originalCustomers);
        }

    };

    const handlePageChange = (page) => setCurrentPage(page);
    /**
     * Gestion de la recherche
     * @param currentTarget
     */
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    const  filteredCustomers = customers.filter(
        c =>
            c.firstName.toLowerCase().includes(search.toLowerCase()) ||
            c.lastName.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase()) ||
            (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
    );

    //Gestion  de la pagination
    const paginatedCustomers = Pagination.getData(
        filteredCustomers,
        currentPage,
        itemsPerPage
    );
    /*const paginatedCustomers = filteredCustomers.length > itemsPerPage ? Pagination.getData(
        filteredCustomers,
        currentPage,
        itemsPerPage
    ) : filteredCustomers ;*/


    return (
        <>
            <h1>Liste des clients</h1>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Rechercher ..." onChange={handleSearch} value={search}/>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id.</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th className="text-center">Entreprise</th>
                        <th className="text-center">Factures</th>
                        <th className="text-center">Montant total</th>
                        <th />
                    </tr>
                </thead>

                <tbody>
                {
                    paginatedCustomers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>
                                <a href="#">{customer.firstName} {customer.lastName}</a>
                            </td>
                            <td>{customer.email}</td>
                            <td>{customer.company}</td>
                            <td className="text-center lead">
                                <span className="badge bg-primary ">{customer.invoices.length}</span>
                            </td>
                            <td className="text-center">{customer.totalAmount.toLocaleString()} €</td>
                            <td className="text-center">
                                <button
                                    onClick={()=> handleDelete(customer.id)}
                                    disabled={customer.invoices.length > 0}
                                    className="btn btn-sm btn-danger rounded-pill">
                                    supprimer
                                </button>
                            </td>
                        </tr>
                    ))
                }

                </tbody>
            </table>
            { filteredCustomers.length > itemsPerPage && (<Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredCustomers.length}
                onPageChanged={handlePageChange} />)
            }

        </>

    );
};

export  default CustomersPage;