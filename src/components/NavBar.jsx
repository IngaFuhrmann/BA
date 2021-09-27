import React from 'react';
import {HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import '../styles/App.css'

export default function NavBar() {

    return (
    <div className="navbar">
       <img className="logo" src={Logo}/>
       <div className="toolbar">

             <Link className="link" to="/Gesellschaft"><i id="icon" className="fas fa-users"></i><br></br>Gesellschaft</Link>
            <br></br>
            
            <Link className="link" to="/ECom"><i id="icon" className="fas fa-shopping-cart"></i><br></br>ECommerce</Link> 
            <br></br>
            <Link className="link" to="/Sicherheit"><i id="icon" className="fas fa-unlock-alt"></i><br></br>Sicherheit</Link>
            <br></br>
            <Link className="link" to="/EBusiness"><i id="icon" className="fas fa-briefcase"></i><br></br>E-Business</Link>

          
        </div>
      
    </div>
    );
}