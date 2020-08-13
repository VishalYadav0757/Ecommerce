import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Image, TouchableOpacity, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { construct } from 'core-js/fn/reflect';

const login = props => {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const checkLogin = async() => {
    try{
        const uemail=await AsyncStorage.getItem('UserEmail')
        const upassword=await AsyncStorage.getItem('UserPassword')
        if(userEmail=='' && userPassword=='')
        {
            alert('Credentials Required!!')
        }
        else if(userEmail=='' && userPassword==upassword)
        {
            alert('Oops Email is Missing!!')
        }
        else if(userEmail==uemail && userPassword=='')
        {
            alert('Oops Password is Missing!!')
        }
        else if(userEmail==uemail && userPassword==upassword)
        {
            props.navigation.navigate('Home')
        }
        else
        {
            alert('Incorrect username or password!')
        }
      }
      catch(error)
      {
        console.log(error)
      }
  }
  return (
    <View style={styles.mainBody}>
                <StatusBar barStyle="light-content" backgroundColor= '#000000' />
                  <View style = {styles.header}>
                    <Image
                      source={require('../assets/images/logo.png')}
                      style={styles.style1}
                    />
                  </View>
                  <View style = {styles.footer}>
                    <Text style = {styles.welcome}>Welcome H</Text>
                      <TextInput
                          style={styles.inputStyle1}
                          onChangeText={userEmail => setUserEmail(userEmail)}
                          placeholder="Enter Email    (dummy@example.com)"
                          placeholderTextColor="#000000"
                          autoCapitalize="none"
                      />
                      <TextInput
                          style={styles.inputStyle2}
                          onChangeText={userPassword => setUserPassword(userPassword)}
                          placeholder="Enter Password"
                          placeholderTextColor="#000000"
                          secureTextEntry={true}
                      />
                      <TouchableOpacity
                          style={styles.buttonStyle}
                          onPress={checkLogin}>
                          <Text style={styles.buttonTextStyle}>LOGIN</Text>
                      </TouchableOpacity>
                      <Text style = {styles.OR}>or</Text>
                      <View>
                        <LoginButton
                            onLoginFinished={(error, result) => {
                            if (error) {
                            alert(error);
                            alert('Login has error: ' + result.error);
                          } else if (result.isCancelled) {
                            alert('Login is cancelled.');
                          } else {
                            AccessToken.getCurrentAccessToken().then(data => {
                              alert(data.accessToken.toString());
                            });
                          }
                          }}
                          onLogoutFinished={() => alert("You have been Logged Out")}
                        />
                      </View>
                      <TouchableOpacity
                          style={styles.registerTextStyle}
                          onPress={() => props.navigation.navigate('register')}>
                          <Text style={styles.buttonTextStyle1}>Don't have an account? Register</Text>
                      </TouchableOpacity>
                    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#90CAF9',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    borderWidth: 3,
    borderColor: '#000000'
  },
  headerView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  footerView: {
    flex: 6,
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderColor: '#000066',
  },
  style1: {
    width: 200, 
    height: 200, 
    resizeMode: 'contain' 
  },
  welcome: {
    fontSize: 30,
    margin: 10,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  OR: {
    fontSize: 20,
    marginBottom: 20
  },
  buttonStyle: {
    backgroundColor: '#FF7043',
    width: '30%',
    borderRadius: 10,
    marginBottom:20
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    padding: 15,
    fontSize: 20,
    textAlign: 'center'
  },
  buttonTextStyle1: {
    color: '#000000',
    padding: 15,
    fontSize: 20,
    textAlign: 'center'
  },
  inputStyle1: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1
  },
  inputStyle2: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1
  },
  registerTextStyle: {
    color: '#0d0d0d',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 30
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14
  }
});

export default login;