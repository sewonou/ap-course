import React, {useContext} from 'react';
import AuthAPI from '../services/authAPI';
import { NavLink } from 'react-router-dom';
import AuthContext from "../context/AuthContext";
import {toast} from "react-toastify";



const Navbar = ({history}) => {
    const {isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const handleLogout = () => {
        AuthAPI.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes désormais déconnecter ");
        history.push("/login");
    };


    return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">SymReact</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03"
                    aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customers">Clients</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/invoices">Factures</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {!isAuthenticated && <>
                        <li className="nav-item">
                            <NavLink to="/register" className="btn btn-outline-secondary rounded-pill m-lg-1">Inscription</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/login" className="btn btn-success rounded-pill m-lg-1"> Connexion</NavLink>
                        </li>
                    </> ||
                    <li className="nav-item">
                        <button onClick={handleLogout} className="btn btn-danger rounded-pill m-lg-1">Deconnexion</button>
                    </li>
                    }
                </ul>
            </div>
        </div>
    </nav>
);
};

export  default Navbar;