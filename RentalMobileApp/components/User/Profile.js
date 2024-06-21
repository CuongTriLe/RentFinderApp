import { useContext } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, useWindowDimensions, RefreshControl } from "react-native";
import { Button } from "react-native-paper";
import { MyDispatchContext, MyUserContext } from "../../configs/Contexts";
import { formatUrl } from "../../dao";
import RenderHTML from "react-native-render-html";
import React, { useState } from "react"
import APIs, { endpoints } from "../../configs/APIs";
import moment from "moment";

const Profile = ({navigation}) => {
    const user = useContext(MyUserContext);
    const dispatch = useContext(MyDispatchContext);
    const [ownerposts, setOwnerposts] = React.useState([]);
    const [userposts, setUserposts] = React.useState([]);
    const { width } = useWindowDimensions();


    const gotoPostDetail = (ownerpostId) => {
        navigation.navigate("OwnerPostDetails", { ownerpostId })
    }


    const loadOwnerposts = async () => {
        try {
            let res = await APIs.get(endpoints['owner-posts-lists'](user.id));
            setOwnerposts(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }
    const loadUserposts = async () => {
        try {
            let res = await APIs.get(endpoints['user-posts-lists'](user.id));
            setUserposts(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }

    React.useEffect(() => {
        loadOwnerposts();
        loadUserposts();
    }, [user.id])

    const OwnerPostView = () => {
        return (<ScrollView>
            {ownerposts == null ? <ActivityIndicator /> : <>
                {ownerposts.map(h => {
                    return (
                        <View key={h.id} className={`bg-white shadow-md border-b-2 border-orange-300 rounded-lg p-3 mb-4`}>
                            <View className={`flex-row items-center`}>
                                <Image
                                    source={{ uri: h.author_avatar }}
                                    className={`w-10 h-10 rounded-full mr-2`}
                                />

                                <Text className={`text-base text-gray-600`}>{h.author_name}</Text>
                            </View>
                            <TouchableOpacity onPress={() => gotoPostDetail(h.id)}>
                                <RenderHTML
                                    contentWidth={width}
                                    source={{ html: h.post_content }}
                                />
                                {h.house.images.map((image) => (
                                    <Image
                                        source={{ uri: image.image }}
                                        className={`w-full h-48 rounded-lg mb-2`}
                                        resizeMode="cover"
                                    />
                                ))}
                            </TouchableOpacity>

                            <Text className={`text-sm text-gray-600 mb-2`}>{moment(h.created_date).fromNow()}</Text>
                            
                        </View>
                    )
                })}
            </>}</ScrollView>)
    }

    const UserPostView = () => {
        return (<ScrollView >
            {userposts == null ? <ActivityIndicator /> : <>
                {userposts.map(h => (
                    <View key={h.id} className={`bg-white shadow-md border-b-2 border-blue-300 rounded-lg p-4 mb-4`}>
                        <View className={`flex-row items-center mb-4`}>
                            <Image
                                source={{ uri: h.author_avatar }}
                                className={`w-10 h-10 rounded-full mr-2`}
                            />

                            <Text className={`text-base text-gray-600`}>{h.author_name}</Text>
                        </View>
                        <TouchableOpacity >
                            <RenderHTML
                                source={{ html: h.post_content }}
                            />
                        </TouchableOpacity>
                        <Text className={`text-sm text-gray-600 mb-2`}>Khu vực: {h.find_area_address}</Text>
                        <Text className={`text-sm text-gray-600 mb-2`}>{moment(h.created_date).fromNow()}</Text>
                    </View>
                ))}
            </>}
        </ScrollView>)
    }
    //---------------------------------------View----------------------------------------//
    return (
        <View >
            <View className={`justify-center items-center bg-white p-4 mt-1`}>
                <View className={`flex-row items-center`}>
                    <Image
                        source={{ uri: formatUrl(user.avatar) }}
                        className={`w-24 h-24 rounded-full mr-4`}
                    />

                    <View className={`flex-1`}>
                        <Text className={`text-lg font-bold text-gray-800 mb-2`}>Xin Chào, </Text>
                        <Text className={`text-lg text-gray-800 mb-2`}>{user.first_name} {user.last_name}</Text>
                    </View>
                </View>
            </View>
            <Button icon="logout" onPress={() => dispatch({ "type": "logout" })}>Đăng xuất</Button>
            <View>
                <Text className="text-xl font-medium m-2">Bài đăng của bạn</Text>
            </View>
            <OwnerPostView/>
            <UserPostView/>
        </View>


    );
}

export default Profile;