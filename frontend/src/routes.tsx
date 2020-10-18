import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Maps from './pages/maps';
import Sign from './pages/sign';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>

                <Route path="/" exact component={Home}/>
                <Route path="/maps" component={Maps}/>
                <Route path="/sign" component={Sign}/>

            </Switch>            
        </BrowserRouter>
    )
}

export default Routes;