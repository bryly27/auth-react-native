import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner } from './components/common';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentDidMount() {
    // copy from firebase app
    firebase.initializeApp({
      apiKey: '*****************************',
      authDomain: '*****************************',
      databaseURL: '*****************************',
      projectId: '*****************************',
      storageBucket: '*****************************',
      messagingSenderId: '*****************************'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={styles.logoutButtonStyle}>
            <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
          </View>
        );
      case false:
        return <LoginForm />
      default:
        return (
          <View style={styles.logoutButtonStyle}>
            <Spinner size="large" />
          </View>
        );
    }
  }


  render() {
    return (
      <View>
        <Header headerText="Authentication"></Header>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  logoutButtonStyle: {
    paddingTop: 5,
    flexDirection: 'row'
  },
  loadingSpinnerStyle: {
    paddingTop: 5,
    flexDirection: 'row'
  }
};

export default App;
