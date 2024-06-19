import { Text, View } from "react-native"
import APIs, { endpoints } from "../../configs/APIs";
import React from "react";
import { Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import RenderHTML from "react-native-render-html";


const OwnerPostDetails  = ({route}) =>{
    const [ownerposts, setOwnerpost]= React.useState([]);
    const [comments, setComments] = React.useState([]);
    const {ownerpostId} = route.params;
    console.log(ownerpostId)
    React.useEffect(() => {
        const loadOwnerpost = async() =>{
            try{
                let res = await APIs.get(endpoints['owner-posts-details'](ownerpostId));
                console.log(res.data.house.address)
                setOwnerpost([res.data]);
            }catch (ex) {
                console.error(ex);
            }
        }
        loadOwnerpost();
    },[ownerpostId]);

    return (
        <>
        {ownerposts == null ? <ActivityIndicator/>:<>
            {ownerposts.map(h =>( 
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
                    <View>
                        <Text >Bình luận</Text>
                    </View>
                </View>
                
            </View>
        ) )}
        
        </>
        }
        
        </>
        
    )
          
} 
export default OwnerPostDetails;