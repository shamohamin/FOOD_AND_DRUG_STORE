import React from "react" ;
import { FormValidator } from "../logginAndLogout/logginValidation" ;
import { Navbar } from '../Navbar' ;
import { EditingForm } from "./EditingForm" ;
import { ShowForm } from "./ShowForm" ;
import '../../style/profile.css' ;

export class Profile extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            edit : false ,
            formData : {
                _id : props.user._id ,
                firstName : props.user.firstName ,
                lastName : props.user.lastName ,
                emailAddress : props.user.emailAddress ,
                phone : props.user.phone,
                intrestType : props.user.intrestType
            },
            rules : {
                firstName : {minLenght : 3 , isAlpha : true },
                lastName : {minLenght : 3 , isAlpha :true },
                phone : {isAlpha : false , phone : true },
                emailAddress : {isEmail : true , isAlpha:false },
            },
            errors : {}
        }
    }

    onChange = ( event , phone) => {
        // console.log(phone)
        if(event !== undefined){
            // console.log("insise if cluase")
            event.persist() ;
            this.setState(state => 
                state.formData[event.target.name] = event.target.value )
        }else{
            // console.log("inside else")
            this.setState(state =>
                state.formData.phone = phone )
        }
    }

    cancelCallback = () => {
        this.setState({edit : false})
    }

    showErrorMassage = (error) => {
        return error.map(err => <div key={err} className="alert-warning small h5">
            {err}
        </div>)
    }

    onSubmit = () => {
        // console.log(this.state.formData)
        if(this.formValid){
            this.props.submit(this.state.formData)
            setTimeout(() => {
                if(this.props.toggleEditor()){
                    this.toggleEditing() ;
                }
            },300) ;
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

    static getDerivedStateFromProps(props , state){
        let errors = FormValidator(state.rules , state.formData) ;
        return {
            errors
        }
    }

    toggleEditing = () => {
        this.setState({ edit : !this.state.edit }) ;
    }

    render(){
        return <div>
            <Navbar />
            <div className="container-fluid mb-4 mt-4  mr-4">
                <div className="card profile-container">
                    <div className="card-header text-center bg-info">
                        <h1> <span className="fas fa-user "></span>
                            Personal Information</h1>
                    </div>
                    <div className="card-body p-2">
                        {
                            this.state.edit ? 
                                <EditingForm 
                                    err = {this.props.err}
                                    showErrorMessage={this.showErrorMassage}
                                    errors={this.state.errors}
                                    formData = {this.state.formData}
                                    handelChange = {this.onChange}
                                    onSubmit = {this.onSubmit}
                                    cancelCallback={this.cancelCallback}
                                    />
                                :
                                <ShowForm 
                                    user = {this.state.formData}
                                    toggleEditing = {this.toggleEditing}
                                    /> 
                        }
                    </div>
                </div>
            </div>
        </div>
    }


}