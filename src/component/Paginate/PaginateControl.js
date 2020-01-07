import React from 'react' ;
import { PaginateButton } from "./paginateButton";
import { FOODS, DRUGS } from '../../store/DataTypes';

export class PaginateControl extends React.Component {

    constructor(props){
        super(props) ;

        this.state = {
            pageSizeGroup : [5,10,20] ,
            pageSize : props.limit
        }
    }

    handelChange = (event) => {
        event.persist()
        this.setState({pageSize : event.target.value },
            () => this.props.setPageSize(this.props.match.params.mode
                                            ,event.target.value))
    }


    render(){
        // console.log(this.props)
        return <div>
            <PaginateButton currentPage={this.props.currentPage}
                        pageCount = {this.props.pageCount}
                        navTo={this.props.navTo} />
                        
            <div className="text-center">
                { this.props.match.params.mode !== FOODS && DRUGS !== this.props.match.params.mode ? 
                    <select onChange={ ev => this.handelChange(ev) }
                        value={this.state.pageSize}>
                        {this.state.pageSizeGroup.map(pageSize => 
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            )}
                    </select> : '' 
                }
            </div>

        </div>
    }

}