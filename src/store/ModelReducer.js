import { STORE , GET_DATA , SET_PAGE_SIZE , SET_CATEGORY ,
             DELETE_PRODUCT , UPDATE_PRODUCT , SELECT , SET_DEFAULT_SELECTED} 
            from "./ActionTyepsAndCreator";

export const ModelReducer = (dataStore = {foods : [] , drugs : []} , action ) => {
    switch(action.type){
        case SELECT :
            return {
                ...dataStore ,
                selected : action.payload,
                type : action.dataType
            }
        case UPDATE_PRODUCT : 
            // console.log(action.payload)
            return {
                ...dataStore ,
                [action.dataType] : dataStore[action.dataType].map(p => 
                            p._id === action.payload.data._id ? action.payload.data : p)
            }
        case DELETE_PRODUCT :
            // console.log(action.payload)
            return {
                ...dataStore ,
                [action.dataType] : dataStore[action.dataType].filter(p =>
                             p._id !== action.payload.data._id) 
            }    
        case STORE : 
            // console.log(action)
            return {
                ...dataStore,
                [action.dataType] : dataStore[action.dataType]
                                        .concat([action.payload.data])
            }
        case GET_DATA :
            // console.log(action.payload)
            return {
                ...dataStore ,
                [action.dataType] : action.payload.data,
                [`${action.dataType}_params`]: action.payload.params,
                [`${action.dataType}_total`] : action.payload.total,
                [`${action.dataType}_loading`] : action.payload.isLoading
            }
        case SET_PAGE_SIZE :
            return {
                ...dataStore ,
                [`${action.dataType}_limit`] : action.payload
            }        
        case SET_CATEGORY : 
            return {
                ...dataStore ,
                category : action.payload 
            }    
        case SET_DEFAULT_SELECTED :
            return {
                ...dataStore ,
                selected : {}
            }    
        default :
            return dataStore;     
    }
}