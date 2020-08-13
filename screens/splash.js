import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet, Image, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const splash = props => {
  let [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('user_id').then(value =>
        props.navigation.navigate(
          value === null ? 'login' : 'Home'
        )
      );
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor= '#000000' />
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.image}
      />
      <ActivityIndicator
        animating={animating}
        color="#FF3D00"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  image: {
    width: '100%', 
    resizeMode: 'contain', 
    margin: 30
  }
});

export default splash;