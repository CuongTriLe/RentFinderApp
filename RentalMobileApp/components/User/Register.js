import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { HelperText, TextInput, Button, Provider } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';
import APIs from '../../configs/APIs';
import { useNavigation } from '@react-navigation/native';

export default Register = ({ navigation }) => {
    const [user, setUser] = useState({});
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const nav = useNavigation();
    const [showDropdown, setShowDropdown] = useState(false);
    const [type, setType] = useState(1);

    const gotoLogin = () => {
        navigation.navigate('Login');
    };

    const typeList = [
        {
            label: 'Chủ trọ',
            value: 1,
        },
        {
            label: 'Người thuê trọ',
            value: 2,
        },
    ];

    const picker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('RentalMobile', 'Permissions Denied!');
        } else {
            let selectedImages = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                multiple: true, // Cho phép chọn nhiều ảnh
            });

            if (!selectedImages.cancelled) {
                // Thêm các ảnh mới vào mảng images
                updateState('images', user.images ? user.images.concat(selectedImages.assets) : selectedImages.assets);
            }
        }
    };

    const pickAvatar = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('RentalMobile', 'Permissions Denied!');
        } else {
            let avatar = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (!avatar.canceled) {  
                updateState('avatar', avatar.assets[0]); // Cập nhật state user.avatar để lưu thông tin ảnh đại diện
            }
        }
    };

    const updateState = (field, value) => {
        setUser((current) => {
            return { ...current, [field]: value };
        });
    };

    const register = async () => {
        if (user['password'] !== user['confirm']) {
            setErr(true);
        } else {
            setErr(false);

            // Kiểm tra và báo lỗi nếu không đủ 3 ảnh
            if (type === 1 && (!user.images || user.images.length < 3)) {
                Alert.alert('RentalMobile', 'Vui lòng chọn ít nhất 3 hình ảnh phòng trọ.');
                return;
            }

            let form = new FormData();
            for (let key in user) {
                if (key !== 'confirm') {
                    if (key === 'images') {
                        user.images.forEach((image, index) => {
                            form.append(`image_${index}`, {
                                uri: image.uri,
                                name: `image_${index}.jpg`,
                                type: mime.getType(image.uri),
                            });
                        });
                    } else if (key === 'avatar') {
                        form.append(key, {
                            uri: user.avatar.uri,
                            name: user.avatar.fileName,
                            type: mime.getType(user.avatar.uri),
                        });
                    } else {
                        form.append(key, user[key]);
                    }
                }
            }

            console.info(form);
            setLoading(true);
            try {
                let res = await APIs.post('https://letricuong1910.pythonanywhere.com/users/', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.info(res);
                if (res.status === 201) {
                    navigation.navigate('Login');
                }
            } catch (ex) {
                console.error(ex);
            } finally {
                setLoading(false);
            }
        }
    };

    const fields = [
        {
            label: 'Họ',
            icon: 'account',
            name: 'first_name',
        },
        {
            label: 'Tên',
            icon: 'account',
            name: 'last_name',
        },
        {
            label: 'Địa chỉ',
            icon: 'home',
            name: 'address',
        },
        {
            label: 'Số điện thoại',
            icon: 'phone',
            name: 'phone_number',
        },
        {
            label: 'Tên đăng nhập',
            icon: 'account',
            name: 'username',
        },
        {
            label: 'Mật khẩu',
            icon: 'eye',
            name: 'password',
            secureTextEntry: true,
        },
        {
            label: 'Nhập lại mật khẩu',
            icon: 'eye',
            name: 'confirm',
            secureTextEntry: true,
        },
    ];

    useEffect(() => {
        // console.log(user)
    }, [user]);

    return (
        <View>
            <ScrollView>
                <Text className="font-serif text-orange-500 text-xl font-bold text-center mb-10 mt-10">
                    ĐĂNG KÝ TÀI KHOẢN
                </Text>
                <Provider>
                    <DropDown
                        label="Bạn là"
                        mode="outlined"
                        value={type}
                        setValue={setType}
                        list={typeList}
                        visible={showDropdown}
                        showDropDown={() => setShowDropdown(true)}
                        onDismiss={() => setShowDropdown(false)}
                        dropDownStyle={{
                            width: '100%',
                            top: '10%',
                            left: '0',
                        }}
                    />
                    {fields.map((c) =>
                        c.name === 'address' || c.name === 'phone_number' ? (
                            type === 1 ? (
                                <TextInput
                                    secureTextEntry={c.secureTextEntry}
                                    value={user[c.name]}
                                    onChangeText={(t) => updateState(c.name, t)}
                                    key={c.name}
                                    label={c.label}
                                    right={<TextInput.Icon icon={c.icon} />}
                                />
                            ) : null
                        ) : (
                            <TextInput
                                secureTextEntry={c.secureTextEntry}
                                value={user[c.name]}
                                onChangeText={(t) => updateState(c.name, t)}
                                key={c.name}
                                label={c.label}
                                right={<TextInput.Icon icon={c.icon} />}
                            />
                        )
                    )}

                    {/* Hiển thị và upload ảnh đại diện */}
                    <TouchableOpacity onPress={pickAvatar} className="text-pirple-400" style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text className="text-pirple-400">Chọn ảnh đại diện...</Text>
                        {user.avatar && <Image className={'w-20 h-20 border'} source={{ uri: user.avatar.uri }} style={{ width: 100, height: 100, borderRadius: 50, marginTop: 10 }} />}
                    </TouchableOpacity>

                    {/* Hiển thị và upload ảnh phòng trọ */}
                    {type === 1 && (
                        <View>
                            <Text>Upload ít nhất 3 hình ảnh phòng trọ</Text>

                            {/* Hiển thị các ảnh đã chọn */}
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: 10 }}>
                                {user.images &&
                                    user.images.map((image, index) => (
                                        <Image key={index} style={{ width: 100, height: 100, margin: 10 }} source={{ uri: image.uri }} />
                                    ))}
                            </View>

                            {/* Hiển thị thông báo lỗi nếu chưa đủ 3 ảnh */}
                            {user.images && user.images.length < 3 && (
                                <HelperText type="error" visible={true}>
                                    Vui lòng chọn ít nhất 3 hình ảnh.
                                </HelperText>
                            )}

                            {/* Nút để thêm hình ảnh */}
                            <Button onPress={picker}>Thêm hình ảnh...</Button>
                        </View>
                    )}
                </Provider>

                {/* Hiển thị thông báo lỗi */}
                <HelperText type="error" visible={err}>
                    Mật khẩu không khớp!
                </HelperText>

                <Button className="mt-10 bg-orange-400" icon="account" loading={loading} mode="contained" onPress={register}>
                    ĐĂNG KÝ
                </Button>
                <View className="mt-5 ml-20">
                    <Text>
                        Bạn đã có tài khoản?{' '}
                        <TouchableOpacity onPress={() => gotoLogin()}>
                            <Text className="color-orange-400">Đăng nhập</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};
