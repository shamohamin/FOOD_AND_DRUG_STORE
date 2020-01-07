import { RestDataSource } from "../data/RestDataSource";
import { URLS } from "../data/RestUrls";

export const STORE = "store" ;
export const GET_DATA = "get_Data" ;
export const SET_PAGE_SIZE = "set_page_size" ;
export const SET_CATEGORY = "set_category" ;
export const DELETE_PRODUCT = "delete_product" ;
export const UPDATE_PRODUCT = "update_product" ;
export const SELECT = "select" ;
export const SET_DEFAULT_SELECTED = "set_default_selected" ;

export const postData = (data , dataType , headers) => ({
    type : STORE ,
    dataType : dataType ,
    payload : new RestDataSource(URLS[dataType]).PostData(data , headers)
            .then(res => ({
                data : res.data
            }))
            .catch(err => console.log(err))
})

export const getData = (dataType , params ,headers) => ({
    type : GET_DATA , 
    dataType : dataType ,
    payload : new RestDataSource(URLS[dataType]).GetData(params,headers)
            .then(res => {
                // console.log(res) ;
            return {
                data : res.data.doc ,
                params ,
                total : res.data.total ,
                page : res.data.page,
                limit : res.data.limit,
                isLoading : false
            }})
            .catch(err => console.log(err))
})

export const setPageSize = ( dataType , newSize) => ({
    type : SET_PAGE_SIZE ,
    dataType : dataType ,
    payload : newSize
}) 

export const setCategory = (category) => ({
    type : SET_CATEGORY ,
    payload : category 
})

export const updateProduct = (dataType , data , headers) => ({
    type : UPDATE_PRODUCT ,
    dataType : dataType ,
    payload : new RestDataSource(URLS[dataType]).updateData(data , headers)
            .then(res => ({
                data : res.data
            }))
            .catch(err => ({
                err : err.response
            }))
})


export const deleteProduct = (dataType , data , headers) => ({
    type : DELETE_PRODUCT ,
    dataType : dataType ,
    payload : new RestDataSource(URLS[dataType]).deleteData(data , headers)
            .then(res => ({
                data : data
            }))
            .catch(err => ({
                err : err.response
            }))
})

export const selectProduct = (dataType , data) => ({
    type : SELECT ,
    dataType : dataType ,
    payload : data 
})

export const setDefaultSelected = () => ({
    type : SET_DEFAULT_SELECTED
})