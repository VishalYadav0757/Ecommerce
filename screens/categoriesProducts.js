import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Button
} from 'react-native'; 
import { NavigationEvents } from 'react-navigation';
import { Rating, AirbnbRating } from 'react-native-ratings';  
import { HeaderButtons , Item } from "react-navigation-header-buttons";
import headerButton from "./headerButton";
import { Avatar, Badge,  withBadge } from 'react-native-elements';
import {connect} from "react-redux";
import Fontisto from 'react-native-vector-icons/Fontisto';

class categoriesProducts extends Component {    
  state = {
    filteredProducts : [],
    count : -12
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title : navigation.getParam("title"),
      headerRight: () => <View style={{flexDirection:"row"}}>
        <View style={styles.style1}>
          <TextInput placeholder="Search..." style={{padding:5}} />
        </View>
        <HeaderButtons HeaderButtonComponent={headerButton}>
          <Item title="Favourtie" iconName="search" 
            onPress={()=>{
              console.log("Pressed");
            }}
          />
        </HeaderButtons>   
        <View>
          <Badge value={navigation.getParam("count")} status="primary" 
            containerStyle={{ position: 'absolute',  right: 4 , zIndex:999}}
          />
          <HeaderButtons HeaderButtonComponent={headerButton}>
            <Item title="Favourtie" iconName="shopping-cart" 
              onPress={
                ()=>{
                  navigation.navigate("cart");
                } 
              }
              style={{marginTop:4}}
            />
          </HeaderButtons>  
        </View>
      </View>
    };
  };
  componentDidMount = ()=>{
    let category = this.props.navigation.getParam("title");
    let products = this.props.products.products.filter(
      (product)=>{
        return product.category == category
      }
    );
    this.setState({
      filteredProducts : products,
    });
    let count = this.props.itemsCount.itemsCount;
    this.props.navigation.setParams({
      count,
    });
  }
  addToWishListHandler = (book)=>{
    this.props.addToWishList(book);
    this.getItemsCount();
    }
  getItemsCount = ()=>{
    this.setState({
        count : this.state.count+1
      },
      ()=>{
        let count = this.props.itemsCount.itemsCount;
        this.props.navigation.setParams({
          count : count,
        });
      }
    );
  }
  addCartHandler = (book)=>{
   let qty = 1;
   book.quantity = qty;
    this.props.addToCart(book);
    this.getItemsCount();
  }
  loadBooks = (book)=>{
    let newBook = {
      id : book.item.id,
      title : book.item.title,
      Description : book.item.Description,
      image : book.item.image,
      Price : book.item.Price,
      category : book.item.category,
      rating : book.item.rating,
      favourite: book.item.favourite
    }
    return (
      <TouchableOpacity onPress={
        ()=>{
          this.props.navigation.navigate("productsDetails", 
            {newBook} );
        }
        }>
        <View style={styles.productMain}>
          <View style={styles.style2}>
            <Image style={styles.imageStyle} 
              source={{uri : book.item.image}} />
          </View>
          <View style={styles.style3}>
            <View style={{overFlow:"hidden"}}>
              <Text numberOfLines={1} style={styles.text}>{book.item.title}</Text>
            </View>
            <Text style={{color:"#666666"}}>Category : {book.item.category}</Text>
            <Text style={styles.text}>Price : Rs.{book.item.Price}</Text>
            <Rating
              startingValue={ Math.floor(parseInt(book.item.rating))}
              ratingCount={5}
              imageSize={25} 
              style={{alignItems:"flex-start"}}
            />
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity style={styles.button} 
                onPress={()=>{
                  this.addCartHandler(newBook);
                }}
              >
                <Text style={styles.style4}>Add to Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={()=>{
                  this.addToWishListHandler(newBook);
                }}>
                <Fontisto name="heart" size={33} color="#FF543C" style={{marginLeft:10}}/>
              </TouchableOpacity>
            </View>
          </View>     
        </View>
      </TouchableOpacity>
    )
  }
  render() {   
    return (
      <View style={styles.main}>
        <NavigationEvents
          onDidFocus={() => {
            this.getItemsCount()
          }}
        />
        <FlatList data={this.state.filteredProducts} renderItem={
          this.loadBooks
          }
        />
      </View>
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
      },
      addToWishList : (itemData)=>{
        dispatch({
          type : "ADD_TO_WISH_LIST",
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
  style1: {
    width: 200,
    borderColor:"white",
    borderRadius:3,
    borderWidth:1,
    backgroundColor:"white"
  },
  style2: {
    width:"35%", 
    height:200
  },
  style3: {
    justifyContent: "space-around", 
    alignContent:"center",  
    marginLeft:20
  },
  style4: {
    color:"#FF543C", 
    fontWeight:"bold"
  },
  imageStyle: {
    width : "100%", 
    height:"95%", 
    resizeMode:"contain", 
    borderRadius:5
  },
  button: {
    justifyContent: "space-around", 
    alignContent:"center",  
    marginLeft:20
  },
  bookMain :{
    marginTop:10,
    width : "100%",
    height:500, 
    borderColor:"black", 
    borderWidth:1,
    borderRadius : 5
  },
  productMain: {
    flexDirection:"row", 
    justifyContent:"flex-start", 
    borderBottomColor:"gray",
    borderBottomWidth:1,
    marginBottom:5     
  },
  text : {
    color:"black",
    fontFamily : "halfmoon_bold",
    fontSize: 15,
    fontWeight:"bold",
    overflow:"hidden",
    width:"90%",
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(categoriesProducts);