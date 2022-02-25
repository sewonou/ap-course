/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

//les  importation de react

import React, {useState, useContext} from 'react';
import ReactDOM from 'react-dom';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import {HashRouter, Switch, Route, withRouter} from  'react-router-dom';

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';
import CustomersPage from "./pages/CustomersPage";
//import CustomersPageWithPagination from "./pages/CustomerPageWithPagination";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import AuthAPI from "./services/authAPI";
import AuthContext  from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

AuthAPI.setup();

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(
        AuthAPI.isAuthenticated()
    );

    const NavbarWithRouter = withRouter(Navbar);
    return(
        <AuthContext.Provider value={
            {isAuthenticated, setIsAuthenticated}
        }>
        <HashRouter>
            <NavbarWithRouter />
            <main className="container pt-5">
                <Switch>
                    <Route path="/login" component={LoginPage}/>
                    <PrivateRoute path="/customers" component={CustomersPage}/>
                    <PrivateRoute path="/invoices" component={InvoicesPage}/>
                    <Route path="/" component={HomePage} />
                </Switch>
            </main>
        </HashRouter>
        </AuthContext.Provider>
    );
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);
