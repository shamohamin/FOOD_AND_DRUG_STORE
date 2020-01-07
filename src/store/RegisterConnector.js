import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import { setDataOfUser , setDefault , setDefaultToUser } 
            from "./ActionTypeAndCreatorForLogin";
import { REGISTER } from './DataTypes';

export const RegisterConnector = (PresntedComponent) => {

    const mapStateToProps = ds => ({
        user : ds.loginReducer.user,
        err : ds.loginReducer.err,
        isAuthenticated : ds.loginReducer.isAuthenticated
    })

    const mapDispatchToProps = (dispatch) => ({
        submit : (data ,successCallback , callback) => {
            dispatch(setDefaultToUser()) ;
            dispatch(setDataOfUser(REGISTER , data , successCallback , callback)) ;
        },
        setDefault : () =>  dispatch(setDefault())
    })

    const mergeProps = ( props , functionProps , ownProps ) =>{
        let functionProp = {
            submit : functionProps.submit,
            setDefault : functionProps.setDefault
        }
        return Object.assign({}, props , functionProp , ownProps) ;
    }

    return withRouter(connect(mapStateToProps ,
             mapDispatchToProps,mergeProps)(PresntedComponent)) ;
}