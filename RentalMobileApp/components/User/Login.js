import { View, Text, TouchableOpacity } from "react-native";
import { Button, TextInput } from "react-native-paper";
import React, { useContext } from "react";
import APIs, { authApi, endpoints } from "../../configs/APIs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { MyDispatchContext } from "../../configs/Contexts";
import { setTokens } from "../Utils/Utilities";

const Login = ({navigation}) => {
    const [user, setUser] = React.useState({});
    const fields = [{
        "label": "Tên đăng nhập",
        "icon": "account",
        "name": "username"
    }, {
        "label": "Mật khẩu",
        "icon": "eye",
        "name": "password",
        "secureTextEntry": true
    }];
    const [loading, setLoading] = React.useState(false);
    const dispatch = useContext(MyDispatchContext);

    const gotoRegister = () =>{
        navigation.navigate("Register")
    }

    const updateSate = (field, value) => {
        setUser(current => {
            return {...current, [field]: value}
        });
    }

    const login = async () => {
        setLoading(true);
        try {
          console.log(user)
            let res = await APIs.post(endpoints['login'],new URLSearchParams({
              'grant_type': 'password',
              'client_id': 'pHJ3YFeFZF9XOj4BI7IPkqiqsffno61iMJjZtyfA',
              'client_secret': 'mvuP0IKpAjetondce9Q97tYPiq0IGYADnwK1xeAKuzI96H4mSXN5bD2zPStrxn8zjsogXpbjw4occ9IxnoIudo3DsK5nfg3tfkNbrKxfPcnsgnm9Fy5IbmTUOhLbezVm',
              ...user
          }), 
          {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              }
          });
            console.info(res.data);
            await setTokens(res);

            
            setTimeout(async () => {
                let user = await authApi(res.data.access_token).get(endpoints['current-user']);
                console.info(user.data);

                dispatch({
                    'type': "login",
                    'payload': user.data
                })

                navigation.navigate('Home');
            }, 100);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }   
    }

    return (
        <View >
            <Text className= {'font-serif text-orange-500 text-xl font-bold text-center mb-10 mt-10'} >ĐĂNG NHẬP NGƯỜI DÙNG</Text>
            {fields.map(c => <TextInput secureTextEntry={c.secureTextEntry} value={user[c.name]} onChangeText={t => updateSate(c.name, t)}  key={c.name} label={c.label} right={<TextInput.Icon icon={c.icon} />} />)}
            <Button className ="mt-10 bg-orange-400"icon="account" loading={loading} mode="contained" onPress={login}>ĐĂNG NHẬP</Button>
            <View className="mt-5 ml-20">
                <Text>Bạn chưa có tài khoản ? <TouchableOpacity onPress={() => gotoRegister()}><Text className="color-orange-400">Đăng ký</Text></TouchableOpacity></Text>
            </View>
        </View>
    );
}

export default Login;