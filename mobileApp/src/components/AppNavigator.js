import React from 'react';
import { connect } from 'react-redux';
import {createSwitchNavigator, StackNavigator, TabNavigator, addNavigationHelpers } from 'react-navigation';
// import new redux helpers
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';


//Import Pages / Scenes
import AuthLoadingScreen from './../pages/AuthLoadingScreen.js';
import Login from './../pages/Login.js';
import Register from './../pages/Register.js';


import Dashboard from './../pages/dashboard/Dashboard.js';
import LogOut from './../pages/LogOut.js';
import Account from './../pages/dashboard/Account.js';
import Teams from './../pages/dashboard/Teams.js';
import Team from './../pages/dashboard/Team.js';
import TeamEvents from './../pages/dashboard/TeamEvents.js';
import AddTeam from './../pages/dashboard/AddTeam.js';

const TeamStack = TabNavigator({
  Team: {screen:Team},
  TeamEvents: {screen:TeamEvents},
});

const AppStack = StackNavigator({ 
  Dashboard: {screen:Dashboard},
  LogOut: {screen:LogOut},
  Account: {screen:Account}, 
  Teams: {screen:Teams}, 
  Team: {screen:TeamStack}, 
  AddTeam : {screen:AddTeam}
});

const AuthStack = StackNavigator({
  Login: {screen:Login}, 
  Register: {screen:Register} 
});


export const Navigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);


// Configure listener
export const navMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.navigation
);
const addListener = createReduxBoundAddListener("root");


export class Nav extends React.Component {
  render() {
    return (
      <Navigator navigation={{
         dispatch: this.props.dispatch,
         state: this.props.navigation,
         addListener,
      }} />
    )
  }
}
      
const mapStateToProps = state => ({
  navigation: state.navigation,
})

export default connect(mapStateToProps)(Nav);