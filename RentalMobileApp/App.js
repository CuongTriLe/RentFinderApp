import React, { useReducer } from 'react';
import  Home from './components/Home/Home'
import Login from './components/User/Login'
import Post from './components/Post/Post'
import Rooms from './components/Rooms/Rooms'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OwnerPostDetails from './components/Post/OwnerPostDetails';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyTab = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name = 'Home' component = {Home} options={{tabBarIcon: () => <Icon size = {30} color ="#ff8800" source= "home" />}}/>
        <Tab.Screen name = 'Login' component = {Login} options={{tabBarIcon: () => <Icon size = {30} color ="#ff8800" source= "account"/>}}/>
        <Tab.Screen name = 'Post' component = {Post} options={{tabBarIcon: () => <Icon size = {30} color ="#ff8800" source= "post"/>}}/>
      </Tab.Navigator>
  )
}

const MyStack = () => {
  return (
    <Stack.Navigator defaultNavigationOptions={{headerTitleAlign: 'center'}}>
<Stack.Screen
        name="MyTab"
        component={MyTab} 
        options={{ headerShown: false }}
      />  

      <Stack.Screen name ='Rooms' component={Rooms}></Stack.Screen>
      <Stack.Screen name ='OwnerPostDetails' component={OwnerPostDetails}></Stack.Screen>
</Stack.Navigator>
  )
}
export default function App() {

  return (
    <NavigationContainer>
      <MyStack></MyStack>
    </NavigationContainer>
  );
}

