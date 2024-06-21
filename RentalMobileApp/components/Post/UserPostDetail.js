import { View, Text, ScrollView, TouchableOpacity, Image, RefreshControl } from "react-native"
import APIs, { endpoints, authApi } from "../../configs/APIs";
import React from "react";
import { ActivityIndicator, TextInput, Button } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import moment from 'moment'
import { MyUserContext } from "../../configs/Contexts";
import { useContext } from "react";
import { getTokens } from "../Utils/Utilities";


const UserPostDetails = ({ route }) => {
    const user = useContext(MyUserContext);
    const [userposts, setUserpost] = React.useState([]);
    const [comments, setComments] = React.useState({});
    const [commentList, setCommentList] = React.useState([]);
    const { userpostId } = route.params;

    const loadUserpost = async () => {
        try {
            let res = await APIs.get(endpoints['user-posts-details'](userpostId));
            setUserpost([res.data]);
        } catch (ex) {
            console.error(ex);
        }
    }
    const loadCommentList = async () => {
        try {
            res = await APIs.get(endpoints['user-posts-comments'](userpostId));
            console.log(res.data)
            setCommentList(res.data)

        } catch (err) {
            console.log(err)
        }
    }

    const updateSate = (field, value) => {
        setComments(current => {
            return { ...current, [field]: value }
        })
    }

    const field = [
        {
            "name": "comment_content"
        }
    ]
    const postcomments = async () => {
        const { accessToken, refreshToken } = await getTokens();
        if (comments['comment_content'] !== '') {

            let form = new FormData();
            form.append('comment_content', comments['comment_content'])
            form.append('author', user.id)
            try {
                let res = await authApi(accessToken).post(endpoints['user-posts-comments-post'](userpostId), form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } catch (ex) {
                console.log(ex)
            }
        }
        else
            Alert.alert('Thông báo', 'Nội dung bình luận trống')
        setTimeout(() => {
            loadCommentList();
        }, 200)
    }
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadUserpost();
        setTimeout(() => {
            loadCommentList();
        }, 100)
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    React.useEffect(() => {
        loadUserpost();
        loadCommentList();
    }, [userpostId]);

    return (
        <>
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
            <View>
                <Text className={`text-sm text-black-600-mb-2 font-bold ml-2`}>Bình luận</Text>
                {field.map(c => <TextInput placeholder="Nhập bình luận..." value={comments[c.name]} onChangeText={t => updateSate(c.name, t)} key={c.name} />)}
                <Button width='30%' style={{ alignSelf: "flex-end" }} className="mt-2 mr-2 mb-2 flex bg-orange-400" icon="account" mode="contained" onPress={postcomments}>Bình luận</Button>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    {commentList == null ? <ActivityIndicator /> : <>
                        {commentList.map(h => {
                            return (
                                <View key={h.id} className={`bg-white shadow-md border-b-2 border-orange-300 rounded-lg p-3 mb-4`}>
                                    <View className={`flex-row items-center mb-4`}>
                                        <Image
                                            source={{ uri: h.author_avatar }}
                                            className={`w-10 h-10 rounded-full mr-2`}
                                        />
                                        <Text className={`text-base text-gray-600`}>{h.author_name}</Text>
                                    </View>
                                    <RenderHTML
                                        contentWidth='50%'
                                        source={{ html: h.comment_content }}
                                    />

                                    <Text className={`text-sm text-gray-600 mb-2`}>{moment(h.created_date).fromNow()}</Text>
                                </View>
                            )
                        })}
                    </>}
                </ScrollView>
            </View>

        </>
    )

}
export default UserPostDetails;