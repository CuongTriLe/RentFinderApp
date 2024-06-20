import { Alert, Text, View, ScrollView } from "react-native"
import APIs, { endpoints,authApi } from "../../configs/APIs";
import React from "react";
import { Image } from "react-native";
import { ActivityIndicator, TextInput, Button } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import moment from 'moment'
import { MyUserContext } from "../../configs/Contexts";
import { useContext } from "react";



const OwnerPostDetails = ({ route }) => {
    const currentUser = useContext(MyUserContext);
    const [ownerposts, setOwnerpost] = React.useState([]);
    const [comments, setComments] = React.useState({});
    const [commentList, setCommentList] = React.useState([]);
    const { ownerpostId } = route.params;
    
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
        if (comments['comment_content'] !== undefined) {
            let form = new FormData();
            form.append('comment_content', comments['comment_content'])
            form.append('author', currentUser)
            try {
                let res = await APIs.post(endpoints['owner-posts-comments-post'](ownerpostId), form);
            } catch (ex) {
                console.log(ex)
            }
        }
        else
            Alert.alert('Thông báo', 'Nội dung bình luận trống')
    }
    React.useEffect(() => {
        const loadOwnerpost = async () => {
            try {
                let res = await APIs.get(endpoints['owner-posts-details'](ownerpostId));
                console.log(res.data.house.address)
                setOwnerpost([res.data]);
            } catch (ex) {
                console.error(ex);
            }
        }
        const loadCommentList = async () => {
            try {
                res = await APIs.get(endpoints['owner-posts-comments'](ownerpostId));
                console.log(res.data)
                setCommentList(res.data)

            } catch (err) {
                console.log(err)
            }
        }
        
        loadOwnerpost();
        loadCommentList();
    }, [ownerpostId]);

    return (
        <>
            {ownerposts == null ? <ActivityIndicator /> : <>
                {ownerposts.map(h => (
                    <View key={h.id} className={`flex-row items-center bg-white rounded-lg shadow-md p-4 mb-4`}>
                        {h.house.images.map((image) => (
                            <Image
                                source={{ uri: image.image }}
                                className={`w-1/3 h-32 rounded-lg mr-4`}
                                resizeMode="cover"
                            />))}
                        <View className={`flex-1`}>
                            <RenderHTML
                                source={{ html: h.post_content }}
                            />
                            <Text className={`text-sm text-black-600 mb-2`}>
                                {h.house.address}
                            </Text>
                        </View>
                    </View>
                ))}

            </>
            }
            <View>
                <Text className={`text-sm text-black-600-mb-2 font-bold ml-2`}>Bình luận</Text>
                {field.map(c => <TextInput placeholder="Nhập bình luận..." value={comments[c.name]} onChangeText={t => updateSate(c.name, t)} key={c.name} />)}
                <Button width='30%' style={{ alignSelf: "flex-end" }} className="mt-2 mr-2 mb-2 flex bg-orange-400" icon="account" mode="contained" onPress={postcomments}>Bình luận</Button>
                <ScrollView>
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
export default OwnerPostDetails;