import React from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from "react-navigation-drawer";
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import categories from "../screens/categories";
import allProducts from "../screens/allProducts";
import wishlist from "../screens/wishlist";
import cart from "../screens/cart";
import categoriesProducts from "../screens/categoriesProducts";
import productsDetails from "../screens/productsDetails";
import categoriesColumn from "../screens/categoriesColumn";
import location from "../screens/location";
import splash from '../screens/splash';
import login from '../screens/login';
import register from '../screens/register';
import customSidebarMenu from '../screens/components/customSideBarMenu';

const defaultOptionsForStack =  {
    defaultNavigationOptions: {   
        headerStyle: {
            backgroundColor: '#FF543C',
            elevation: 0,
            shadowOpacity: 0
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
            fontWeight: 'bold',
            color: '#FFFFFF',
            fontSize:18
        }
    }       
};
const CategoriesStack = createStackNavigator({
    Categories : {
        screen : categories,
        navigationOptions : {
            headerTitle : " Categories"
        }
    },
    categoriesProducts : {
        screen : categoriesProducts,  
    },
    productsDetails : {
        screen : productsDetails,
        navigationOptions : {
            headerTitle : "Product Details"
        }   
    },
    cart : {
        screen : cart
    },
}, defaultOptionsForStack 
);     
const AllProductsStack = createStackNavigator({  
    allProducts : {
        screen : allProducts,
        navigationOptions : {
            headerTitle : "All Products"
        }
    },
    productsDetails : {
        screen : productsDetails, 
        navigationOptions : {
            headerTitle : "Product Details"
        }
    },
    cart : {
        screen :cart
    }
}, defaultOptionsForStack
);     
const WishListStack = createStackNavigator({
    wishlist : {
        screen : wishlist,
        navigationOptions : {
            headerTitle : "Wish List"
        }
    },
    productsDetails : {
        screen :productsDetails, 
        navigationOptions : {
            headerTitle : "Product Details"
        }
    },
    cart : {
        screen : cart
    }
}, defaultOptionsForStack
);     
const CartStack = createStackNavigator({
    cart : {
        screen : cart,
        navigationOptions:{
            headerTitle : "Items in Cart"
        }
    },
    location:{
        screen: location,
        navigationOptions:{
            headerTitle: "Detect Location"
        }
    }
}, defaultOptionsForStack
);
const ColumnStack = createStackNavigator({
    categoriesColumn : {
        screen : categoriesColumn,
        navigationOptions:{
            headerTitle : "Categories"
        }
    },
}, defaultOptionsForStack
);     
const TabNavigator = createBottomTabNavigator({
    Grid_View: {
        screen :  CategoriesStack,
        navigationOptions : {
            tabBarIcon: ({ tintColor }) => {
                return   <FontAwesome name="th" size={20} color={tintColor}/>
            }    
        },
    },
    Column_View: {
        screen: ColumnStack,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => {
                return <Icon name = "align-justify" size = {20} color = {tintColor}/>
            }
        }
    },
    Products : {
        screen : AllProductsStack,
        navigationOptions : {
            tabBarIcon: ({ tintColor }) => {
                return   <Icon name="tshirt" size={20} color={tintColor} />
            }
        }
    },   
    "Wish List": {
    screen :  WishListStack,
        navigationOptions : {
            tabBarIcon: ({ tintColor }) => { 
                return   <Fontisto name="heart" size={20} color={tintColor} />
            }
        }
    },   
    Cart: {
        screen :  CartStack,
            navigationOptions : {
                tabBarIcon: ({ tintColor }) => {
                    return   <Icon name="shopping-cart" size={20} color={tintColor} />
                }
        }
    },
}, {
        tabBarOptions : {
            showLabel : true,
            activeTintColor : "#FF543C",
            inactiveTintColor : "black",
            tabStyle : {height : 50 , zIndex:99, borderColor:"white", borderTopWidth:0},
            labelStyle : {fontSize: 12, paddingTop:2,paddingBottom:3, fontFamily : "halfmoon_bold",},
        }
    }
);

const DrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: TabNavigator,
        }
    },
    {
        contentComponent: customSidebarMenu,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
      }
);
const StackNavigator = createStackNavigator(
    {
        DrawerNavigator : DrawerNavigator
    },{
        defaultNavigationOptions:{
            headerShown: false
        }
    }
);
const SwitchNavigator = createSwitchNavigator(
    {
        splash: splash,
        login: login,
        register: register,
        Stack : StackNavigator,
    },
    {
        initialRouteName: 'splash'
    },
)

export default createAppContainer(SwitchNavigator);