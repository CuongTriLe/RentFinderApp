import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, Image, useWindowDimensions, TextInput, RefreshControl } from "react-native"
import APIs, { endpoints } from "../../configs/APIs";
import React, { useState } from "react"
import moment from "moment";
import DropDown from 'react-native-paper-dropdown';
import RenderHTML from "react-native-render-html";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useContext } from "react";
import { MyUserContext } from "../../configs/Contexts";
import { Provider } from "react-native-paper";


const Post = () =>{
    const user = useContext(MyUserContext);
    const field = [
        {
            "label": "Nội dung bài đăng",
            "name": "post_content",
        },
        {
            "name": ""
        }
    ]
    return (
        <View>
            <Text></Text>
        </View>
    )
}
export default Post;