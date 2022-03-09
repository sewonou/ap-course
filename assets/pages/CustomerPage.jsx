import React, {useState, useEffect} from 'react';
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import CustomersAPI from '../services/customersAPI'
import {toast} from "react-toastify";



const CustomerPage = ({match, history}) => {

    const {id = "new"} = match.params;


    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    }) ;

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    }) ;

    const [editing, setEditing] = useState(false);
    /**
     * RECUPERATION DU CUSTOMER EN FONCTION DE L'ID
     * @param id
     * @returns {Promise<void>}
     */
    const fetchCustomer = async id => {
        try {
            const {firstName, lastName, email, company} = await CustomersAPI.find(id);
            setCustomer({firstName, lastName, email, company});
        }catch (error) {
            //console.log(error.response);
            // TODO : Notification d'une erreur
            toast.error("Une erreur est survenue lors du chargement des clients !");
            history.replace("/customers");
        }
    };
    /**
     * Chargement du customer au changement de l'identifiant
     */
    useEffect(()=> {
        if(id !== "new"){
            setEditing(true);
            fetchCustomer(id);
        }

    }, [id]);


    /**
     * Gestion des changement des input dans le formulaire
     * @param currentTarget
     */

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setCustomer({...customer, [name]: value})
    };
    /**
     * Gestion de la soumission du formulaire
     * @param event
     * @returns {Promise<void>}
     */
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            if(editing){
                await CustomersAPI.update(id, customer);
                setErrors({});
                // TODO : Flash de notification de succès
                toast.success("Le client a bien été modfifier !");
            }else{
                await CustomersAPI.create(customer);
                setErrors({});
                // TODO : Flash de notification de succès
                toast.success("Le client a bien été sauvegarder !");
                history.replace("/customers")

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
                toast.error("Une erreur est survenu lors de la sauvegarde. Veuillez recommencer!");
            }
        }

    };


    return(
        <>
            {!editing && <h1>Création d'un client</h1> || <h1>Modification d'un client</h1>}
            <form onSubmit={handleSubmit} >
                <Field
                    name="lastName"
                    placeholder="Saisir le nom de famille du client"
                    label="Nom de famille"
                    value={customer.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                />
                <Field
                    name="firstName"
                    placeholder="Saisir le(s) prénom(s) du client "
                    label="Le(s) prénom(s) du client"
                    value={customer.firstName}
                    onChange={handleChange}
                    error={errors.lastName}
                />
                <Field
                    name="email"
                    type="email"
                    placeholder="Adresse email du client"
                    label="Adresse email du client"
                    value={customer.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <Field
                    name="company"
                    placeholder="Saisir la société du client"
                    label="La société"
                    value={customer.company}
                    onChange={handleChange}
                    error={errors.company}
                />


                <div className="form-group mt-2">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/customers" className="btn btn-link" >Retour à la liste</Link>
                </div>

            </form>
        </>
    );
};

export default CustomerPage;