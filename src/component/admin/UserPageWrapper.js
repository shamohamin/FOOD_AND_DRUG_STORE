import React from "react";

export const UserPageWrapper = (dataType , PresentedComponent ) => {

    return class extends React.Component {

        constructor(props){
            super(props) ;

            this.state = {
                isLoading : true 
            }
        }

        componentDidMount = () => this.dataGetter() ;

        componentDidUpdate = () => this.dataGetter() ; 

        dataGetter = () => {

            const dsData = this.props.params || {} ;

            // console.log(dsData)
            const rtData = {
                page :   Number(this.props.match.params.page) || 1 ,
                limit : Number(this.props.limit) || 5 ,
                category : this.props.category 
            }

            const headers = {
                'Authorization' : 
                    `Baerer ${JSON.parse(localStorage.getItem('token'))}`  
            };
            // console.log(headers) ;
            // console.log(rtData);
            if(Object.keys(rtData).find(key => dsData[key] !== rtData[key])){
                this.props.getData(dataType , rtData , headers);
            }
        }

        render(){
            // console.log(this.props) ;
            return  <PresentedComponent {...this.props} /> ;
        }
    }

}