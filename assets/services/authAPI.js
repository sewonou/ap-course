import  axios from  'axios';
import jwtDecode from 'jwt-decode';
import {LOGIN_API} from "./config";

/*
* Déconnexion (suppression tu token du local storage et sur axios)
 */
function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

/**
 * Requete HTTP pour ajouter les authorisation vi axios
 * @param token
 */
function setAxiosToken(token){
    axios.defaults.headers["Authorization"] = "Bearer " + token ;
}

/***
 * Authentification et stockage du tocken dans le local storage
 * @param credentials
 * @returns {Promise<AxiosResponse<T>>}
 */
function authenticate(credentials) {
        return axios
            .post(LOGIN_API, credentials)
            .then(response => response.data.token)
            .then(token => {
                    //Stockage du token dans le local storage
                    window.localStorage.setItem("authToken", token);
                    // Prevenir axior de la mise ne place d'un header par défaut sur toute les requete HTTTP
                    setAxiosToken(token);
            })
}

/**
 * Mise en place lors du chargement de l'application du token
 */

function setup() {
    const token = window.localStorage.getItem("authToken");

    if(token){
        const {exp: expiration} = jwtDecode(token);
        if (expiration*1000 > new Date().getTime()){
            axios.defaults.headers["Authorization"] = "Bearer " + token ;
            setAxiosToken(token);
        }
    }
}

/***
 * Permet de savoir si on est authentifier.
 * @returns {boolean}
 */
function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");

    if(token){
        const {exp: expiration} = jwtDecode(token);
        if (expiration*1000 > new Date().getTime()){
            axios.defaults.headers["Authorization"] = "Bearer " + token ;
            setAxiosToken(token);
            return true
        }
        return false;
    }
    return false;
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
};