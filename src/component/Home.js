import React from 'react';
import { Navbar } from "./Navbar";
import { FoodCarousel } from "./foods/FoodCarousel";
import { DrugsCarousel } from "./drugs/DrugsCarousel";
import { Link } from "react-router-dom";
import '../style/home.css';
import { Footer } from "./Footer";
import {connect} from 'react-redux';

export const Home = connect(ds => ({user : ds.loginReducer.user}))(class extends React.Component {

    handelClick = (event) => {
        console.log(event.target)
        this.props.history.push(`/${event.target.name}`)
    }

    render(){
        console.log(this.props)
        return <div>
            <Navbar />
             <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-sm-6 mt-1">
                        <Link to="/product/foods/1" className="card" style={{textDecoration:'none'}} >
                            <div className="card">
                                <div name="foods" className="card-header text-white bg-danger">
                                    FOODS
                                </div>
                                <FoodCarousel  className="card-body" />
                            </div>
                        </Link>
                    </div>
                    <div  className="col-sm-6 mt-1">
                        <Link className="card" style={{textDecoration:'none'}} to="/product/drugs/1">
                            <div className="card">
                                <div className="card-header text-white bg-danger">
                                    MEDICINE 
                                </div>
                                <DrugsCarousel className="card-body" />
                            </div>
                        </Link>
                    </div>
                </div>
             </div>
            <div className="mt-4 background-img">
                <div className="text-center text-dark m-4 h6">
                    <div>
                        ARE YOU SUPPLIER ?
                    </div>
                    <div>
                        ARE YOU CUSTOMER ? 
                    </div>
                        Join us to start import/export Business Cooperation ?
                    </div>
                <div>
                    {Object.keys(this.props.user).length === 0 ? 
                    <Link to="/register" 
                            className="btn-pos mb-2 btn text-dark  btn-danger text-center">
                            Register
                    </Link>
                    : ''}
                </div>
            </div>
            <Footer />
        </div>
    }
})