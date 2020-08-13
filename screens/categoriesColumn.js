import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  Image,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

class categoriesColumn extends Component {
  state = {
    categories : [
      {
        id : "1", 
        title: "Books", 
        image : "https://img.icons8.com/clouds/2x/books.png"
      },
      {
        id : "2", 
        title: "Mobiles", 
        image : "https://t4.ftcdn.net/jpg/01/87/36/45/240_F_187364576_YxpCOYDgfAFSCDQhgysfvp4hYZ05qRWE.jpg"
      },
      {
        id : "3", 
        title: "Watches", 
        image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcHVsPJmUpbX1qe0js7-NLLHWzrJNofP0wrim8dle-Oj5k31CC&s"
      },
      {
        id : "4", 
        title: "Shoes", 
        image : "https://t3.ftcdn.net/jpg/01/67/74/24/240_F_167742407_3qY083CZfrfOQCN3JFMae2u0hQU2aNhU.jpg"
      },
      {
        id : "5", 
        title: "Laptops", 
        image : "https://t3.ftcdn.net/jpg/01/43/49/82/240_F_143498286_vdYyJhJ5feHwv91EYG07WGf8na2vK6G6.jpg"
      },
      {
        id : "6", 
        title: "T-Shirt", 
        image : "https://t4.ftcdn.net/jpg/01/26/50/99/240_F_126509929_8WbAF04diAJ6uz2UtbitNNMNTNiVIVBG.jpg"
      },
      {
        id : "7", 
        title: "Jewelry", 
        image : "https://www.shareicon.net/data/512x512/2016/09/02/824427_jewel_512x512.png"
      },
      {
        id : "8" , 
        title: "Wallets", 
        image : "https://cdn4.iconfinder.com/data/icons/peppyicons-rounded/512/wallet2-512.png"
      },
     
    ]
  }

  renderItemsFunction = (itemData)=>{
    return ( 
      <TouchableOpacity style={styles.item}
          onPress={
            ()=>{
              this.props.navigation.navigate("categoriesProducts" , {title:itemData.item.title,});
            }
          }
        >      
        <View>
          <Image source={{uri : itemData.item.image }} style={{width:90, height:90}} />
        </View>
          <Text style={styles.text} numberOfLines={2}> {itemData.item.title} </Text>
      </TouchableOpacity>

    )
 }

  render() {
    return (
      <View style={styles.main}>
        <FlatList style={{marginTop:5}} data={this.state.categories} numColumns={1} 
          renderItem={this.renderItemsFunction} 
        />      
      </View>
    )
  }
}
const styles = StyleSheet.create({
  main: {
    flex : 1,
    padding : 5,
    backgroundColor : "#f5f5f0",   
  },
  item:{
    flex : 1,
    height:180,
    backgroundColor:"white",
    borderRadius : 5,
    shadowColor: "gray",
    shadowOpacity : 0.4,
    shadowOffset : {width:0, height:2},
    shadowRadius : 2,
    elevation : 2,
    justifyContent : "center",
    alignItems : "center",
    padding : 15,
    margin:5
  },
  text : {
    fontSize : 15,
    fontFamily : "halfmoon_bold",
    alignContent : "flex-end",
    marginTop: 10
  },
});

export default categoriesColumn;