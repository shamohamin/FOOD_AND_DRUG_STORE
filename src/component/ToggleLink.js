import React from "react";
import { Link , Route } from "react-router-dom";
import '../style/navbar.css';
// import '../custom.scss'

export class ToggleLink extends React.Component {
    render(){
        return <Route path={this.props.to} exact={this.props.exact}
                    children={routeProps => {
                        const baseClass = "nav-link text-secondary" ;
                        const activeClass = 'text-danger' ;
                        const combineClass = 
                                `${baseClass} ${routeProps.match ? activeClass : ""}`;

                        return <Link to={this.props.to} exact={this.props.exact} 
                                    className={combineClass}>
                            {this.props.children}
                        </Link>
                    }} />
    }
}