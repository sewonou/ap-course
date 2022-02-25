import React from 'react';
import Navbar from "../components/Navbar";

const HomePage = (props) =>{
    return (
        <div className="jumbotron mt-3">
            <h1 className="display-3">Bienvenue sur SymReact !</h1>
            <p className="lead">Lorem ipsum dolor sit amet. Et voluptatum consequuntur non expedita omnis eos molestias consequatur cum impedit harum. Ea consectetur maxime in iure unde quo iure deserunt est maxime nihil ut eaque Quis. Aut beatae ipsam ea voluptas minus est exercitationem consequatur.</p>
            <hr className="my-4" />
                <p>Lorem ipsum dolor sit amet. Et voluptatum consequuntur non expedita omnis eos molestias consequatur cum impedit harum.?</p>
                <p className="lead">
                    <a className="btn btn-outline-primary rounded-pill btn-lg" href="#" role="button">Learn more</a>
                </p>
        </div>
    );
};

export  default HomePage;