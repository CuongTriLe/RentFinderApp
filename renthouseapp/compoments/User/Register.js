import {View, Text} from "react-native";
import MyStyles from "../../styles/MyStyles";
import { TextInput } from 'react-native-paper';

const Register = () => {
    const fields =[{
        label: "Tên",
        icon: "text",
        field: "first_name"
    },{
        label: "Họ và tên lót",
        icon: "text",
        field: "last_name",
    },{
        label: "Tên đăng nhập",
        icon: "text",
        field: "username",
    },{
        label: "Mật khẩu",
        icon: "eye",
        field: "password",
        secureTextEntry: true
    },{
        label: "Xác nhận mật khẩu",
        icon: "eye",
        field: "confirm",
        secureTextEntry: true
    }];
    return (
        <View style ={MyStyles.container}>
            <Text style={MyStyles.subject}>ĐĂNG KÝ</Text>
            {fields.map(f => <TextInput style={MyStyles.margin} key={f.field} label={f.label} secureTextEntry right={<TextInput.Icon icon={f.icon}/>}/>)}
            
        </View>
    );
}