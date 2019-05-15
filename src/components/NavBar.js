import React from 'react'
import 'materialize-css/dist/css/materialize.min.css'
/*
Dependencies:
Materialize CSS:
    - How do we want to bring in materialize?
        - CDN links in HTML
        - Download and include in project folders
        - react-materialize
App.js
    - import NavBar from './components/NavBar'
    - <NavBar/> in return function
*/

class NavBar extends React.Component {
    render() {
        return (
            <React.Fragment>
            <nav className="green ">
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo center" >JobHunters</a>
                    <a href="#" data-target="mobile-links" className="sidenav-trigger">
                        <i className="material-icons">menu</i>
                    </a>
                    <ul className="right hide-on-med-and-down">
                        <li >
                            <a href="#">About</a>
                        </li>  
         
                        <li onClick={this.props.handleLogout}>
                        <a href="#">Log Out</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-links">
                <li>
                    <a href="#">Link 1</a>
                </li>
                <li>
                    <a href="#">Link 2</a>
                </li>
                <li>
                    <a href="#">Link 3</a>
                </li>
            </ul>
            </React.Fragment>
        )
    }
}

export default NavBar