import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDeleteModal from '../../../components/Popup';

export default function ExpenseDetail({ route, navigation }) {
  const { expense } = route.params; // Nhận thông tin chi tiêu từ tham số
  const [amount, setAmount] = useState(expense.amount || 0); // Sử dụng amount từ expense
  const [description, setDescription] = useState(expense.description || "Không có mô tả");
  const [date, setDate] = useState(expense.date || "Không có ngày")
  const [selectedCategory, setSelectedCategory] = useState(expense.category || { name: "Chưa xác định" });
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    console.log('Expense Detail:', expense);
  }, [expense]);

  const handleEditExpense = () => {
    navigation.navigate('ExpenseEdit', { expense });
  };

  const handleDeleteExpense = () => {
    setIsModalVisible(true);
  };

  const confirmDeleteExpense = () => {
    console.log('Delete Expense'); // Thực hiện logic xóa ở đây
    setIsModalVisible(false);
    // Bạn có thể gọi hàm xóa chi tiêu ở đây
  };

  const cancelDeleteExpense = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleEditExpense}>
            <Ionicons name="pencil" size={24} color="#5A5DD1" />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.details}>
            <View style={styles.detailRow}>
              <Image
                source={require('../../../assets/images/diet.png')} 
                style={styles.imageCategory}
              />
              <Text style={styles.categoryName}>
                {selectedCategory.name} {/* Hiển thị tên danh mục */}
              </Text>
            </View>

            {/* Amount */}
            <View style={styles.detailRow}>
              <Ionicons name="cash-outline" size={20} color="#34495e" style={styles.icon} />
              <Text style={styles.amount}>
               - {amount.toLocaleString('vi-VN')} đ
              </Text>
            </View>

            {/* Description */}
            <View style={styles.detailRow}>
              <Ionicons name="clipboard-outline" size={20} color="#34495e" style={styles.icon} />
              <Text style={styles.description}>
                {description}
              </Text>
            </View>

            {/* Date */}
            <View style={styles.detailRow}>
              <Ionicons name="calendar-outline" size={20} color="#34495e" style={styles.icon} />
              <Text style={styles.date}>
             {date}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteExpense}>
        <Text style={styles.deleteButtonText}>Xóa chi tiêu</Text>
      </TouchableOpacity>

      {/* Modal để xác nhận xóa */}
      <CustomDeleteModal
        isVisible={isModalVisible}
        onConfirm={confirmDeleteExpense} 
        onCancel={cancelDeleteExpense}
        message="Bạn có chắc chắn muốn xóa chi tiêu này không?" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa', // Màu nền sáng với hiệu ứng nhẹ
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 20,
    overflow: 'hidden',
    padding: 20,
  },
  header: {
    alignItems: 'flex-end',
  },
  imageCategory: {
    width: 50, 
    height: 50,
    marginRight: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 5, 
  },
  icon: {
    marginRight: 15,
    color: '#7f8c8d',
    fontSize: 24, 
  },
  categoryName: {
    fontSize: 24, // Tăng kích thước chữ cho tên danh mục
    fontWeight: '500',
    flexShrink: 1,
  },
  description: {
    fontSize: 18, 
    color: '#495057',
    flexShrink: 1,
  },
  amount: {
    fontSize: 26, 
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  date: {
    fontSize: 16,
    color: '#7f8c8d', // Màu nhạt hơn cho ngày
  },
  deleteButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: '#e74c3c', // Màu đỏ tươi cho nút xóa
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#e74c3c',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
