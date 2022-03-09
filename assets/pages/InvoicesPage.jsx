import React, {useEffect, useState} from 'react';
import Pagination from "../components/Pagination";
import moment from 'moment';
import InvoicesAPI from "../services/invoicesAPI";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";

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
    const [loading, setLoading] = useState(true);
    const  itemsPerPage = 10;

    //Récupértion des invoices
    const fetchInvoices = async  () => {
        try{
            const  data = await InvoicesAPI.findAll();
            setInvoices(data);
            setLoading(false);
        }catch (error) {
            //console.log(error.response);
            toast.error("Uen erreur est survenu lors du chargement des factures !")
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
            await InvoicesAPI.delete(id);
            toast.success("la facture à bien été supprimer");
            
        }catch (error) {
            //console.log(error.response);
            setInvoices(originalnvoices);
            toast.error("Une erreur est survenue")
        }

    };

    return (
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1>Liste des Facture</h1>
                <Link to="/invoices/new" className="btn btn-primary">Créer une facture</Link>
            </div>

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
                {!loading && <tbody>
                {paginatedInvoices.map(invoice =>
                    <tr key={invoice.id}>
                        <td>{invoice.id}</td>
                        <td>
                            <Link to={"/customers/" + invoice.customer.id}>{invoice.customer.firstName}  {invoice.customer.lastName}</Link>

                        </td>
                        <td className="text-center">{formatDate(invoice.sentAt)}</td>
                        <td className="text-center">
                            <span className={"badge bg-" + STATUS_CLASSES[invoice.status]}>{STATUS_LABELS[invoice.status]}</span>
                        </td>
                        <td className="text-center">{invoice.amount.toLocaleString()}€</td>
                        <td className="text-right">
                            <Link
                                to={"/invoices/" +invoice.id}
                                className="btn btn-sm btn-primary rounded-pill m-lg-1">
                                editer
                            </Link>
                            <button
                                onClick={()=> handleDelete(invoice.id)}
                                className="btn btn-sm btn-danger rounded-pill">
                                supprimer
                            </button>
                        </td>
                    </tr>
                )}

                </tbody>}
            </table>
            {loading && <TableLoader /> }
            <Pagination length={filteredInvoices.length} currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChanged={handlePageChange}/>
        </>
    );
};

export default InvoicesPage;