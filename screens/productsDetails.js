import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';  
import { HeaderButtons , Item } from "react-navigation-header-buttons";
import headerButton from "./headerButton";
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import {connect} from "react-redux";

class productsDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title : navigation.getParam("title"),
      headerRight: () => <View style={{flexDirection:"row"}}> 
        <View>
          <Badge value={navigation.getParam("count")} status="primary" 
            containerStyle={{ position: 'absolute',  right: 4 , zIndex:999}}
          />
          <HeaderButtons HeaderButtonComponent={headerButton}>
            <Item title="Favourtie" iconName="shopping-cart" 
            onPress={()=>{
              console.log("Pressed");
            }}
              style={{marginTop:4}}
            />
          </HeaderButtons>
        </View>
      </View>
    };
  };
  state = {
    count : -12
  }
  componentDidMount = ()=>{
    let count = this.props.itemsCount.itemsCount;
    console.log(count);
    this.props.navigation.setParams({
      count : count,
    });
  }
  getItemsCount = ()=>{
    this.setState({
      count : this.state.count+1
    },
      ()=>{
        let count = this.props.itemsCount.itemsCount;
          console.log(count);
          this.props.navigation.setParams({
            count : count,
          });
      }
    );
  }
  addCartHandler = (book)=>{
    this.getItemsCount();
    let qty = 1;
    book.quantity = qty;
    this.props.addToCart(book);
    this.props.navigation.goBack();
  }
  render() {
    let book = this.props.navigation.getParam("newBook");
      return (
        <ScrollView>
          <View style={styles.main}>
              <NavigationEvents
                onDidFocus={() => {
                  this.getItemsCount()
                }}
              />
              <Image
                source={{ uri: book.image }}
                style={styles.fitImage}
              />
              <View style={styles.infoBox}>
                <Text>Product </Text>
                <Text style={styles.propText}>{book.title}</Text>
              </View>    
              <View style={styles.infoBox}>
                <Text>Category</Text>
                <Text style={styles.propText}>{book.category}</Text>
              </View>
              <View style={styles.infoBox}>
                <Text>Price</Text>
                <Text style={styles.propText}>Rs.{book.Price}</Text>
              </View>
              <View style={styles.rating}>
              <View style={{...styles.infoBox, flexDirection:"column"}}>   
                <Text> Description! </Text>
                <Text>{book.Description}</Text>
              </View>
              <Rating    
                startingValue={Math.floor(parseInt(book.rating))}
                ratingCount={5}
                imageSize={40}
                showRating
              />
              </View>
                <View style={{alignItems:"center"}}>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={()=>{
                    this.addCartHandler(book);
                  }}
                >
                  <Text style={styles.style1}>Add to  Cart</Text>
                </TouchableOpacity>
              </View> 
          </View>
        </ScrollView>    
      )
  }
}
const mapStateToProps = (state)=>{
  return {
    products : state.products,
    itemsCount : state.itemsCount,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    addToCart : (itemData)=>{
      dispatch({
        type : "ADD_TO_CART",
        item : itemData
      });
    }
  }
}
const styles = StyleSheet.create({
  main: {
    flex : 1,
    padding : 10,
  },
  rating : {
    marginTop:10,
    marginBottom:10
  },
  infoBox: {
    flexDirection:"row", 
    justifyContent:"space-between", borderColor:"gray",
    borderWidth:1,
    padding:10,
    marginTop:15,
  },
  button: {
    justifyContent:"center", 
    alignItems:"center", 
    padding:10 ,
    width:"80%", 
    backgroundColor:"#FF543C",
    borderRadius:3,
    marginBottom:20
  },
  fitImage: {
    borderRadius: 5,
    zIndex : -1,
    resizeMode:"contain",
    width:"100%",
    height:430
  },
  style1: {
    color:"white", 
    fontWeight:"bold", 
    fontSize:20
  },
  fitImageWithSize: {
    height: 100,
    width: 30,
  },
  defaultText:{
    fontSize : 15,
  },
  propText: {
    fontFamily : "halfmoon_bold",
    fontSize : 15,
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(productsDetails);