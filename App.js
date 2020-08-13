import React from 'react';
import { StyleSheet } from 'react-native';
import {createStore, combineReducers} from "redux";
import {Provider} from "react-redux";
import AppContainer from "./navigation/navigationConfig"
import productsReducers from "./store/reducers/productsReducers";
import cartReducers from "./store/reducers/cartReducers";

const RootReducer = combineReducers({
  products : productsReducers,
  cartItems : cartReducers,
  itemsCount : cartReducers ,
  wishListItems : cartReducers
});
const store = createStore(RootReducer);
const App = () => {
  return (  
    <Provider store={store}> 
    <AppContainer/>
    </Provider>  
  );
};

const styles = StyleSheet.create({
  main:{
    flex:1,
    justifyContent:"center",
    alignItems: "center"
  }
});

export default App;