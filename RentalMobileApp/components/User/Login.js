import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';


const Login = () => {
  
  return (
    <View className={`flex-1 justify-center items-center bg-white`}>
      <View className={`w-full h-3/4  bg-gray-100 p-3 rounded-lg shadow-md`}>
        <Text className={`text-3xl font-bold mb-8 text-center text-orange-500`}>Đăng nhập</Text>
        <TextInput 
          className={`bg-gray-200 mb-4 px-4 py-6 rounded-lg text-base`}
          placeholder="Tên đăng nhập"
          placeholderTextColor="#A0AEC0"
        />
        <TextInput 
          className={`bg-gray-200 mb-8 px-4 py-6 rounded-lg text-base`}
          placeholder="Mật khẩu"
          placeholderTextColor="#A0AEC0"
          secureTextEntry={true}
        />
        <TouchableOpacity
          className={`bg-orange-500 py-2 rounded-lg`}
        >
          <Text className={`text-white text-center text-lg font-bold`}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
