import React, { useEffect, useState } from 'react';
import {  useHistory } from 'react-router';
import githubServices from '../services/github';
import api from '../services/api';
import '../styles/maps.css';
import '../styles/sign.css';
import {FiPlus, FiUserCheck} from 'react-icons/fi'

interface repos{
    repo_name: string,
    languages: {
        lang:string
    }
}

function Sign (){

    const history = useHistory()

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [repos, setRepos] = useState<repos[]>([]);
    const [username, setUsername] = useState('');
    const [techs, setTechs] = useState<string[]>([]);
    const [currentTech, setCurrentTech] = useState('');
    const [description, setDescription] = useState('');

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition( position =>{
            setLatitude(position.coords.latitude.toString())
            setLongitude(position.coords.longitude.toString())           

        })
    }, [])

    async function handleRepos(e:any){
        e.preventDefault();
        console.log(e.target.value)
        const dataRepos = await githubServices.getDataRepos(username);
        setRepos(dataRepos!);
        console.log(dataRepos)
    }

    async function handleSubmit(e:any){
        e.preventDefault();
        
        history.push('/')
    }

    

    return(
        <form className="container-sign">
        <div className="github-info">

            <div className="coords">
                <div id="lat">
                    <span>Latitude</span>
                    <input type="" name="latitude" id="" value={latitude}/>
                </div>
                <div id="lng">
                    <span>Longitude</span>
                    <input type="" name="longitude" id="" value={longitude}/>
                </div>
            </div>

            <div className="github-username">
                <span>github.com/</span>
                <input type="text" placeholder="Your github username" onChange={ (e) => setUsername(e.target.value)}/>
                <button onClick={(e)=>handleRepos(e)}> Send</button>
            </div>


            <div className="repos">
                <ul>
                    {repos.map( repository => {
                        return(
                            <li>{repository.repo_name}</li>
                        )
                    }  )}                    
                </ul>
            </div>
        </div>
        <div className="personal-info">
            <div className="techs">

                <span>Techs</span>

                <div className="input-tech">
                    <input type="text" onChange={e => setCurrentTech(e.target.value)}/>
                    <FiPlus
                        className="addmore"
                        size={30}
                        onClick={ e => {
                            e.preventDefault();
                            var newTechs = techs.concat(currentTech)
                            setTechs(newTechs)     
                                                 
                        } }
                       
                    /> 
                </div>

                <ul className="techs-array">
                {techs.map( tech => {
                    return(
                        <li> <FiUserCheck size={20} color="#0085FF"/>  {tech}</li>
                    )
                })}   
                </ul>
                         
            </div>
            <div className="description">
                <span>Description</span>
                <textarea name="" onChange={ e => setDescription(e.target.value)}></textarea>
            </div>
            <button id="submit" onClick={ async e => {
                e.preventDefault()

                var returnRepos = Object.keys(repos).map(function(index:any){                    
                    return repos[index].repo_name
                });
                console.log({ user: username, repos: returnRepos, coordinates:[latitude, longitude],techs:techs})
                await api.post('/', { user: username, repos: returnRepos, coordinates:[latitude, longitude],techs:techs})
                history.push('/')
            }}>SUBMIT</button>
        </div>
    </form>
    )
}

export default Sign;