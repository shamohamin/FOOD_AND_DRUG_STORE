import React from 'react'; 
import { DRUGS, FOODS } from '../../store/DataTypes';
import { connect } from "react-redux";
import { postData , updateProduct , setDefaultSelected} 
        from "../../store/ActionTyepsAndCreator" ;
import { Navbar } from '../Navbar';

export const ProductsEditor = connect(ds => ({
    selected : ds.modelReducer.selected || {} ,
    type : ds.modelReducer.type || "" 
}) , dispatch => ({
    submit : (data,type,headers) => dispatch(postData(data,type,headers )) ,
    update : (type , data , headers) =>  dispatch(updateProduct(type,data,headers)),
    setDefault : () => dispatch(setDefaultSelected()) 
}))(class extends React.Component {

    constructor(props){
        super(props) ;

        this.state = {
            category : ['pharmaceutical','medical equipment','processed','unprocessed'],
            formData : {
                _id : props.selected._id || -1 ,
                category : props.selected.category || "processed" , 
                description : props.selected.description || "" ,
                title : props.selected.title || "" ,
                url : props.selected.url || "" ,
            },
            section : [FOODS , DRUGS] ,
            sectionSelected : props.type === "drugs" ? DRUGS : FOODS ,
            clear : false 
        }

    }

    handelClear = (ev) => {
        this.setState(state => ({
            category : ['pharmaceutical','medical equipment','processed','unprocessed'],
            formData : {
                _id : -1 ,
                category : "processed" , 
                description : "" ,
                title :  "" ,
                url :  "" ,
            },
            section : [FOODS , DRUGS] ,
            sectionSelected : FOODS ,
            clear : !state.clear 
        }),() => this.props.setDefault()) ;
    }

    handelChange = (event) => {
        event.persist() ;
        console.log(event.target.name)
        this.setState(state => {
            if(event.target.name !== 'sectionSelected'){
                return state.formData[event.target.name] = event.target.value ;
            }else{
                return state[event.target.name] = event.target.value ;
            }
        }) ;
    }

    get formValid(){
        let valid = true ;

        Object.values(this.state.formData).forEach(item => {
            if(item.length === 0 ){
                valid = false ;
            }
        })

        return valid ;
    }

    handelSubmit = () => {
        if(this.formValid){

            const headers = {
                'Authorization' : 
                    `Baerer ${JSON.parse(localStorage.getItem('token'))}`  
            };

            console.log(this.state.formData) ;
            console.log(this.state.sectionSelected) ;

            this.props.submit(this.state.formData ,
                    this.state.sectionSelected , headers) ;
        }else{
            alert("please fill every field")
        }   
    }

    handelUpdate = () => {
        if(this.formValid){
            const headers = {
                'Authorization' : 
                    `Baerer ${JSON.parse(localStorage.getItem('token'))}` 
            } ;
            console.log(this.state.sectionSelected);
            this.props.update(this.state.sectionSelected ,
                    this.state.formData , headers) ;
        }else{
            alert('please fill every field')
        }
    }
    render(){
        console.log(this.state)
        return <div>
            <div>
                <Navbar />
            </div>
            <div style={{padding : '20px'  ,marginRight : '20px' , width : '100%' }}>
                <div className="mb-4">
                    <label>Select Section :</label>
                    <select className="form-control" name="sectionSelected"
                            onChange={this.handelChange}
                            value={this.state.sectionSelected}>
                        {
                            this.state.section.map(item => <option key={item}
                                value={item}
                                className="form-control">
                                {item}
                            </option>)
                        }
                    </select>
                </div>
                <div className="mb-4">
                    <label>choose category</label>
                    <select className="form-control" name="category"
                        onChange={this.handelChange}
                        value={this.state.formData.category}>
                        {
                            this.state.category.map(cat => <option key={cat}
                                value={cat}
                                className="form-control">
                                {cat}
                            </option>)
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>title</label>
                    <input className="form-control" onChange={this.handelChange}
                        name="title"
                        value={this.state.formData.title} />
                </div>
                <div className="form-group">
                    <label>url :</label>
                    <input className="form-control" name="url" 
                        onChange={this.handelChange}
                        value={this.state.formData.url} />
                </div>
                <div className="mt-4"> 
                    <label>description :</label>
                    <textarea  name="description" rows="8" cols="83.5"
                        onChange={this.handelChange}
                        value={this.state.formData.description}
                         />
                </div>
                <div className="m-4">
                    <button onClick={this.handelSubmit} className="btn btn-primary">submit</button>
                    <button onClick={this.handelClear} className="btn btn-danger">clear</button>
                    <button onClick={this.handelUpdate} className="btn btn-primary float-right">update</button>
                </div>
            </div>
        </div>
    }

})