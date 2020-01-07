import React from 'react';
// import "../custom.sass";

export const ShowForm = ({ user , toggleEditing }) => {

    return <div> 
        <div className="hello">
                hello man how are you !!!!!
        </div>
        <div className="container-fluid">
            {
                Object.keys(user).map(key => <div key={key}>
                    {
                        key !== "_id" ? 
                            <div  className="col-md-12 col-sm-12">
                                <p className="text-left">
                                    {key}
                                </p>
                                <p className="text-right">
                                    {user[key]}
                                </p>
                                <hr />
                            </div> : "" 
                    }
                    </div>
                )
            }
            <div className="text-left m-2">
                <button onClick={() => toggleEditing() }
                        className="bg-primary btn btn-md">
                    <span className="fas fa-user-edit"></span> Edit
                </button>
            </div>
        </div>
    </div>

}