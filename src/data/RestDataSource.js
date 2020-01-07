import Axios from 'axios';

export class RestDataSource {
    
    constructor(base_url){
        this.BASE_URL = base_url ;
    }

    GetData(params , headers){
        // console.log("asdas");
        // console.log(headers)
        return this.sendRequest('get' , this.BASE_URL , params ,{},headers) 
    }

    PostData(data , headers){
        return this.sendRequest('post' , this.BASE_URL , {} , data , headers) ;
    }

    updateData = (data , headers) => 
                this.sendRequest('put' , this.BASE_URL , {} , data , headers) ;

    deleteData = (data , headers) => 
                this.sendRequest('delete' , this.BASE_URL , {} , data , headers) ;

    sendRequest(method , url  , params , data , headers ){
        // console.log(data);
        // console.log(headers);
       return Axios.request({
            method ,
            url ,
            headers ,
            params ,
            data
        })
    }

}