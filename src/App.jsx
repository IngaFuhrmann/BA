import React from 'react';
import {HashRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar'
import ECom from './components/pages/ECom';
import Sicherheit from './components/pages/Secur';
import EBusiness from './components/pages/Business';
import './styles/App.css';
import Gesellschaft from './components/pages/Gesellschaft';


export default function Appl() {
  return (
  
        <div className="wrapMain">
        
      <Router>
        <NavBar/>
        <Switch>
            <Route path="/" exact component={Gesellschaft}/>
            <Route path="/Gesellschaft"  component={Gesellschaft}></Route>
            <Route path="/ECom" component={ECom}></Route> 
            <Route path="/Sicherheit" component={Sicherheit}></Route> 
            <Route path="/EBusiness" component={EBusiness}></Route> 
        </Switch>
     </Router>
    
     </div>
    
    );

}