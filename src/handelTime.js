import { loggedIn } from './store/ActionTypeAndCreatorForLogin';

export const handelTime = (store) => {
    if(localStorage.getItem('userInfo')){
        if(!store.getState().loginReducer.isAuthenticated){
          setTimeout(() => {
            store.dispatch(loggedIn())
          },5000);
        }
    }
}