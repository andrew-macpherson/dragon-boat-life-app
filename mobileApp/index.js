import { AppRegistry } from 'react-native';
import React, { Component } from 'react';

import {Provider} from 'react-redux';
// Import Store
import configureStore from './src/store/configureStore.js';

import Nav from './src/components/AppNavigator.js';


let store = configureStore();

const DragonBoatLife = () => (
	<Provider store={store}>
		<Nav />
	</Provider>
);

AppRegistry.registerComponent('Dragon-Boat-Life', () => DragonBoatLife);