import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, Image, useWindowDimensions, TextInput } from "react-native"
import APIs, { endpoints } from "../../configs/APIs";
import React, { useState } from "react"
import moment from "moment";
import { formatUrl } from "../../dao";
import RenderHTML from "react-native-render-html";
import Icon from 'react-native-vector-icons/FontAwesome';



const Home = ({ navigation }) => {
    const [ownerposts, setOwnerposts] = React.useState([]);
    const [userposts, setUserposts] = React.useState([]);
    const { width } = useWindowDimensions()


    const gotoPostDetail = (ownerpostId) => {
        navigation.navigate("OwnerPostDetails", { ownerpostId })
    }

    const loadOwnerposts = async () => {
        try {
            let res = await APIs.get(endpoints['owner-posts']);
            console.log(res.data.results);
            setOwnerposts(res.data.results);

        } catch (ex) {
            console.error(ex);
        }
    }
    const loadUsesrposts = async () => {
        try {
            let res = await APIs.get(endpoints['user-posts']);
            console.log(res.data.results);
            setUserposts(res.data.results);

        } catch (ex) {
            console.error(ex);
        }
    }
    const handleSearch = async (text) => {
        try {
            let res = await APIs.get(endpoints['owner-posts'], { params: { c: text } });
            setOwnerposts(res.data.results);
        } catch (err) {
            console.error(err)
        }
    }

    React.useEffect(() => {
        loadOwnerposts();
        loadUsesrposts();
    }, [])

    const OwnerPostView = () => {
        return (<ScrollView>
            {ownerposts == null ? <ActivityIndicator /> : <>
                {ownerposts.map(h => {
                    return (
                        <View key={h.id} className={`bg-white shadow-md border-b-2 border-orange-300 rounded-lg p-3 mb-4`}>
                            <TouchableOpacity onPress={() => gotoPostDetail(h.id)}>
                                <RenderHTML
                                    contentWidth={width}
                                    source={{ html: h.post_content }}
                                />
                            </TouchableOpacity>
                            {h.house.images.map((image) => (
                                <Image
                                    source={{ uri: image.image }}
                                    className={`w-full h-48 rounded-lg mb-4`}
                                    resizeMode="cover"
                                />
                            ))}
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


    return (
        <View className={' flex mt-[10px]'}>
            <View className={`bg-gray-200 p-2 rounded-lg w-full flex-row items-center mb-8`}>
                <Icon name="search" size={20} color="#f80" className={`mr-2`} />
                <TextInput
                    className={`flex-1 px-4 py-2 text-gray-800 text-base`}
                    placeholder="Tìm kiếm..."
                    placeholderTextColor="#A0AEC0"
                    onChangeText={(value) => handleSearch(value)}
                />
                <TouchableOpacity
                    className={`bg-orange-400 px-4 py-2 rounded-lg ml-2`}
                >
                    <Text className={`text-white font-bold`}>Tìm kiếm</Text>
                </TouchableOpacity>
            </View>
            <Text className={'font-serif text-orange-500 text-xl font-bold text-center mb-10'}>TRANG CHỦ</Text>
            <OwnerPostView />
        </View>
    )
}

export default Home;