import React, {useState, useContext} from 'react';
import authAPI from "../services/authAPI";
import AuthContext from "../context/AuthContext";


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

            <form onSubmit={handleSubmit} method="post">
                <div className="form-group">
                    <label htmlFor="username">Adresse email</label>
                    <input
                        value={credentials.username}
                        onChange={handleChange}
                        type="text"
                        className={"form-control" + (error && " is-invalid")}
                        placeholder="Adresse email de connexion"
                        name="username"
                        id="username"
                        autoComplete="username"
                    />
                    {error && <p className="invalid-feedback">{error}</p>}
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="password" className="">Mot de passe</label>
                    <input
                        value={credentials.password}
                        onChange={handleChange}
                        type="password"
                        className={"form-control" + (error && " is-invalid")}
                        placeholder="Mot de passe de connexion"
                        name="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {error && <p className="invalid-feedback">{error}</p>}
                </div>
                <div className="form-group mt-2">
                    <button type="submit" className="btn btn-success">Je me connecte</button>
                </div>
            </form>
        </>
    );
};

export default LoginPage;
