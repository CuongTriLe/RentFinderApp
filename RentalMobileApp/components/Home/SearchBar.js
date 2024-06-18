import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Gọi hàm xử lý tìm kiếm và truyền searchTerm vào
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleInputChange = (text) => {
    setSearchTerm(text);
  };

  return (
    <View  className={`bg-gray-200 p-2 rounded-lg w-full flex-row items-center mb-8`}>
      <Icon name="search" size={20} color="#f80"  className={`mr-2`} />
      <TextInput
         className={`flex-1 px-4 py-2 text-gray-800 text-base`}
        placeholder="Tìm kiếm..."
        placeholderTextColor="#A0AEC0"
        value={searchTerm}
        onChangeText={handleInputChange}
        onSubmitEditing={handleSearch} // Xử lý khi người dùng nhấn enter
      />
      <TouchableOpacity
         className={`bg-orange-400 px-4 py-2 rounded-lg ml-2`}
        onPress={handleSearch}
      >
        <Text  className={`text-white font-bold`}>Tìm kiếm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
