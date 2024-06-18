import React, { useReducer, useContext} from 'react';
import  Home from './components/Home/Home'
import Login from './components/User/Login'
import Post from './components/Post/Post'
import Rooms from './components/Rooms/Rooms'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OwnerPostDetails from './components/Post/OwnerPostDetails';
import { MyDispatchContext, MyUserContext } from './configs/Contexts';
import { MyUserReducer } from './configs/Reducers';
import Profile from './components/User/Profile';
import Register from './components/User/Register';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyTab = () => {
  const user = useContext(MyUserContext); 
  return (
    <Tab.Navigator>
        <Tab.Screen name = 'Home' component = {Home} options={{tabBarIcon: () => <Icon size = {30} color ="#ff8800" source= "home" />}}/>
        {user === null?<>
        
      <Tab.Screen name="Login" component={Login} options={{title: "Đăng nhập", tabBarIcon: () => <Icon size={30} color="#ff8800" source="login" />}} />
      </>:<>
        <Tab.Screen name="Profile" component={Profile} options={{ title: user.username, tabBarIcon: () => <Icon size={30} color="#ff8800" source="account" />}} />
        <Tab.Screen name = 'Post' component = {Post} options={{tabBarIcon: () => <Icon size = {30} color ="#ff8800" source= "post"/>}}/>
      </>}
        
        
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
      <Tab.Screen name="Register" component={Register} options={{ title: "Đăng ký", tabBarIcon: () => <Icon size={30} color="#ff8800" source="account" />}} />
    </Stack.Navigator>
  )
}
export default function App() {
  const [user,dispatch] = useReducer(MyUserReducer,null);

  return (
    


    <NavigationContainer>
          <MyUserContext.Provider value={user}>
            <MyDispatchContext.Provider value={dispatch}>
              <MyStack />
            </MyDispatchContext.Provider>
          </MyUserContext.Provider>
        </NavigationContainer>
  );
}



