import React, { useState } from 'react';
import { Text, View, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { registerUser } from '../../services/Auth';
import tailwind from 'twrnc';

function Register({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const piggyBank = require('../../assets/images/piggy-bank.png');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu và xác nhận mật khẩu không khớp.');
            return;
        }

        try {
            const response = await registerUser({ email, password, name: username });

            if (response.success) {
                Alert.alert('Thành công', response.message || 'Đăng ký thành công!');
                navigation.navigate('Login');
            } else {
                Alert.alert('Lỗi', response.message || 'Đăng ký thất bại.');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errorMessage = error.response.data.error;
                if (errorMessage === 'Email đã tồn tại') {
                    Alert.alert('Lỗi', 'Email này đã tồn tại!');
                }
            } else {
                Alert.alert('Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại.');
            }
        }
    };

    return (
        <View style={tailwind`flex-1 bg-purple-200 items-center justify-center`}>
            <Image 
                source={piggyBank} 
                style={tailwind`w-40 h-40 mb-4`} 
            />
            <Text style={tailwind`text-2xl font-bold text-purple-800 mb-4`}>
                BEEMONEY
            </Text>
            <Text style={tailwind`text-2xl font-bold text-dark-780 mb-4`}>Đăng ký</Text>
            
            <TextInput
                placeholder='Tên đăng nhập...'
                value={username}
                onChangeText={setUsername}
                style={tailwind`w-80 h-12 px-4 bg-white border border-gray-300 rounded-lg mb-4`}
            />
            <TextInput
                placeholder='Email...'
                value={email}
                onChangeText={setEmail}
                style={tailwind`w-80 h-12 px-4 bg-white border border-gray-300 rounded-lg mb-4`}
            />
            <View style={tailwind`w-80 h-12 px-4 bg-white border border-gray-300 rounded-lg flex-row items-center mb-4`}>
                <TextInput
                    placeholder='Mật khẩu...'
                    secureTextEntry={!passwordVisible}
                    value={password}
                    onChangeText={setPassword}
                    style={tailwind`flex-1`}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Feather 
                        name={passwordVisible ? "eye" : "eye-off"} 
                        size={20} 
                        color="gray"
                    />
                </TouchableOpacity>
            </View>
            <View style={tailwind`w-80 h-12 px-4 bg-white border border-gray-300 rounded-lg flex-row items-center mb-4`}>
                <TextInput
                    placeholder='Xác nhận mật khẩu...'
                    secureTextEntry={!confirmPasswordVisible}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    style={tailwind`flex-1`}
                />
                <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                    <Feather 
                        name={confirmPasswordVisible ? "eye" : "eye-off"} 
                        size={20} 
                        color="gray"
                    />
                </TouchableOpacity>
            </View>
            <View style={tailwind`flex-row justify-between w-80 mb-4`}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={tailwind`text-purple-700`}>Bạn đã có tài khoản?</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity 
                onPress={handleRegister} 
                style={tailwind`w-80 h-12 bg-purple-700 rounded-lg items-center justify-center`}
            >
                <Text style={tailwind`text-white text-lg`}>Đăng ký</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Register;
