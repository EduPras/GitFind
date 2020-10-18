import { url } from 'inspector';
import React from 'react';
import '../styles/home.css';
import logo from '../styles/logo-hero.png';
import githubServices from '../services/github';

function Home(){
    return (
        
        <div className="container">
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet"></link>
            <div id="logo">
                <img src={logo} alt=""/>
            </div>
            <div className="inputs">
                <div className="texts">
                    <h1>GitFind</h1>
                    <span>Nearest devs & repositories</span>
                </div>
                <button id="search" onClick={async ()=>{
                    const data = await githubServices.getDataRepos('edupras');
                    console.log(data)
                }}>Search</button>
                <button id="sign">Want to be found?</button>
            </div>
        </div>
    )
}

export default Home;