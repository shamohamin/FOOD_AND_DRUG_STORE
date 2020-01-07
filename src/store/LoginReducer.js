import { SET_DATA_OF_USER , LOGGED_IN ,SET_DEFAULT 
            ,SET_DEFAULT_TO_USER , LOGGIN , UPDATE , LOGOUT, REFRESH_TOKEN} 
        from "./ActionTypeAndCreatorForLogin";

export const LoginReducer = (dataStore={isAuthenticated:false,user:{}},action) => {
    switch(action.type){
        case LOGGED_IN :
            let user = localStorage.getItem('userInfo') ;
            user = JSON.parse(user) ;
            // console.log(user)
            if(user !== undefined && user !== null){
                return {
                    ...dataStore ,
                    isAuthenticated : true ,
                    user : user 
                }
            }else{
                return {
                    ...dataStore ,
                    isAuthenticated :false
                }
            }
        case LOGGIN :
        case SET_DATA_OF_USER :
            // console.log(action.payload) ;
            if(action.payload.err === undefined){
                localStorage.setItem('userInfo' ,
                    JSON.stringify(action.payload.data.data)) ;
                localStorage.setItem('token' ,
                    JSON.stringify(action.payload.data.token)) ;
                return {
                    ...dataStore ,
                    isAuthenticated : true ,
                    user : action.payload.data.data ,
                }
            }else{
                return {
                    ...dataStore ,
                    isAuthenticated : false,
                    err : action.payload.err.data
                }
            }
        case SET_DEFAULT : 
            return {
                ...dataStore ,
                isAuthenticated : true ,
                err : ""
            }    
        case SET_DEFAULT_TO_USER : 
            // console.log("in Defualt");
            return {
                ...dataStore,
                isAuthenticated : false ,
                user : {}
            }    
        case UPDATE : 
            if(action.payload.err === undefined || action.payload.err === ""){
                localStorage.removeItem('userInfo');
                localStorage.setItem('userInfo' ,
                        JSON.stringify(action.payload.user)) ;
                return {
                    ...dataStore ,
                    user : action.payload.user
                }
            }else {
                return {
                    ...dataStore ,
                    err : action.payload.err.data
                }
            }
        case LOGOUT :
            localStorage.removeItem('userInfo') ;
            localStorage.removeItem('token') ;
            localStorage.removeItem('persist:root') ;
            return {
                ...dataStore ,
                user : {} ,
                isAuthenticated : false
            }    
        case REFRESH_TOKEN : 
            // console.log(action.payload);
            localStorage.setItem('token' , 
                        JSON.stringify(action.payload.data)) ;
            return {
                ...dataStore 
            }    
        default :
            return dataStore ;        
    }
}