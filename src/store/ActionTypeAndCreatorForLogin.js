import { URLS } from "../data/RestUrls";
import { RestDataSource } from "../data/RestDataSource";
import { LOGIN, TOKEN } from "./DataTypes";

export const LOGGED_IN = "logged_in";
export const SET_DATA_OF_USER = "set_data_of_user";
export const SET_DEFAULT = "set_default";
export const SET_DEFAULT_TO_USER = "set_default_to_user";
export const UPDATE  = "update";
export const LOGGIN = "loggin" ;
export const LOGOUT = "logout" ;
export const REFRESH_TOKEN = "refresh_token" ;

export const loggedIn = () => ({
    type : LOGGED_IN
})

export const setDataOfUser = (dataType , data ,successCallback ,callback) => ({
    type : SET_DATA_OF_USER ,
    payload : new RestDataSource(URLS[dataType]).PostData(data)
                .then(res => {
                    successCallback();
                    return {
                        data : res.data 
                    }
                })
                .catch(err => {
                    callback(err.response.data)
                    return {
                        err : err.response
                    }
                })
})

export const setDefault = () => ({
    type : SET_DEFAULT
})

export const setDefaultToUser = () => ({
    type : SET_DEFAULT_TO_USER 
})


export const updateData = (dataType , data) => ({
    type : UPDATE ,
    payload : new RestDataSource(URLS[dataType]).updateData(data)
                .then(res => ({
                    user : res.data
                }))
                .catch(err => ({
                    err : err.response                     
                }))
})

export const login = (data ,successCallback ,callback) => ({
    type : LOGGIN ,
    payload : new RestDataSource(URLS[LOGIN]).PostData(data)
            .then(res => {
                successCallback() ;
                return {
                    data : res.data 
                }
            })
            .catch(err => {
                // console.log(err.response)
                callback(err.response.data)
                return {
                    err : err.response
                };
            })
})  

export const logout = () => ({
    type : LOGOUT 
})

export const refreshToken = (data,headers) => ({
    type : REFRESH_TOKEN ,
    payload : new RestDataSource(URLS[TOKEN]).PostData(data,headers)
            .then(res => ({
                data : res.data 
            }))
            .catch(err => {
                throw new Error('token not refreshed')
            })
})
