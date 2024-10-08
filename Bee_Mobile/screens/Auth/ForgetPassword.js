import React from 'react';
import { Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import tailwind from 'twrnc';

function ForgetPassword() {
    const piggyBank = require('../../assets/images/piggy-bank.png'); 

    return (
        <View style={tailwind`flex-1 bg-purple-200 items-center justify-center`}>
            <Image 
                source={piggyBank} 
                style={tailwind`w-40 h-40 mb-4`} 
            />
            <Text style={tailwind`text-2xl font-bold text-purple-800 mb-4`}>
                BEEMONEY
            </Text>
            <Text style={tailwind`text-2xl font-bold text-dark-780 mb-4`}>Quên mật khẩu</Text>
            <TextInput
                placeholder='Email...'
                style={tailwind`w-80 h-12 px-4 bg-white border border-gray-300 rounded-lg mb-4`}
            />
            <View style={tailwind`flex-row justify-between w-80 mb-4`}>
                <Text style={tailwind`text-purple-700`}>Bạn chưa có tài khoản?</Text>
            </View>
            <TouchableOpacity style={tailwind`w-80 h-12 bg-purple-700 rounded-lg items-center justify-center`}>
                <Text style={tailwind`text-white text-lg`}>Gửi</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ForgetPassword;
