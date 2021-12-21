import React from 'react'
import {Link} from "react-router-dom";
import  "./Header.css";
import Login from "../Login/Login";

const Header = ({isSuccess,handleLogout}) => {


    const Links = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'To-Do',
            path: '/todo'
        },
        {
            name: 'Expense',
            path: '/expense'
        }
        ,

    ]

    return (
        <header className="header" >
            <h5>
                Expense Tracker
            </h5>
            <nav className="nav-items">
               <ul>
                   {
                       Links.map(link => {
                           return (
                               <li className="nav-item" key={link.name}>
                                   <Link  className="nav-link" to={link.path}>{link.name}</Link>
                               </li>
                           )
                       })
                   }
                   {
                       isSuccess ? <li className="nav-item" onClick={handleLogout}>
                           <Link className="nav-link" to="/login">Logout</Link>
                       </li> : <li className="nav-item">
                           <Link className="nav-link" to="/login">Login</Link>
                       </li>
                   }
               </ul>
            </nav>
        </header>
    )
}

export default Header;