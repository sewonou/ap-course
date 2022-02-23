import React from 'react';

const Navbar = (props) => {
    return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">SymReact</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03"
                    aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Clients</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Factures</a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a href="#" className="btn btn-outline-secondary rounded-pill m-lg-1">Inscription</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="btn btn-success rounded-pill m-lg-1"> Connexion</a>
                    </li>
                    <li className="nav-item">
                        <a href="" className="btn btn-danger rounded-pill m-lg-1">Deconnexion</a>
                    </li>

                </ul>
            </div>
        </div>
    </nav>
);
};

export  default Navbar;