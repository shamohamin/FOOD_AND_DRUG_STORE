import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import { setPageSize } from "../../store/ActionTyepsAndCreator";
import { FOODS, DRUGS } from "../../store/DataTypes";

export const PaginatorConnector = (dataType , PresentedComponent) => {

    const mapStateToProps = ds => ({
        limit : ds.modelReducer[`${dataType}_limit`],
        total : ds.modelReducer[`${dataType}_total`]
    })

    const mapDispatchToProps = dispatch => ({
        setPageSize : ( type , newSize) => dispatch(setPageSize(type , newSize))
    })

    const mergeProps = (props , functionProps , ownProps ) => {
        const section = ownProps.match.params.section ;
        const functionProp = {
            setPageSize : (type , newSize) => {
                functionProps.setPageSize(type , newSize);
                ownProps.history.push(`/${section}/${dataType}/1`) 
            },
            navTo : (page) => {
                ownProps.history.push(`/${section}/${dataType}/${page}`)
            }
        }
        const mode = ownProps.match.params.mode ;
        // console.log(props.limit)
        const prop = {
            currentPage : ownProps.match.params.page ,
            pageCount : Math.ceil((props.total)/(props.limit || ((mode === FOODS || mode === DRUGS) ? 3 : 5) )),
            limit : props.limit
        }

        return Object.assign({} , prop , functionProp , ownProps );

    }

    return withRouter(connect(mapStateToProps,
            mapDispatchToProps,mergeProps)(PresentedComponent))

}