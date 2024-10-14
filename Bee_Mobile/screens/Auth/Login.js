import React, { useState } from 'react';
import { Text, View, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import tailwind from 'twrnc';
import { useForm, Controller } from 'react-hook-form';
import { loginUser } from '../../services/Auth';

function Login({ navigation }) {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const piggyBank = require('../../assets/images/piggy-bank.png');
    const { control, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await loginUser(data); 
            if (response?.accessToken) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'TabNavigator' }] 
                });
            } else {
                setError('api', { message: 'Đăng nhập thất bại, không nhận được token.' });
            }
        } catch (err) {
            setError('api', { message: 'Thông tin đăng nhập sai!' });
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
            <Text style={tailwind`text-2xl font-bold text-gray-800 mb-4`}>Đăng nhập</Text>

            <View style={tailwind`w-80 mb-4`}>
                <Controller
                    control={control}
                    rules={{
                        required: 'Email không được để trống.',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Email không hợp lệ.'
                        }
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder='Email...'
                            style={tailwind`w-full h-12 px-4 bg-white border border-gray-300 rounded-lg`}
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                    name="email"
                    defaultValue=""
                />
                {errors.email && <Text style={tailwind`text-red-500`}>{errors.email.message}</Text>}
            </View>

            <View style={tailwind`w-80 h-12 px-4 bg-white border border-gray-300 rounded-lg flex-row items-center mb-4`}>
                <Controller
                    control={control}
                    rules={{
                        required: 'Mật khẩu không được để trống.'
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder='Mật khẩu...'
                            secureTextEntry={!passwordVisible}
                            style={tailwind`flex-1`}
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                    name="password"
                    defaultValue=""
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Feather
                        name={passwordVisible ? "eye" : "eye-off"}
                        size={20}
                        color="gray"
                    />
                </TouchableOpacity>
            </View>
            {errors.password && <Text style={tailwind`text-red-500`}>{errors.password.message}</Text>}

            {errors.api && <Text style={tailwind`text-red-500`}>{errors.api.message}</Text>}
            <View style={tailwind`flex-row justify-between w-80 mb-4`}>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={tailwind`text-purple-700`}>Bạn chưa có tài khoản?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
                    <Text style={tailwind`text-purple-700`}>Quên mật khẩu?</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={tailwind`w-80 h-12 bg-purple-700 rounded-lg items-center justify-center`} onPress={handleSubmit(onSubmit)}>
                <Text style={tailwind`text-white text-lg`}>Đăng nhập</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Login;
