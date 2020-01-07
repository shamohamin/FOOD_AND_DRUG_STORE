import { connect } from "react-redux";
import { updateData , setDefault } from "../../store/ActionTypeAndCreatorForLogin";
import { USERS } from "../../store/DataTypes";


export const ProfileConnector = (PresentedComponent) => {

    const mapStateToProps = ds => ({
        user : ds.loginReducer.user || 
                        JSON.parse(localStorage.getItem('userInfo')) ,
        err : ds.loginReducer.err || "" 
    })

    const mapDispatchToProps = dispatch => ({
        submit : data => 
            dispatch(updateData(USERS , data)),
        setDefault : () => dispatch(setDefault())
    })

    const mergeProps = (props , functionProps ) => {
        const functionProp = {
            submit : functionProps.submit ,
            toggleEditor : () => {
                if(props.err){
                    functionProps.setDefault() ;
                    return false ;
                }else {
                    return true ;
                }
            }
        }

        return Object.assign({} , props , functionProp) ;
    }

    return connect(mapStateToProps , mapDispatchToProps 
            , mergeProps)(PresentedComponent) 

}