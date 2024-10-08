import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import tw from 'twrnc';
import { ProgressBar } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Nhập icon từ thư viện vector-icons

export default function SavingGoalDetail({ navigation }) {
  const [showDeposit, setShowDeposit] = useState(false);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const transactions = [
    { id: 1, title: 'Đầu tư', note: 'Đầu tư', amount: '+4.000.000 đ', icon: require("../../assets/images/favicon.png") },
    { id: 2, title: 'Làm thêm', note: 'Làm thêm ngày 5', amount: '+400.000 đ', icon: require("../../assets/images/favicon.png") },
    { id: 3, title: 'Tiết kiệm', note: 'Đập heo', amount: '+500.000 đ', icon: require("../../assets/images/favicon.png") },
    { id: 4, title: 'Tiền cho', note: 'Anh hai cho tiền', amount: '+2.500.000 đ', icon: require("../../assets/images/favicon.png") },
    { id: 5, title: 'Trả nợ', note: 'Bạn trả nợ', amount: '-2.000.000 đ', icon: require("../../assets/images/favicon.png") },
  ];

  return (
    <ScrollView style={tw`p-5 bg-gray-100`}>
      <View style={tw`bg-white p-4 rounded-lg mb-4 relative`}>
        <TouchableOpacity
          style={tw`absolute top-2 right-2`}
          onPress={() => navigation.navigate('SavingGoalEdit')}
        >
          <Icon name="edit" size={24} color="#6B46C1" />
        </TouchableOpacity>
        <View style={tw`flex-row items-center`}>
          <Image source={require("../../assets/images/favicon.png")} style={tw`w-12 h-12 rounded-full mr-4`} />
          <View style={tw`flex-1`}>
            <Text style={tw`font-bold text-lg`}>Mua giường thú cưng</Text>
            <Text style={tw`text-gray-500`}>22/08/2024 - 25/08/2024</Text>
            <Text style={tw`text-gray-500`}>200.000đ - 200.000đ</Text>
          </View>
        </View>
        <ProgressBar progress={1} color="green" style={tw`h-2 rounded-full mt-2`} />
        <Text style={tw`text-green-500 font-bold mt-2`}>Hoàn thành</Text>
      </View>

      <TouchableOpacity
        onPress={() => setShowDeposit(!showDeposit)}
        style={tw`bg-purple-200 p-3 rounded-lg mb-4`}
      >
        <Text style={tw`text-purple-700 font-bold text-center`}>Nạp tiền</Text>
      </TouchableOpacity>

      {showDeposit && (
        <View style={tw`bg-white p-4 rounded-lg mb-4`}>
          <Text style={tw`font-bold mb-1`}>Số tiền</Text>
          <TextInput
            placeholder="Nhập số tiền"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={tw`border border-gray-300 p-3 rounded-lg mb-3`}
          />

          <Text style={tw`font-bold mb-1`}>Ghi chú</Text>
          <TextInput
            placeholder="Ghi chú"
            value={note}
            onChangeText={setNote}
            style={tw`border border-gray-300 p-3 rounded-lg mb-3`}
          />

          <TouchableOpacity style={tw`bg-purple-600 py-3 rounded-lg items-center`}>
            <Text style={tw`text-white font-bold`}>Nạp tiền</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={tw`bg-white p-4 rounded-lg`}>
        <Text style={tw`font-bold text-lg mb-4`}>Lịch sử giao dịch</Text>
        {transactions.map((transaction) => (
          <View key={transaction.id} style={tw`flex-row items-center mb-4`}>
            <Image source={transaction.icon} style={tw`w-10 h-10 rounded-full mr-4`} />
            <View style={tw`flex-1`}>
              <Text style={tw`font-bold`}>{transaction.title}</Text>
              <Text style={tw`text-gray-500`}>{transaction.note}</Text>
            </View>
            <Text style={tw`font-bold ${transaction.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {transaction.amount}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
