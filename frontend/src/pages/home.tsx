import { url } from 'inspector';
import React from 'react';
import '../styles/home.css';
import logo from '../styles/logo-hero.png';

function Home(){
    return (
        <div className="container">
            <div id="logo">
                <img src={logo} alt=""/>
            </div>
            <div className="inputs">
                <div className="texts">
                    <h1>GitFind</h1>
                    <span>Nearest devs & repositories</span>
                </div>
                <button id="search">Search</button>
                <button id="sign">Want to be found?</button>
            </div>
        </div>
    )
}

export default Home;