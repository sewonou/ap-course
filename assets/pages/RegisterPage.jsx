import React, {useState} from 'react';
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import userAPI from "../services/userAPI"

const RegisterPage = ({history}) => {
    const [user,setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""

    });

    const [errors,setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""

    });

    /**
     * Gestion des changement des input dans le formulaire
     * @param currentTarget
     */

    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({...user, [name]: value})
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const apiErrors = {};
        if(user.password!== user.passwordConfirm){
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
            setErrors(apiErrors);
            return;
        }

        try{
            await userAPI.create(user);
            setErrors({});
            history.replace("/login");
            // TODO : NOTIFICATION DE SUCCES

        }catch ({response}) {
            console.log(response);
            const {violations} = response.data ;
            if(violations){

                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                });
                setErrors(apiErrors);

                // TODO : NOTIFICATION D'EREURS
            }
        }
        console.log(user);
    };

    return (<>
        <h1>Inscription</h1>
        <form onSubmit={handleSubmit}>
            <Field
                name="firstName"
                label="Prénom"
                placeholder="Votre joli prénom"
                type="text"
                onChange={handleChange}
                value={user.firstName}
                error={errors.firstName}

            />

            <Field
                name="lastName"
                label="Nom de famille"
                placeholder="Votre nom de famille"
                type="text"
                onChange={handleChange}
                value={user.lastName}
                error={errors.lastName}

            />
            <Field
                name="email"
                label="Adresse email"
                placeholder="Votre adresse email"
                type="email"
                onChange={handleChange}
                value={user.email}
                error={errors.email}
            />
            <Field
                name="password"
                label="Mot de passe"
                placeholder="Votre mot de passe ultra sécurisé"
                type="password"
                onChange={handleChange}
                value={user.password}
                error={errors.password}
            />
            <Field
                name="passwordConfirm"
                label="Confirmation de Mot de passe"
                placeholder="Confirmez votre super mot de passe "
                type="password"
                onChange={handleChange}
                value={user.passwordConfirm}
                error={errors.passwordConfirm}
            />

            <div className="form-group mt-2">
                <button type="submit" className="btn btn-success rounded-pill">Confirmation</button>
                <Link to="/login" className="btn btn-link" >J'ai déjà un compte</Link>
            </div>
        </form>
        </>);
};

export default RegisterPage;