import React from 'react';
import {ToggleLink} from './ToggleLink';
import "bootstrap/js/src/collapse.js";
import { connect } from "react-redux";
import { logout } from "../store/ActionTypeAndCreatorForLogin";
import { withRouter } from "react-router-dom";
import { setCategory } from "../store/ActionTyepsAndCreator";

const mergeProps = (props , functionProps , ownProps ) => {
  const functionProp = {
    logout : () =>  {
      functionProps.logout() ;
      ownProps.history.push('/') ;
      window.location.reload() ;
    },
    setCategory : functionProps.setCategory
  }
  return Object.assign({} , props , functionProp , ownProps ) ;
}

export const Navbar = withRouter(connect(ds => ({...ds.loginReducer}) ,
           (dispatch) => ({
    logout : () => dispatch(logout()) ,
    setCategory : (category) => dispatch(setCategory(category))
  }), mergeProps )(
  class extends React.Component{
    constructor(props){
      super(props)
      // console.log(props)
      this.state = {
        isAdmin :  props.user.isAdmin ,
        loggedIn : props.isAuthenticated  ,
        productsShow : false ,
        profileShow : false 
      }
    }

    handelDropDownForProfile = () => {
      this.setState({profileShow : !this.state.profileShow , productsShow : false})
    }

    handelDropDownForProducts = () => {
      this.setState({productsShow : !this.state.productsShow , profileShow : false}) ;
    }

    handelSetcategory = (event) => {
      this.props.setCategory(event.target.name)
    }

    render(){
      
      const menuClassForProducts = `dropdown-menu 
            ${this.state.productsShow ? "show" : ""}` ;
      const menuClassForProfile = `dropdown-menu 
            ${this.state.profileShow ? "show" : ""}` ;      
      // console.log(this.props)
        return <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div ><img style={{width:"25mm" , marginRight:"10px", background:'#6c757d'}} alt="logo" src={require('../img/logo_2.jpg')} /></div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 ml-2 mt-lg-0">
            <li className="nav-item active">
              <div className="row ml-1" style={{marginRight : '5px'}}>
                <span  className="fa fa-home" style={{marginTop : '11px',marginLeft:'5px'
                         , marginRight : '5px'}}></span>
                <ToggleLink to="/" exact={true}>Home</ToggleLink>
              </div>
            </li>
            {!this.props.isAuthenticated ? <React.Fragment>
            <li className="nav-item">
              <div className="row ml-1" style={{marginRight : '7px'}}>
                <span className="fas fa-sign-in-alt" style={{marginTop : '11px',
                    marginLeft:'6px',marginRight:'5px'}}></span>
                <ToggleLink to="/register">Register</ToggleLink>
              </div>
            </li>
            <li className="nav-item">
              <div className="row ml-1" style={{marginRight : '7px'}}>
                <span className="fas fa-sign-in-alt" style={{marginTop : '11px',
                    marginLeft:'6px',marginRight:'5px'}}></span>
                <ToggleLink to="/loggin">login</ToggleLink>
              </div>
            </li> </React.Fragment> : '' 
            }
            <li className="nav-item">
              <div className="row ml-1">
                <span className="fas fa-info-circle" style={{marginTop : '11px',
                    marginLeft:'6px',marginRight:'5px'}} ></span>
                <ToggleLink to="/about">About</ToggleLink>
              </div>
            </li>
            {this.props.user.isAdmin ? 
            <li className="nav-item">
              <div className="row ml-2">
                <span className="fas fa-users-cog" style={{marginTop : '11px',
                    marginLeft:'8px',marginRight:'5px'}} ></span>
                <ToggleLink to="/admin">admin</ToggleLink>
              </div>
            </li> : ''
            }
            { this.props.isAuthenticated ? 
                <li className="nav-item dropdown ml-2">
                <div className="nav-link dropdown-toggle" style={{cursor : 'pointer'}} name="profileShow" onClick={this.handelDropDownForProfile} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  profile
                </div>
                <div className={menuClassForProfile} aria-labelledby="navbarDropdown">
                  <div className="dropdown-item">
                    <ToggleLink  to="/profile">profile</ToggleLink>
                  </div>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" onClick={this.props.logout}
                     href='/'>logout</a>
                </div>
              </li> : ''
            }
            {
              // this.state.loggedIn ? 
              // <li className="nav-item">
              //   <div className="row ml-2">
              //     <span className="fas fa-sign-out-alt" style={{marginTop : '11px',
              //       marginLeft:'8px',marginRight:'5px'}}></span>
              //       <div className="nav-link" onClick={this.props.logout}>
              //         logout
              //       </div>
              //   </div>
              // </li> : ''
            }
            <li className="nav-item dropdown ml-2">
                <div className="nav-link dropdown-toggle" style={{cursor : 'pointer'}} onClick={this.handelDropDownForProducts} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  products
                </div>
                <div className={menuClassForProducts} aria-labelledby="navbarDropdown">
                  <div className="dropdown-item" name="processed" onClick={this.handelSetcategory}>
                    <ToggleLink  to="/product/foods/1">foods</ToggleLink>
                  </div>
                  <div className="dropdown-item" name="pharmaceutical" onClick={this.handelSetcategory}>
                    <ToggleLink  to="/product/drugs/1">medicens</ToggleLink>
                  </div>
                </div>
              </li>
          </ul>
        </div>
      </nav>
    }

}))
