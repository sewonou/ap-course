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
import { ToastContainer, toast } from 'react-toastify';
// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import 'react-toastify/dist/ReactToastify.css';

// start the Stimulus application
import './bootstrap';

import CustomersPage from "./pages/CustomersPage";
//import CustomersPageWithPagination from "./pages/CustomerPageWithPagination";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import AuthAPI from "./services/authAPI";
import AuthContext  from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import CustomerPage from "./pages/CustomerPage";
import InvoicePage from "./pages/InvoicePage";
import RegisterPage from "./pages/RegisterPage";

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
                    <Route path="/register" component={RegisterPage}/>
                    <PrivateRoute path="/customers" component={CustomersPage}/>
                    <PrivateRoute path="/customers/:id" component={CustomerPage}/>
                    <PrivateRoute path="/invoices" component={InvoicesPage}/>
                    <PrivateRoute path="/invoices/:id" component={InvoicePage}/>
                    <Route path="/" component={HomePage} />
                </Switch>
            </main>

        </HashRouter>
        <ToastContainer position ={toast.POSITION.BOTTOM_RIGHT} icon={true} />
        </AuthContext.Provider>
    );
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);
