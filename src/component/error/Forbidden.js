import React from "react" ;

export const Forbidden = ({isAuthenticated , isAdmin}) => {
    return <div>
        <div className="text-center mt-4">
            { (!isAuthenticated && !isAdmin) ? 
                <h1 className="text-warning mt-4">
                    401
                </h1> : <h1 className="text-warning mt-4">
                    403
                </h1>
            }
        </div>
    </div>
}