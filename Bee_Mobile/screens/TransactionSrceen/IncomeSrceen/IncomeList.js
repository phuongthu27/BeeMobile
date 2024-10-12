import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function IncomeList() {
  const navigation = useNavigation();

  const incomes = [
    {
      id: 1,
      category: { id: 1, name: 'Lương', image: require('../../../assets/images/salary.png')  },
      description: 'Ăn trưa với bạn bè tôi không biết nữa nè vị sao hả, rồi sao nữa',
      amount: 12000000,
      date: '08-10-2024',
    },
    {
      id: 2,
      category: { id: 2, name: 'Tiết kiệm', image: require('../../../assets/images/piggy-bank.png') },
      description: 'Tiền tiết kiệm',
      amount: 500000,
      date: '07-10-2024',
    },
    {
      id: 3,
      category: { id: 3, name: 'Làm thêm', image: require('../../../assets/images/hard-work.png') },
      description: 'Làm thêm thật chăm chỉ',
      amount: 8000000,
      date: '07-10-2024',
    },
  ];

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const incomesByDate = incomes.reduce((groupedIncomes, income) => {
    const { date } = income;
    if (!groupedIncomes[date]) {
      groupedIncomes[date] = [];
    }
    groupedIncomes[date].push(income);
    return groupedIncomes;
  }, {});

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView>
        {Object.keys(incomesByDate).map((date) => (
          <View key={date}>
            <View style={styles.dateBadge}>
              <Text style={styles.dateBadgeText}>{date}</Text>
            </View>

            {incomesByDate[date].map((income) => (
              <TouchableOpacity
                key={income.id}
                activeOpacity={0.7}
                style={styles.item}
                onPress={() => navigation.navigate('IncomeDetail', { income })}
              >
                <View style={styles.iconWrapper}>
                  <Image
                    source={income.category.image}
                    style={styles.icon}
                  />
                </View>
                <View style={styles.details}>
                  <Text style={styles.categoryName}>
                    {truncateText(income.category.name, 14)}
                  </Text>
                  <Text style={styles.description}>
                    {truncateText(income.description, 20)}
                  </Text>
                </View>
                <View style={styles.dateAmountWrapper}>
                  <Text style={styles.amount}>+ {income.amount.toLocaleString('vi-VN')} đ</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('IncomeAdd')}
      >
        <Text style={styles.addButtonText}>Thêm thu nhập</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  dateBadge: {
    backgroundColor: '#d3d8f8', 
    padding: 5, 
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 10,
    alignSelf: 'flex-start',
  },
  dateBadgeText: {
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 12, 
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  iconWrapper: {
    padding: 5,
    marginRight: 15,
    borderRadius: 11,
    backgroundColor: '#F2F3FF',
  },
  icon: {
    width: 40,
    height: 40,
  },
  details: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  dateAmountWrapper: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    color: '#4CBB17',
  },
  addButton: {
    backgroundColor: '#5D0DE1', 
    padding: 15,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
