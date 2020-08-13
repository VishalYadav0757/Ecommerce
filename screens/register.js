import React, { useState, Component } from 'react';
import { StyleSheet, TextInput, View, Text, Image, TouchableOpacity, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

const register = ({navigation}) => {  
  const[UserName,setUserName]=useState('');
  const[UserEmail,setUserEmail]=useState('');
  const[UserPassword,setUserPassword]=useState('');
  const[UserContact, setUserContact]=useState('');

  const onSubmit = async() => {
       try{
            if(UserName=='' || UserEmail==''||UserPassword=='')
            {
                alert('Please fill the entries')
            }
            else if(UserName==UserEmail && UserEmail=='' && UserPassword==UserPassword)
            {
                alert('Email Required!!')
            }
            else if(UserName==UserEmail && UserEmail==UserEmail && UserPassword=='')
            {
                alert('Password Required!!')
            }
            else if(UserName==UserEmail && UserEmail==UserEmail && UserPassword==UserPassword && UserContact=='')
            {
                alert('Contact No. Required!!')
            }
            else
            {
                await AsyncStorage.setItem('UserName',UserName)
                await AsyncStorage.setItem('UserEmail',UserEmail)
                await AsyncStorage.setItem('UserPassword',UserPassword)
                await AsyncStorage.setItem('UserContact',UserContact)
                alert('Registration Successfully')
                navigation.navigate('login')   
            }
        }
       catch(error){
           console.log(error)
       }
    }
  return (
          <View style={styles.SectionStyle}>
            <StatusBar barStyle="light-content" backgroundColor= '#000000' />
            <View style = {styles.header}>
              <Image
                    source={require('../assets/images/logo.png')}
                    style={styles.image}
                  />
            </View>
            <View style = {styles.footer}>
                <TouchableOpacity style = {styles.avatar}>
                  <Icon 
                  name = "plus" 
                  size ={30} 
                  color = "#ffffff" 
                  >
                  </Icon>
                </TouchableOpacity>
                <TextInput
                    style={styles.inputStyle1}
                    onChangeText={UserName => setUserName(UserName)}
                    placeholder="Enter UserName"
                    placeholderTextColor="#0c0c0e"
                    autoCapitalize="sentences"
                />
                <TextInput
                    style={styles.inputStyle}
                    onChangeText={UserEmail => setUserEmail(UserEmail)}
                    placeholder="Enter Email    (dummy@example.com)"
                    placeholderTextColor="#0c0c0e"
                />
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={UserContact => setUserContact(UserContact)}
                  placeholder="Enter Contact No"
                  placeholderTextColor="#0c0c0e"
                  maxLength={10}
                  keyboardType="numeric"
                />
                <TextInput
                    style={styles.inputStyle2}
                    onChangeText={UserPassword => setUserPassword(UserPassword)}
                    placeholder="Enter Password"
                    placeholderTextColor="#0c0c0e"
                    secureTextEntry={true}
                  />
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={onSubmit}>
                  <Text style={styles.buttonTextStyle}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.registerTextStyle}
                  onPress={() => navigation.navigate('login')}>
                  <Text style={styles.buttonTextStyle1}>Already have an account? Login</Text>
                </TouchableOpacity>
            </View>
          </View>
  );
};

const styles = StyleSheet.create({
  SectionStyle: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: '#90CAF9',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    borderWidth: 3,
    borderColor: '#000000'
  },
  image: {
    width: 200, 
    height: 200, 
    resizeMode: 'contain',
  },
  buttonStyle: {
    backgroundColor: '#FF7043',
    width: '30%',
    borderRadius: 10
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    padding: 15,
    fontSize: 20,
    textAlign: 'center',
  },
  buttonTextStyle1: {
    color: '#000000',
    padding: 15,
    fontSize: 20,
    textAlign: 'center'
  },
  registerTextStyle: {
    color: '#0d0d0d',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15
  },
  inputStyle: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderWidth: 1
  },
  inputStyle1: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    marginVertical: 30
  },
  inputStyle2: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#CFD8DC',
    marginTop: 48,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default register; 