import React from 'react';
import ReactDOM from 'react-dom';
import {Route,Redirect} from 'react-router-dom';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';

// Import Store
import configureStore from './store/configureStore';

//Import spinner and toastr
import {Spinner} from 'react-redux-spinner';
import ReduxToastr from 'react-redux-toastr';

//Import History Component
import history from './utils/history';


//Import Page Components
import Index from 'pages/index.js';

import Dashboard from 'pages/dashboard/index.js';

let store = configureStore();


class App extends React.Component {

  render() {
    return (
      <div>
        <Spinner />
        <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="bottom-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar/>
        <Route exact={true} path="/" component={Index} />

        <PrivateRoute exact={false} path="/dashboard" component={Dashboard}/>
      </div>
    )
  }
}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    //auth.loggedIn() ? (
      <Component {...props}/>
    //) : (
    //  <Redirect to={{
    //    pathname: '/'
    //  }}/>
    //)
  )}/>
)


ReactDOM.render(
  <Provider store={store}>
  	<Router history={history}>
    		<App />
  	</Router>
  </Provider>, document.getElementById('root'));
//registerServiceWorker();
