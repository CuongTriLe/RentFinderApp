import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, Image, useWindowDimensions, TextInput, RefreshControl } from "react-native"
import APIs, { endpoints } from "../../configs/APIs";
import React, { useState } from "react"
import moment from "moment";
import DropDown from 'react-native-paper-dropdown';
import RenderHTML from "react-native-render-html";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useContext } from "react";
import { MyUserContext } from "../../configs/Contexts";
import { Provider } from "react-native-paper";




const Home = ({ navigation }) => {
    const [ownerposts, setOwnerposts] = React.useState([]);
    const [userposts, setUserposts] = React.useState([]);
    const { width } = useWindowDimensions()
    const [nextPostUser, setNextPostUser] = useState('')
    const [nextPostOwner, setNextPostOwner] = useState('')
    const user = useContext(MyUserContext);
    const [selectedDistrict, setSelectedDistrict] = useState(1);
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [showDropdown1, setShowDropdown1] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    
    
    const districtList = [
        {
            label: 'Huyện Nhà Bè',
            value: 'Huyện Nhà Bè',
        },
        {
            label: 'Quận 12',
            value: 'Quận 12',
        },
        {
            label: 'Quận Gò Vấp',
            value: 'Quận Gò Vấp',
        },
        
    ];
    const priceLevelList = [
        {
            label: '< 5 triệu',
            value: '0-5000000',
        },
        {
            label: '5 triệu - 10 triệu',
            value: '5000000-10000000',
        },
        {
            label: '> 10 triệu',
            value: '10000000',
        },
    ];

    const gotoPostDetail = (ownerpostId) => {
        navigation.navigate("OwnerPostDetails", { ownerpostId })
    }

    const loadOwnerposts = async () => {
        try {
            let res = await APIs.get(nextPostOwner || endpoints['owner-posts']);
            console.log(res.data.results);
            setOwnerposts([...ownerposts, ...res.data.results]);
            setNextPostOwner(res.data.next)

        } catch (ex) {
            console.error(ex);
        }
    }

    const loadUsesrposts = async () => {
        try {
            let res = await APIs.get(nextPostUser || endpoints['user-posts']);
            console.log(res.data.results);
            setUserposts([...userposts, ...res.data.results]);
            setNextPostUser(res.data.next)

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
    function ScrollViewPost(){
        if (user.is_owner == true)
            return (<UserPostView/>)
        else
            return (<OwnerPostView/>)
    }

    React.useEffect(() => {
        loadOwnerposts();
        setTimeout(() => {
            loadUsesrposts();
        }, 100)
    }, [])

    const OwnerPostView = () => {
        return (<ScrollView>
            {ownerposts == null ? <ActivityIndicator /> : <>
                {ownerposts.map(h => {
                    return (
                        selectedDistrict === h.house.district && (
                        <View key={h.id} className={`bg-white shadow-md border-b-2 border-orange-300 rounded-lg p-3 mb-4`}>
                            <View className={`flex-row items-center mb-4`}>
                                <Image
                                    source={{ uri: h.author_avatar }}
                                    className={`w-10 h-10 rounded-full mr-2`}
                                />

                                <Text className={`text-base text-gray-600`}>{h.author_name}</Text>
                                <TouchableOpacity className="ml-10">
                                    <Text >Theo dõi</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => gotoPostDetail(h.id)}>
                                <RenderHTML
                                    contentWidth={width}
                                    source={{ html: h.post_content }}
                                />
                                {h.house.images.map((image) => (
                                    <Image
                                        source={{ uri: image.image }}
                                        className={`w-full h-48 rounded-lg mb-4`}
                                        resizeMode="cover"
                                    />
                                ))}
                            </TouchableOpacity>

                            <Text className={`text-sm text-gray-600 mb-2`}>{moment(h.created_date).fromNow()}</Text>
                            
                        </View>
                        )
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

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        loadOwnerposts();
        setTimeout(() => {
            loadUsesrposts();
        }, 100)
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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


                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              
                    <Provider>
                        <DropDown
                            label="Chọn quận"
                            mode="outlined"
                            value={selectedDistrict}
                            setValue={setSelectedDistrict}
                            list={districtList}
                            visible={showDropdown1}
                            showDropDown={() => setShowDropdown1(true)}
                            onDismiss={() => setShowDropdown1(false)}
                            dropDownStyle={{
                                width: '80%', // Điều chỉnh độ rộng của dropdown tại đây
                                top: '10%',
                                left: '0',
                                zIndex: 1000,
                            }}
                        
                        />
                    </Provider>
            
                
                <Provider>
                    
                    <DropDown
                        label="Chọn mức giá"
                        mode="outlined"
                        value={selectedPriceRange}
                        setValue={setSelectedPriceRange}
                        list={priceLevelList}
                        visible={showDropdown}
                        showDropDown={() => setShowDropdown(true)}
                        onDismiss={() => setShowDropdown(false)}
                        dropDownStyle={{
                            width: '100%', 
                            top: '10%',
                            left: '0',
                            zIndex: 1000,
                        }}
                    />
                </Provider>
                
                </View>

                <Text className={'font-serif text-orange-500 text-xl font-bold text-center mb-10'}>TRANG CHỦ</Text>
                <OwnerPostView/>
                
            </View>
        </ScrollView>
    )
}

export default Home;