import React, {useState, useContext} from 'react';
import authAPI from "../services/authAPI";
import AuthContext from "../context/AuthContext";
import Field from "../components/forms/Field";

const LoginPage = ({ history}) => {

    const {setIsAuthenticated} = useContext(AuthContext);

    const [credentials,setCredentials] = useState({
        username:"",
        password:""
    });

    const [error, setError] = useState("");
//gestion des champs
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;

        setCredentials({...credentials, [name]:value});
    };
//gestion du submit
    const handleSubmit = async event => {
        event.preventDefault();

        try{
            await  authAPI.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            history.replace("/customers");
        }catch (error) {
            setError("Les informations que vous avez saisie sont incorrecte ! :-(");
        }
    };

    return (
        <>
            <h1>Connexion à l'application</h1>

            <form onSubmit={handleSubmit}>
                <Field
                    label="Adresse email"
                    onChange={handleChange}
                    name="username" value={credentials.username}
                    placeholder="Adresse email de connexion"
                    error={error}
                />
                <Field
                    name="password"
                    label="Mot de passe"
                    onChange={handleChange}
                    type="password"
                    placeholder="Mot de passe de connexion"
                    error={error}
                />
                <div className="form-group mt-2">
                    <button type="submit" className="btn btn-success">Je me connecte</button>
                </div>
            </form>
        </>
    );
};

export default LoginPage;
