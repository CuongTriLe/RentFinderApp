import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import APIs, { endpoints } from "../../configs/APIs";
import React, {useEffect} from "react";
import { ActivityIndicator } from "react-native-paper";
import { formatUrl} from "../../dao";
import moment from "moment";
import { formatNumber } from "../../dao/price";
 
const Room = ({route}) => {
    const [rooms,setRooms] = React.useState(null)
    const {houseId} = route.params;

    React.useEffect(() => {
        const loadRooms = async () => {
            try {
                let res = await APIs.get(endpoints['rooms'](houseId))
                console.log(res.data)
                setRooms(res.data);
            }catch (ex){
                console.error(ex);
            }
        }
        loadRooms();
    }, [houseId])

    return (
        <View>
            <Text className = {'font-serif text-orange-500 text-xl font-bold text-center mb-10'}>DANH SÁCH PHÒNG TRỌ</Text>
            <ScrollView>
            {rooms == null ? <ActivityIndicator/>:<>
                {rooms.map(h =>( 
                    <View key={h.id} className={`bg-white shadow-md rounded-lg p-4 mb-4`}>
                        <Image 
                            source={{ uri: formatUrl("https://res.cloudinary.com/dhitdivyi/image/upload/v1718385861/l0onkudwpw6smzzaodkz.jpg")}}
                            className={`w-full h-48 rounded-lg mb-4`}
                            resizeMode="cover"
                        />
                        <TouchableOpacity >
                            <Text className={`text-lg font-bold mb-2`}>Phòng: {h.room_number}</Text>
                        </TouchableOpacity>
                        <Text className={`text-sm text-gray-600 mb-2`}>{h.price}</Text>
                        <Text className={`text-sm text-gray-600 mb-2`}>{parseFloat(h.room_size).toFixed(0)}m²</Text>
                        <Text className={`text-sm text-gray-600 mb-2`}>{moment(h.created_date).fromNow()}</Text>
                    </View>
                ) )}
                </>}
            </ScrollView>
          
        </View>

    )
}
export default Room;