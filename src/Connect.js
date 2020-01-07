import React from "react";
import {BrowserRouter as Router , Route , Switch , Redirect} 
        from 'react-router-dom' ;
import { HashRouter } from "react-router-dom";
// import { hashHistory } from "react-router";   
// import { hash } from 'react-router-dom';     
import { connect } from "react-redux" ;
import { Home } from "./component/Home" ; 
import {FoodsComponent } from './component/foods/FoodsComponent' ;
import { Loggin } from "./component/logginAndLogout/Loggin" ;
import { RegisterConnector } from "./store/RegisterConnector" ;
import { DataGatterConnector } from "./store/DataGatterConnector" ;
import { USERS, FOODS ,DRUGS } from "./store/DataTypes" ;
import { UsersPage } from "./component/admin/UsersPage" ;
import { ProfileConnector } from "./component/Profile/ProfileConnector" ;
import { Profile } from './component/Profile/Profile' ;
import { LogginPage } from "./component/logginAndLogout/LogginPage" ;
import { LogginPageConnector } from 
        "./component/logginAndLogout/LogginPageConnector" ;
import { Forbidden } from './component/error/Forbidden' ;
import { loggedIn, refreshToken } from "./store/ActionTypeAndCreatorForLogin";
import store from "./store/index";
import { About } from './component/About' ;
import { ProductsEditor } from "./component/admin/ProductsEditor" ;
import { Navbar } from './component/Navbar' ;
import { ToggleLink } from "./component/ToggleLink" ;


const LogginConnector = LogginPageConnector(LogginPage) ;
const ProfileConnect = ProfileConnector(Profile) ;
const ConnectedRegister = RegisterConnector(Loggin) ;
const UserConnected = DataGatterConnector(USERS , UsersPage) ;


export const Connect = connect(ds => ({...ds.loginReducer}))(
    class extends React.Component{

        componentDidMount(){
            if(localStorage.getItem('userInfo')){
              if(this.props.isAuthenticated === false ) {
                // console.log("iam in ");
                  store.dispatch(loggedIn()) ;
              }
            }
            try{
                if(localStorage.getItem('token') !== null && 
                    localStorage.getItem('token') !== undefined){
                    const headers = {
                        'Authorization' : 
                            `Baerer ${JSON.parse(localStorage.getItem('token'))}`  
                    };
                    // console.log(this.props);
                    const user = JSON.parse(localStorage.getItem('userInfo')) ;
                    // console.log(user) ;
                    // console.log(headers) ;
                    store.dispatch(refreshToken(user,headers)) ;
                    setInterval(() => {
                        // console.log(localStorage.getItem('token')) ;
                        const user = this.props.user ;
                        store.dispatch(refreshToken(user,headers)) ;
                    }, 1000*57*60) ;
                }
            }catch(err){
                localStorage.clear() ;
                window.location.reload() ;
            }
            
        }

        redirector = (where) => {
            sessionStorage.setItem('where' , where) ;
            return <Redirect to="/loggin" /> ;
        }

        selectFoodOrDrug = (routeProps) => {

            const mode = routeProps.match.params.mode ;
            let ConnectedComponent ;
            if(typeof(mode) === "undefined" || mode === null ){
                return <Redirect to="/product/foods/1" />
            }else{
                // console.log(mode)
                ConnectedComponent = DataGatterConnector(mode === FOODS ? 
                    FOODS : DRUGS , FoodsComponent ) ;
                return <ConnectedComponent />    
            }
        }

        selectAdminComponent = (routeProps) => {
            let mode = routeProps.match.params.mode ; 

            if(mode === 'editor'){
                return <ProductsEditor />
            }else if(mode === USERS){
                return <UserConnected />
            }else{
                return <Route path="/admin" render={() => <div>
                        <div className="m-4">
                            <Navbar />
                        </div>
                        <ToggleLink to="/admin/users/1" className="btn btn-secondary">
                            Show Users</ToggleLink>
                        <ToggleLink to="/admin/editor" className="btn btn-secondary">
                            Editor For Add Foods and Drugs
                            </ToggleLink>    
                    </div>
                } />
            }
        }

        selectComponent = (routeProps) => {
            const wrap = (Component , Content) => <Component {...this.props} 
                        {...routeProps}>
                {Content && wrap(Content)}
            </Component>
            switch (routeProps.match.params.section) {
                case undefined:
                    return wrap(Home);
                case "foods":
                    return wrap(FoodsComponent);
                case "register":
                    return <ConnectedRegister />;
                case "admin":
                    return (this.props.isAuthenticated && 
                                this.props.user.isAdmin)
                                ? this.selectAdminComponent(routeProps)
                                    : <Forbidden 
                                        isAuthenticated={this.props.isAuthenticated} 
                                        isAdmin = {this.props.user.isAdmin}
                                        />      
                case "profile" :
                    return this.props.isAuthenticated 
                                ? <ProfileConnect /> 
                                    : this.redirector("profile") ;
                case "product" :
                    return  this.selectFoodOrDrug(routeProps) ;
                case "loggin":
                    return <LogginConnector /> ;        
                case "about" : 
                    return <About />        
                default:
                    return <Redirect to="/" />
            }
        }

        render(){
            // console.log(this.props)
            return <HashRouter basename="/">
                    <Switch>
                        <Route path="/:section?/:mode?/:page?" render={ (routerProps) => 
                            this.selectComponent(routerProps) } />  
                        <Redirect to="/" />
                    </Switch>
            </HashRouter>
        
        }
})