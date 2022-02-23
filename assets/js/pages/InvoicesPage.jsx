import React, {useEffect, useState} from 'react';
import Pagination from "../components/Pagination";
import axios from 'axios';
import moment from 'moment';
import InvoiceAPI from "../services/invoicesAPI";

const STATUS_CLASSES = {
    PAID : "primary",
    SENT : "info",
    CANCELLED : "danger"
};

const STATUS_LABELS = {
    PAID : "Payée",
    SENT : "Envoyée",
    CANCELLED : "Annulée"
};

const InvoicesPage = (props) => {

    const [invoices, setInvoices] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const  itemsPerPage = 10;

    //Récupértion des invoices
    const fetchInvoices = async  () => {
        try{
            const  data = await InvoiceAPI.findAll();
            setInvoices(data);
        }catch (error) {
            console.log(error.response);
        }
    };

    // Charger les invoices au chargement des composants
    useEffect(() => {
        fetchInvoices();
    });

    const handlePageChange = (page) => setCurrentPage(page);

    // Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    //Formatage des dates
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    //Gestion des filtres de recherche

    const filteredInvoices = invoices.filter(
        i =>
            i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
            i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
            i.amount.toString().toLowerCase().startsWith(search.toLowerCase()) ||
            STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
    );

    //Gestion  de la pagination
    const paginatedInvoices = Pagination.getData(
        filteredInvoices,
        currentPage,
        itemsPerPage
    );

    // Gestion de la supression
    const handleDelete = async (id) => {
        const  originalnvoices = [...invoices];
        setInvoices(invoices.filter(invoice => invoice.id !== id));
        try {
            await InvoiceAPI.delete(id);
            
        }catch (error) {
            console.log(error.response);
            setInvoices(originalnvoices);
        }

    };

    return (
        <>
            <h1>Liste des factures</h1>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Rechercher ..." onChange={handleSearch} value={search}/>
            </div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Numéro</th>
                    <th>Client</th>
                    <th className="text-center">Date d'envoi</th>
                    <th className="text-center">Statut</th>
                    <th className="text-center">Montant</th>
                    <th className="text-right"> </th>
                </tr>
                </thead>
                <tbody>
                {paginatedInvoices.map(invoice =>
                    <tr key={invoice.id}>
                        <td>{invoice.id}</td>
                        <td>
                            <a href="#">{invoice.customer.firstName}  {invoice.customer.lastName}</a>

                        </td>
                        <td className="text-center">{formatDate(invoice.sentAt)}</td>
                        <td className="text-center">
                            <span className={"badge bg-" + STATUS_CLASSES[invoice.status]}>{STATUS_LABELS[invoice.status]}</span>
                        </td>
                        <td className="text-center">{invoice.amount.toLocaleString()}€</td>
                        <td className="text-right">
                            <button
                                /*onClick={()=> handleDelete(invoice.id)}*/
                                className="btn btn-sm btn-primary rounded-pill m-lg-1">
                                editer
                            </button>
                            <button
                                onClick={()=> handleDelete(invoice.id)}
                                className="btn btn-sm btn-danger rounded-pill">
                                supprimer
                            </button>
                        </td>
                    </tr>
                )}

                </tbody>
            </table>
            <Pagination length={filteredInvoices.length} currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChanged={handlePageChange}/>
        </>
    );
};

export default InvoicesPage;