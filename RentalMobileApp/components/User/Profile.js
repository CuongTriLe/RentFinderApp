import { useContext } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { MyDispatchContext, MyUserContext } from "../../configs/Contexts";


const Profile = () => {
    const user = useContext(MyUserContext);
    const dispatch = useContext(MyDispatchContext);
   
    return (
        <View >
            <Text >CHÀO {user.username}!</Text>
            <Button icon="logout" onPress={() => dispatch({"type": "logout"})}>Đăng xuất</Button>
        </View>
    );
}

export default Profile;