import React from "react";
import { PaginatorConnector } from "../Paginate/PaginatorConnector";
import { PaginateControl } from "../Paginate/PaginateControl";
import { USERS } from "../../store/DataTypes";
import { Navbar } from "../Navbar";

const PaginateComponent = PaginatorConnector(USERS , PaginateControl)


export class UsersPage extends React.Component {
    render(){
        console.log(this.props)
        return <div className="container-fluid">
            <Navbar />
            <div className="mt-4 ml-4 h2">
                LIST OF USERT
            </div>
            <div className="col-md-8 col-md-left-4 m-4 p-4">
                {!this.props.isLoading ? this.props.data.map(user => 
                    <div key={user.id}>
                        <div>
                            <div className="h2">
                            <span className="fas fa-cart-plus mt-4"></span>
                                Category : {user.intrestType}
                            </div>
                        </div>
                        <hr />
                        <span className="fas fa-addres-book "></span>
                        <h1 className='text-info'>Info : </h1>
                        <div className="row">
                            <div className="col-6">
                                FirstName : {user.firstName}
                            </div>
                            <div className="col-6">
                                LastName : {user.lastName}
                            </div>    
                        </div>
                        <div className="row">
                            <div className="col-6"> 
                                phone : {user.phone}
                            </div>
                            <div className="col-6">
                                email : {user.emailAddress}
                            </div>
                        </div>
                        <hr></hr>
                    </div>
                ) : <div>isLoading....</div>}
            </div>
            <div className="mb-4">
                <PaginateComponent />
            </div>
        </div>
    }
}