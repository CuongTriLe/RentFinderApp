import { Text, View } from "react-native"
import APIs, { endpoints } from "../../configs/APIs";
import React from "react";

const OwnerPostDetails  = ({route}) =>{
    const [ownerpost, setOwnerpost]= React.useState(null);
    const {ownerpostId} = route.params;
    console.log(ownerpostId)
    React.useEffect(() => {
        const loadOwnerpost = async() =>{
            try{
                let res = await APIs.get(endpoints['owner-posts-details'](ownerpostId));
                console.log(res.data)
                setOwnerpost(res.data);
            }catch (ex) {
                console.error(ex);
            }
        }
        loadOwnerpost();
    },[ownerpostId]);
    return (
        <View>
            <Text>
                Chi tiết bài đăng
            </Text>
        </View>
    )
}
export default OwnerPostDetails;