import { connect } from "react-redux";
import { login , setDefault} from "../../store/ActionTypeAndCreatorForLogin";
import { withRouter } from "react-router-dom";

export const LogginPageConnector = (PresentedComponent) => {
    
    const mapStateToProps = ds => ({
        err : ds.loginReducer.err || "",
        user : ds.loginReducer.user 
    })

    const mapDispatchToProps = dispatch => ({
        login : (data , successCallback , callback) => dispatch(login(data , successCallback , callback)),
        setDefault : () => dispatch(setDefault())
    })

    const mergeProps = (props , functionProps , ownProps) => {
        console.log(props) ;
        const functionProp = {
            login : async (data , successCallback , callback) => await functionProps.login(data , successCallback, callback) ,
            setDefault : functionProps.setDefault
        }
        return Object.assign({} , props , functionProp , ownProps) ;
    }

    return withRouter(connect(mapStateToProps , mapDispatchToProps ,
                    mergeProps)(PresentedComponent)) ;
}