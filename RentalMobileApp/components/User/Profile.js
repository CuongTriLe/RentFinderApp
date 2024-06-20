import { useContext } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { Button } from "react-native-paper";
import { MyDispatchContext, MyUserContext } from "../../configs/Contexts";
import { formatUrl } from "../../dao";

const Profile = () => {
    const user = useContext(MyUserContext);
    const dispatch = useContext(MyDispatchContext);
   
    return (
        <View >
            <View className={`justify-center items-center bg-white p-4 mt-1`}>
                <View className={`flex-row items-center`}>
                    <Image
                    source={{ uri:formatUrl(user.avatar)  }}
                    className={`w-24 h-24 rounded-full mr-4`}
                    />
                
                <View className={`flex-1`}>
                    <Text className={`text-lg font-bold text-gray-800 mb-2`}>{user.username}</Text>
                </View>
            </View>
            </View>

            <View>
                <Text className="text-xl font-medium mt-2">Bài đăng của bạn</Text>
           
            </View>
            <Button icon="logout" onPress={() => dispatch({"type": "logout"})}>Đăng xuất</Button>
        </View>
        
    );
}

export default Profile;