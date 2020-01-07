export const MultiActionMiddelware = () => next => action => {
    if(Array.isArray(action)){
        action.forEach(a => next(a))
    }else{
        next(action)
    }
}
        