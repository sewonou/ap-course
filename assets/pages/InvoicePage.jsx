import React, {useState, useEffect} from 'react';
import Field from "../components/forms/Field";
import Select from "../components/forms/Select"
import {Link} from "react-router-dom";
import CustomersAPI from "../services/customersAPI";
import InvoicesAPI from "../services/invoicesAPI"
import {toast} from "react-toastify";

const InvoicePage = ({match, history}) => {
    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: "SENT"
    });

    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status: ""
    });

    const {id = "new"} = match.params;

    const [editing, setEditing] = useState(false);

    const [customers, setCustomers] = useState([]);

    /**
     * RECUPERATION DU CUSTOMER EN FONCTION DE L'ID
     * @param id
     * @returns {Promise<void>}
     */
    const fetchInvoice = async id => {
        try {

            const {amount, customer, status} = await InvoicesAPI.find(id);
            setInvoice({amount, customer: customer.id, status});

        }catch (error) {
            //console.log(error.response);
            // TODO : Notification d'une erreur
            toast.error("Impossible de charger la facture")
            history.replace("/invoices");

        }
    };

    const fetchCustomers = async () =>{
        try{
            const  data = await CustomersAPI.findAll();
            setCustomers(data);

            if(!invoice.customer) setInvoice({...invoice, customer: data[0].id});

        }catch(error){
            //console.log(error.response);
            // TODO : Notification d'une erreur
            toast.error("Impossible de chargé les clients");
            history.replace("/invoices");

        }
    };

    useEffect(()=>{
        fetchCustomers();

    }, []);

    useEffect(()=>{
        if(id !== "new"){
            setEditing(true);
            fetchInvoice(id);
        }
    }, [id]);


    /**
     * Gestion des changement des input dans le formulaire
     * @param currentTarget
     */

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setInvoice({...invoice, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if(editing){
                await InvoicesAPI.update(id, invoice);
                setErrors({});
                // TODO : Flash de notification de succès
                toast.success("La facture " + invoice.chrono  +" a bien été modifier!");
            }else{
                await InvoicesAPI.create(invoice);
                setErrors({});
                // TODO : Flash de notification de succès
                toast.success("La facture " + invoice.chrono  +" a bien été enregistrer!");
                history.replace("/invoices")

            }

        }catch ({response}) {
            const {violations} = response.data ;
            if(violations){
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                });
                setErrors(apiErrors);

                // TODO : NOTIFICATION D'EREURS
                toast.error("Une erreur est surenue. Veuillez recommencer la sauvergade de la facture !")
            }
        }
    };

    return (<>
            <h1>Création d'une facture</h1>
            <form onSubmit={handleSubmit}>
                <Field
                name="amount"
                type="number"
                placeholder="Le montant de la facture"
                label="Montant"
                value={invoice.amount}
                onChange={handleChange}
                error={errors.amount}
                />
                <Select
                    name="customer"
                    label="Clients"
                    value={invoice.customer}
                    onChange={handleChange}
                    error={errors.customer}
                >
                    {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.firstName} {customer.lastName}</option>)}
                </Select>
                <Select
                    name="status"
                    label="Statut"
                    value={invoice.status}
                    onChange={handleChange}
                    error={errors.status}
                >
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED"> Annulée</option>
                </Select>
                <div className="form-group mt-2">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/invoices" className="btn btn-link" >Retour aux factures</Link>
                </div>
            </form>
        </>
    );
};

export default InvoicePage