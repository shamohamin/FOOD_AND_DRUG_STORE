import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Connect} from './Connect' ;
// import './custom.scss';
import "@fortawesome/fontawesome-free/css/all.min.css" ;
import {Provider} from 'react-redux' ;
import store from "./store/index" ;

export class App extends React.Component {
  render(){
    return <Provider store={store}>
        <Connect />
    </Provider>
  }
 
}

export default App;
