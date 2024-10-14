import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function ExpenseList() {
  const navigation = useNavigation();

  const expenses = [
    {
      id: 1,
      category: { id: 1, name: 'Ăn uống là cái gì có quan trọng không', image: require('../../../assets/images/diet.png')  },
      description: 'Ăn trưa với bạn bè tôi không biết nữa nè vị sao hả, rồi sao nữa',
      amount: 120000,
      date: '08-10-2024',
    },
    {
      id: 2,
      category: { id: 2, name: 'Di chuyển', image: require('../../../assets/images/vehicle.png') },
      description: 'Taxi về nhà',
      amount: 50000,
      date: '07-10-2024',
    },
    {
      id: 3,
      category: { id: 3, name: 'Uống', image: require('../../../assets/images/cocktail.png') },
      description: 'Nước ép dâu',
      amount: 300000,
      date: '07-10-2024',
    },
  ];

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const expensesByDate = expenses.reduce((groupedExpenses, expense) => {
    const { date } = expense;
    if (!groupedExpenses[date]) {
      groupedExpenses[date] = [];
    }
    groupedExpenses[date].push(expense);
    return groupedExpenses;
  }, {});

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView>
        {Object.keys(expensesByDate).map((date) => (
          <View key={date}>
            <View style={styles.dateBadge}>
              <Text style={styles.dateBadgeText}>{date}</Text>
            </View>

            {expensesByDate[date].map((expense) => (
              <TouchableOpacity
                key={expense.id}
                activeOpacity={0.7}
                style={styles.expenseItem}
                onPress={() => navigation.navigate('ExpenseDetail', { expense })}
              >
                <View style={styles.iconWrapper}>
                  <Image
                    source={expense.category.image}
                    style={styles.icon}
                  />
                </View>
                <View style={styles.expenseDetails}>
                  <Text style={styles.categoryName}>
                    {truncateText(expense.category.name, 14)}
                  </Text>
                  <Text style={styles.description}>
                    {truncateText(expense.description, 20)}
                  </Text>
                </View>
                <View style={styles.dateAmountWrapper}>
                  <Text style={styles.amount}>- {expense.amount.toLocaleString('vi-VN')} đ</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('ExpenseAdd')}
      >
        <Text style={styles.addButtonText}>Thêm Chi Tiêu</Text>
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
  expenseItem: {
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
  expenseDetails: {
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
    fontSize: 17,
    fontWeight: '500',
    color: '#e74c3c',
  },
  addButton: {
    backgroundColor: '#5A5DD1', 
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
