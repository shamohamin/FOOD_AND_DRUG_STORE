import React from 'react';
import PhoneInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

export class EditingForm extends React.Component {

    render(){
        console.log(this.props)
        return <div className="m-1">
            <div className="alert-warning small h2">
                {this.props.err}
            </div>
            <div className="row ">
                <div className="col-md-6 mb-2">
                    <label>firstName</label>
                    <input name = "firstName" 
                        type ="text"
                        onChange={this.props.handelChange}
                            value ={this.props.formData['firstName']}
                            className="form-control"
                        />
                    {this.props.showErrorMessage(this.props.errors.firstName)}
                </div>
                <div className="col-md-6 mb-2">
                    <label>lastName</label>
                    <input name="lastName"
                        onChange={(ev) => this.props.handelChange(ev)}
                        value={this.props.formData['lastName']}
                        className="form-control"
                        />
                    {this.props.showErrorMessage(this.props.errors.lastName)}
                </div>    
            </div>
            <div className="input-group mt-2 mb-2">
                <label>Email:</label>
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <span className="fas fa-at"></span>
                        </div>
                    </div>
                    <input type="text"
                        value={this.props.formData.emailAddress}
                        className="form-control"
                        onChange={this.props.handelChange}
                        name="emailAddress" />
                </div>
                {this.props.showErrorMessage(this.props.errors.emailAddress)}
            </div>
            <div className="mt-2 mb-2">
                <label>phoneNumber:</label>
                    <PhoneInput className="mb-2"
                        onChange={phone => 
                                this.props.handelChange(undefined , phone)}
                        value = {this.props.formData.phone}
                        flags={flags}
                        name="phone"
                        />
                {this.props.showErrorMessage(this.props.errors.phone)}        
            </div>
            <div className="mt-4 mb-4">
                <label>Field Of Intrest:</label>
                    <select value={this.props.formData.intrestType}
                        className="form-control"
                        name="intrestType"
                        onChange={this.props.handelChange}>
                        <option value="foods">foods</option>
                        <option value="drugs">drugs</option>
                    </select>
            </div>                  
            <div className="text-center m-2">
                <button onClick={this.props.onSubmit}
                        className="btn btn-primary"
                        >
                        SaveChanges 
                </button>
                <button onClick={this.props.cancelCallback}
                        className="btn btn-warning ml-2"
                        >
                    Cancel
                </button>
            </div>
        </div>
    }

}