import React from 'react';
import { PaginatorConnector } from "../Paginate/PaginatorConnector";
import { PaginateControl } from "../Paginate/PaginateControl";
import { FOODS, DRUGS } from '../../store/DataTypes';
import { Navbar } from "../Navbar";
import '../../style/foodProduct.css';

const PaginateConnectedForFood = PaginatorConnector(FOODS , PaginateControl) ;
const PaginateConnectedForDrug = PaginatorConnector(DRUGS , PaginateControl) ;

export class FoodsComponent extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            selected : {} ,
            section : props.match.params.mode === DRUGS  ? 
                     ['pharmaceutical' , 'medical equipment'] : ['processed' , 'unprocessed'] ,
            mode : props.match.params.mode
        }
    }

    // componentDidMount(){
    //     this.props.setCategory(this.state.section[0]) ;
    // }

    handelClick = (id) => {
        const product = this.props.data.find(item => item._id === id) ;
        this.setState({selected : product}) ;
    }

    onChange = (event) => {
        this.props.setCategory(event.target.name)
        this.setState({selected : {}})
    }

    handelDelete = (id) => {
        const headers = {
            'Authorization' : 
                `Baerer ${JSON.parse(localStorage.getItem('token'))}`
        };
        const type = this.props.match.params.mode === FOODS ? FOODS : DRUGS ;
        const data = this.props.data.find(p => p._id === id) ;

        
        this.setState({selected : {}} , () => this.props.delete(type , data , headers) )
    }

    handelUpdate = (id) => {
        const data = this.props.data.find(p => p._id === id) ;
        const type = this.props.match.params.mode === FOODS ? FOODS : DRUGS ;
        this.props.selectProduct(type , data) ;
    }

    render(){
        console.log(this.props) ;

        const style = {
            width : '100%' ,
            height : '90%'
        }
        return <div>
            <div className="mb-4">
                <Navbar />
            </div>
            <div className="row">
                <div className="col-3 ml-1 button-wrapper">
                    <button name={this.state.section[0]}
                        className={`btn btn-block m-1 
                            ${this.props.category === this.state.section[0] ? "btn-primary" 
                                                            : "btn-secondary"}`}
                        onClick={(ev) => this.onChange(ev)}>
                        {this.state.section[0]}
                    </button>
                    <button name={this.state.section[1]}
                        className={`btn btn-block m-1 
                            ${this.props.category === this.state.section[1] ? "btn-primary" : "btn-secondary"}`}
                        onClick={(ev) => this.onChange(ev)}>
                        {this.state.section[1]}
                    </button>
                </div>
                <div className="row col-9">
                    {
                        !this.props.isLoading ? this.props.data.map(item => <div 
                                            onClick={() => this.handelClick(item._id)} 
                                            key={item._id} 
                                                className="col-md-4 col-sm-6 col-xs-6 mb-4 p-2 wrapper">                    
                                <div style={{width : '100%' ,height:'40%' }}>
                                    <img style={style} src={`${item.url}`} alt={`${item.title}`} />
                                </div>
                                <div className="text-left h1">
                                    {item.title}
                                </div>
                                <div className="para">
                                    <p style={{textAlign : "justify",textIndent:'30px' ,
                                        lineHeight:'2' ,textTransform:"capitalize"}}>
                                        {item.description.substr(1,100) + "...."}
                                    </p>
                                </div>
                                {
                                    this.props.user.isAdmin ? 
                                        <div><button onClick={() => this.handelDelete(item._id)} className="btn btn-danger">delete</button> 
                                        <button onClick={() => this.handelUpdate(item._id)} className="btn btn-warning">edit</button> </div>
                                : '' }
                            </div>) : <div>isLoading...</div>
                    }
                    {
                        Object.keys(this.state.selected).length !== 0 ? <React.Fragment>
                            <div style={{border : '10px'}} 
                            className="m-2 p-2 descriptiop-wrapper">
                                <div className="text-left h1">
                                    {this.state.selected.title}
                                </div>
                                <div className="pull-right" style={{width : '100%'}}>
                                    <img style={style} src={`${this.state.selected.url}`}
                                        alt={this.state.selected.title}   
                                        />
                                </div>
                                <div>
                                    <div className="h1">
                                        Description
                                    </div>
                                   <p style={{textAlign : "justify",textIndent:'30px' ,
                                        lineHeight:'2' ,textTransform:"capitalize"}}>
                                        {this.state.selected.description}
                                    </p>
                                </div>
                            </div>
                        </React.Fragment> : ''
                    } 
                </div>
                <div className="container-fluid">
                    <div className="text-center m-4">
                        {
                            this.props.match.params.mode === DRUGS ?
                            <PaginateConnectedForDrug /> : <PaginateConnectedForFood />
                        }
                    </div>
                </div>
            </div>
        </div>
    }
}