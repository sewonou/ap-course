import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Pagination from "../components/Pagination";

const CustomersPageWithPagination = (props) =>{
    const [customers, setCustomers] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] =useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const  itemsPerPage = 10;
    //http://127.0.0.1:8000/api/customers?pagination=true&count=8&page=4
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/customers?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
            .then(response=>{
                setCustomers(response.data["hydra:member"]);
                setTotalItems(response.data["hydra:totalItems"]);
                setLoading(false);
            })
            .catch(error => console.log(error.response));
    }, [currentPage]);

    const handleDelete = id => {
        const  originalCustomers = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id));

        axios.delete("http://localhost:8000/api/customers/" + id)
            .then(response => console.log("ok"))
            .catch(error => {
                setCustomers(originalCustomers);
                console.log(error.response)
            })
        ;
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setLoading(true)
    };

    const paginatedCustomers = Pagination.getData( customers, currentPage, itemsPerPage);


    return (
        <>
            <h1>Liste des clients (pagination)</h1>
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
                { loading && (
                    <tr >
                        <td colSpan="7" >Chargement ...</td>
                    </tr>
                )}
                { !loading &&
                customers.map(customer => (
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
                ))}

                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={totalItems}
                onPageChanged={handlePageChange}
            />

        </>

    );
};

export  default CustomersPageWithPagination;