import {View, Text} from "react-native";
import MyStyles from "../../styles/MyStyles";
import { TextInput } from 'react-native-paper';

const Login = () => {
    const fields = [{
        label: "Tên tài khoản",
        icon: "text",
        field: "username",
        secureTextEntry: true
    }, {
        label: "Mật khẩu",
        icon: "eye",
        field: "password",
        secureTextEntry: true
    }
];
    return (
        <View style ={MyStyles.container}>
            <Text style={MyStyles.subject}>ĐĂNG NHẬP</Text>
            {fields.map(f => <TextInput style={MyStyles.margin} key={f.field} label={f.label} secureTextEntry right={<TextInput.Icon icon={f.icon}/>}/>)}
            
        </View>
    );
}

export default Login;