import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import { UserPageWrapper } from "../component/admin/UserPageWrapper";
import { getData , setCategory , deleteProduct , selectProduct } 
        from "../store/ActionTyepsAndCreator";
import { FOODS, DRUGS } from './DataTypes';

export const DataGatterConnector = (dataType , PresentedComponent) => {

    const mapStateToProps = (ds,ownProps) => {
        const select = ownProps.match.params.mode === FOODS ? 'processed' : 'pharmaceutical' ;
        // console.log(select)
        return {
            user : ds.loginReducer.user ,
            data : ds.modelReducer[dataType],
            limit : ds.modelReducer[`${dataType}_limit`] || ownProps.match.params.mode
                                                            === FOODS || DRUGS ? 3 : 5 ,
            params : ds.modelReducer[`${dataType}_params`],
            isLoading : ds.modelReducer[`${dataType}_loading`] === undefined ?
                        true : ds.modelReducer[`${dataType}_loading`] ,
            category : ds.modelReducer.category || select
        }            
    }

    const mapDispatchToProps = (dispatch,ownProps) =>  ({
        getData : (type , param , headers) => 
                dispatch(getData(type , param, headers)) ,
        setCategory : (category) => dispatch(setCategory(category)),
        delete : (dataType , data , headers) => 
                dispatch(deleteProduct(dataType,data,headers)) ,
        selectProduct : (dataType , data) => {
            dispatch(selectProduct(dataType,data)) ;
            ownProps.history.push('/admin/editor') ;
        }               
    })

    return withRouter(connect(mapStateToProps ,
         mapDispatchToProps)(UserPageWrapper(dataType,PresentedComponent)));

}