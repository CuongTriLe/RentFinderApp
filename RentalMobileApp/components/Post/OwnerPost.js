import React from "react";
import moment from "moment";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import APIs, { endpoints } from "../../configs/APIs";
import RenderHTML from "react-native-render-html";

import { ActivityIndicator } from "react-native-paper";

const OwnerPost = () =>{
  const [ownerposts, setOwnerposts]= React.useState(null);
  const loadOwnerposts = async () =>{
    try{
        let res = await APIs.get(endpoints['owner-posts']);
        console.log(res.data.results);
        setOwnerposts(res.data.results);

    }catch(ex){
        console.error(ex);
    }
}
React.useEffect(() => {
  loadOwnerposts();
},[])
   return(
    <View>
        <Text className = {'font-serif text-orange-500 text-xl font-bold text-center mb-10'}>Bài đăng của bạn</Text>
        <ScrollView >
            {ownerposts == null ? <ActivityIndicator/>:<>
                {ownerposts.map(h =>( 
                    <View key={h.id} className={`bg-white shadow-md border-b-2 border-orange-300 rounded-lg p-3 mb-4`}>
                        <TouchableOpacity>
                             <RenderHTML 
                                source={{ html: h.post_content }}
                            />
                        </TouchableOpacity>
                        <Text className={`text-sm text-gray-600 mb-2`}>{moment(h.created_date).fromNow()}</Text>
                    </View>
                ) )}
                </>}
            </ScrollView>
            
    </View>
   )
}
export default OwnerPost;

