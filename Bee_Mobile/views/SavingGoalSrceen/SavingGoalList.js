import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import { ProgressBar } from 'react-native-paper';
import tw from "twrnc";

export default function SavingGoalScreen() {
  const savingGoals = [
    { title: "Mua giường thú cưng", saved: 200000, target: 200000 },
    { title: "Mua máy tính mới", saved: 0, target: 2000000 },
    { title: "Mua điện thoại mới", saved: 100000, target: 200000 }
  ];

  return (
    <View style={tw`flex-1 items-center`}>
      <View style={tw`items-center justify-center`}>
        <Svg height="150" width="220">
          <Ellipse
            cx="110"
            cy="75"
            rx="100"
            ry="65"
            stroke="black"
            strokeWidth="5"
            fill="none"
          />
        </Svg>

        <Text style={tw`absolute top-13 text-base text-center`}>
          bạn cần tiết kiệm
        </Text>
        <Text style={tw`absolute top-18 text-base`}>3,000,000 đ</Text>
      </View>

      <View style={tw`flex-row justify-between w-full my-2 items-center`}>
        <View style={tw`flex-1 items-center`}>
          <Text style={tw`text-base`}>Tổng mục tiêu</Text>
          <Text style={tw`text-base font-bold mt-1`}>10M</Text>
        </View>

        <View style={tw`h-12 w-0.5 bg-black mx-4`} />

        <View style={tw`flex-1 items-center`}>
          <Text style={tw`text-base`}>Tổng đã tiết kiệm</Text>
          <Text style={tw`text-base font-bold mt-1`}>7M</Text>
        </View>
      </View>

      <TouchableOpacity
        style={tw`bg-purple-600 px-4 py-2 rounded-full`}
        onPress={() => alert("Thêm mục tiêu!")}
      >
        <Text style={tw`text-white text-base font-bold`}>Thêm mục tiêu</Text>
      </TouchableOpacity>

      <View style={tw`w-full mt-3 pl-2 pr-2`}>
        {savingGoals.map((goal, index) => {
          const progress = goal.saved / goal.target;
          const progressPercentage = Math.floor(progress * 100);

          let progressBarColor = "red"; 
          if (progress >= 0.8) {
            progressBarColor = "green";
          } else if (progress >= 0.5) {
            progressBarColor = "#FFF9C4";
          }

          let statusText = "";
          let statusColor = "";

          if (progress === 1) {
            statusText = "Hoàn thành";
            statusColor = "green";
          } else if (progress === 0) {
            statusText = "Chưa tiết kiệm";
            statusColor = "red";
          } else if (progress >= 0.8) {
            statusText = `Còn lại ${100 - progressPercentage}%`;
            statusColor = "green";
          } else if (progress <= 0.2) {
            statusText = `Còn lại ${100 - progressPercentage}%`;
            statusColor = "red";
          } else {
            statusText = `Còn lại ${100 - progressPercentage}%`;
            statusColor = "green";
          }

          return (
            <View key={index} style={tw`border rounded-lg p-4 mb-4 bg-white`}>
              <View style={tw`flex-row items-center`}>
                <Image
                  source={require("../../assets/images/favicon.png")}
                  style={tw`w-12 h-12 rounded-full mr-4`}
                />
                <View style={tw`flex-1`}>
                  <Text style={tw`font-bold text-lg`}>{goal.title}</Text>
                  <Text style={tw`text-gray-500`}>
                    {goal.saved.toLocaleString()}đ - {goal.target.toLocaleString()}đ
                  </Text>
                </View>
              </View>

              <ProgressBar
                progress={progress} 
                color={progressBarColor} 
                style={tw`h-2 rounded-full mt-2`} 
              />

              <View style={tw`flex-row justify-between mt-1`}>
                <Text style={tw`text-xs text-gray-600`} style={{ color: statusColor }}>{progressPercentage}%</Text>
                <Text style={tw`text-xs font-semibold`} style={{ color: statusColor }}>
                  {statusText}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
