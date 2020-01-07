import React from 'react';
import '../../style/register.css';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import { FormValidator } from "./logginValidation";
import { Navbar } from "../Navbar";

export class Loggin extends React.Component {

    constructor(props){
        super(props) ;

        this.state = {
            mainError : "",
            errors : {},
            data : {
                firstName : "",
                lastName : "",
                intrestType : "foods",
                emailAddress : "",
                phone : "",
                password : ""
            },
            rules : {
                firstName : {minLenght : 3 , isAlpha : true },
                lastName : {minLenght : 3 , isAlpha :true },
                phone : {isAlpha : false , phone : true },
                emailAddress : {isEmail : true , isAlpha:false },
                password : { minLenght : 5 } 
            }
        }
    }

    static getDerivedStateFromProps(props , state){
        let errors = FormValidator(state.rules , state.data) ;
        return {
            errors
        }
    }

    handelChange = (event , phone) => {
        if(event !== undefined){
            event.persist();
            // console.log(event.target.value)
            this.setState(state => 
                state.data[event.target.name] = event.target.value) ;
        }else{
            this.setState(state => 
                state.data["phone"] = phone)
        }
    }

    handelClick = () => {
        // console.log(this.state.data);
        if(this.formValid){
            this.props.submit(this.state.data ,() => {
                this.props.history.push("/") ;
                this.props.setDefault() ;
                window.location.reload() ;
            },(data) => this.setState({mainError : data})) ;
        }else{
            console.log("no Submition ")
            this.setState(state => 
                    state.mainError = 
                        "please Pay attention to form rules")
        }
    }

    get formValid(){
        let valid = true ;
        Object.values(this.state.errors).forEach(value =>{
            if(value.length !== 0){
                valid = false ;
            }
        }) ;
        return valid ;
    }

    showErrorMessage = (error) => {
        return error.map(err =>
                <div key={err} className="text-warning small">
                    {err}
                </div>)
    }

    render(){
        // console.log(this.state.data)ac
        return <React.Fragment>
        <div>
            <Navbar />
        </div>
        <div className="register-body text-white">
            <div className="card bg-transparent form-body">
                <div className="card-header header-background text-center">
                    Sign in
                </div>
                <div className="card-body">
                    <div className="alert-warning small text-center">
                        {this.state.mainError}
                    </div>
                    <div className="form-group row m-1">
                        <div className="col">
                        <label>firstname:</label>
                        <input  type="text" className="form-control"
                            value={this.state.data.firstName}
                            name="firstName" onChange={this.handelChange} />
                            {this.showErrorMessage(this.state.errors.firstName)}
                        </div>
                        <div className="col">
                            <label>lastname:</label>
                            <input type="text" className="form-control"
                                value={this.state.data.lastName} 
                                name="lastName"  onChange={this.handelChange} />
                            {this.showErrorMessage(this.state.errors.lastName)}    
                        </div>      
                    </div>
                    <div className="form-group m-3">
                        <label >Email:</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">@</div>
                            </div>
                            <input type="text" 
                                    value={this.state.data.emailAddress}
                                    className="form-control"
                                    onChange={this.handelChange}
                                    name="emailAddress"/>
                        </div>
                        {this.showErrorMessage(this.state.errors.emailAddress)}        
                    </div>            
                    <div className="form-group m-3">
                        <label>phoneNumber:</label>
                            <PhoneInput 
                                onChange={phone => 
                                    this.handelChange(undefined , phone)}
                                value = {this.state.phone}
                                flags={flags}
                                name="phone"
                            />
                            {this.showErrorMessage(this.state.errors.phone)}
                    </div>
                    <div className="form-group m-3">
                        <label>Field Of Intrest:</label>
                        <select value={this.state.data.intrestType}
                            className="form-control"
                            name="intrestType"
                            onChange={this.handelChange}>
                            <option value="foods">foods</option>
                            <option value="drugs">drugs</option>
                        </select>
                    </div>
                    <div className="from-group m-3">
                        <label>password</label>
                        <input type="password" name="password"
                                className="form-control"
                                onChange={this.handelChange}
                                value={this.state.data.password}
                                />
                        {this.showErrorMessage(this.state.errors.password)}        
                    </div>
                    <button onClick={this.handelClick}
                        className="mr-3 mt-2 btn btn-block btn-outline-danger">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </React.Fragment>
    }

}