import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

//Import Components

export default class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('access_token');

        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };


    render() {
        return (
            <View style={styles.container}>
                <Text>Loading Dragon Boat Life...</Text>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});