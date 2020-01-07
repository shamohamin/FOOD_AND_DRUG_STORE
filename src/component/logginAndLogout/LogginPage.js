import React from 'react' ;
import "../../style/login.css" ;
import { Navbar } from "../Navbar";

export class LogginPage extends React.Component {

    constructor(props){
        super(props) ;

        this.state = {
            error : "",
            formData : {
                emailAddress : "" ,
                password : ""
            }
        }
    }

    onChange = (event) => {
        event.persist() ;
        this.setState(state => 
                state.formData[event.target.name] = event.target.value )
    }

    onClick = () => {
        this.props.login(this.state.formData ,() => {
            const where = sessionStorage.getItem('where') ;
            this.props.history.push(`/${where}`) ;
            sessionStorage.removeItem('where') ;
            this.props.setDefault() ;
        } ,(err) => {
            // console.log(err)
            this.setState({error : err})
        }) ;
    }

    render(){
        return <div>
            <div className="mb-2 ">
                <Navbar />
            </div>
            <div className="form-container m-1">
                <div style={{boxShadow : '5px 5px #8889'}} 
                        className="text-center bg-info h1 form-header">
                    LOGIN 
                </div>
                <span className="divider"></span>
                {
                    this.props.err === "" ? '' :
                    <div className="alert bg-warning mt-4 text-center">
                        {this.state.error}
                    </div>
                }
                <div className="form-group mt-4">
                    <label>Email(username)</label>
                    <input className="form-control form-style"
                        name="emailAddress"
                        value={this.state.emailAddress}
                        onChange={this.onChange}
                        type="text"
                        autoFocus
                        />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input className="form-control form-style"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        type="password"
                        />
                </div>
                <div className="text-center">
                    <button onClick={this.onClick} 
                                className="btn btn-form text-center btn-block">
                        LOGIN 
                    </button>
                </div>
                
            </div>
        </div>
    }

}