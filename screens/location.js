 import React from 'react';
import {
  View, 
  Text,  
  StyleSheet, 
  Image,
  PermissionsAndroid,
  Platform,
  Button,
  TouchableOpacity
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

export default class location extends React.Component {
  state = {
    currentLongitude: 'fetching...',
    currentLatitude: 'fetching...',
 }
 componentDidMount = () => {
  var that =this;
  if(Platform.OS === 'ios'){
    this.callLocation(that);
  }else{
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
            'title': 'Location Access Required',
            'message': 'This App needs to Access your location'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          that.callLocation(that);
        } else {
          alert("Permission Denied");
        }
      } catch (err) {
        alert("err",err);
        console.warn(err)
      }
    }
    requestLocationPermission();
  }    
 }
 callLocation(that){
    Geolocation.getCurrentPosition(
       (position) => {
          const currentLongitude = JSON.stringify(position.coords.longitude);
          const currentLatitude = JSON.stringify(position.coords.latitude);
          that.setState({ currentLongitude:currentLongitude });
          that.setState({ currentLatitude:currentLatitude });
       },
       (error) => alert(error.message),
       { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    );
    that.watchID = Geolocation.watchPosition((position) => {
        console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
       that.setState({ currentLongitude:currentLongitude });
       that.setState({ currentLatitude:currentLatitude });
    });
 }
 componentWillUnmount = () => {
    Geolocation.clearWatch(this.watchID);
 }
 getData()
 {
     Geocoder.init("AIzaSyC1txyUHpqQlZh8GQ3VYS1IW6k7JC-eMNw");
     Geocoder.from(28.192762, 76.623940).then(
         json => {
         var addressComponent = json.results[0].formatted_address;
       alert(addressComponent);
 })
 error => {
         alert(error);
     }
 }
 render() {
    return (
       <View style = {styles.container}>
          <Image
            source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTUVIWFtqplFmJC3WhEQTG3E2uvhX4pJxpYfw&usqp=CAU'}}
            style={{width: 100, height: 100}}
          />
          <Text style = {styles.boldText}>
            We are trying to locate you...
          </Text>
          <Text style={{justifyContent:'center',alignItems: 'center',marginTop:16}}>
            Longitude: {this.state.currentLongitude}
          </Text>
          <Text style={{justifyContent:'center',alignItems: 'center',marginTop:16, marginBottom: 20}}>
            Latitude: {this.state.currentLatitude}
          </Text>
          <TouchableOpacity 
            style = {styles.button}
            onPress = {() => {this.getData()}}
            >
              <Text style = {styles.txt}>Get Address</Text>
          </TouchableOpacity>
          <Button
            title="Go Back to Cart "
            onPress={() => this.props.navigation.navigate("cart")}
          />
       </View>
    )
 }
}
const styles = StyleSheet.create ({
 container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 50,
    padding:16,
    backgroundColor:'white'
 },
 boldText: {
    fontSize: 30,
    color: 'red',
 },
 button:{
  justifyContent:"center", 
  alignItems:"center", 
  padding:10 ,
  width:135, 
  backgroundColor:"white",
  borderRadius:3,
  borderColor: "#FF543C",
  borderWidth:1,
  marginBottom: 20
 },
 txt: {
   fontSize: 15
 }
});