import { View ,Text, ActivityIndicator, ScrollView, TouchableOpacity, Image, useWindowDimensions} from "react-native"
import APIs, { endpoints } from "../../configs/APIs";
import React, {useState} from "react"
import SearchBar from "./SearchBar";
import moment from "moment";
import { formatUrl } from "../../dao";
import RenderHTML from "react-native-render-html";

 

const Home = ({navigation}) => {
    const [ownerposts, setOwnerposts]= React.useState([]);
    const [userposts, setUserposts]= React.useState([]);
    const { width } = useWindowDimensions()


    const gotoPostDetail = (ownerpostId) =>{
        navigation.navigate("OwnerPostDetails",{ownerpostId})
    }

    const loadOwnerposts = async () =>{
        try{
            let res = await APIs.get(endpoints['owner-posts']);
            console.log(res.data.results);
            setOwnerposts(res.data.results);

        }catch(ex){
            console.error(ex);
        }
    }
    const loadUsesrposts = async () =>{
        try{
            let res = await APIs.get(endpoints['user-posts']);
            console.log(res.data.results);
            setUserposts(res.data.results);

        }catch(ex){
            console.error(ex);
        }
    } 
    React.useEffect(() => {
        loadOwnerposts();
        loadUsesrposts(); 
    },[])
    
    return (
        <View className={' flex mt-[10px]'}>
            <SearchBar /> 
            <Text className = {'font-serif text-orange-500 text-xl font-bold text-center mb-10'}>TRANG CHỦ</Text>
           <ScrollView >
            {ownerposts == null ? <ActivityIndicator/>:<>
                {ownerposts.map(h =>( 
                    <View key={h.id} className={`bg-white shadow-md border-b-2 border-orange-300 rounded-lg p-3 mb-4`}>
                        <TouchableOpacity onPress={() => gotoPostDetail(h.id)}>
                             <RenderHTML 
                                contentWidth={width}
                                source={{ html: h.post_content }}
                            />
                        </TouchableOpacity>
                        <Text className={`text-sm text-gray-600 mb-2`}>{moment(h.created_date).fromNow()}</Text>
                    </View>
                ) )}
                </>}
            {userposts== null ? <ActivityIndicator/>:<>
                {userposts.map(h =>( 
                    <View key={h.id} className={`bg-white shadow-md border-b-2 border-blue-300 rounded-lg p-4 mb-4`}>
                        <TouchableOpacity >
                             <RenderHTML 
                                source={{ html: h.post_content }}
                            />
                        </TouchableOpacity>
                        <Text className={`text-sm text-gray-600 mb-2`}>Khu vực: {h.find_area_address}</Text>
                        <Text className={`text-sm text-gray-600 mb-2`}>{moment(h.created_date).fromNow()}</Text>
                    </View>
                ) )}
                </>}
            </ScrollView>
            
        </View>
    )
}

export default Home;