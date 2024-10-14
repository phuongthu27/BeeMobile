import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, StatusBar, SafeAreaView, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

export default function BudgetScreen() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [budgetToDelete, setBudgetToDelete] = useState(null);

    const budgets = [
        {
            id: 1,
            name: 'Đi du lịch',
            totalAmount: 2000000,
            icon: require('../../assets/images/travel-luggage.png'),
            expenses: [500000, 300000], // Các chi tiêu thuộc ngân sách này
            startDate: '01/10/2024', // Ngày bắt đầu
            endDate: '31/12/2024', // Ngày kết thúc
        },
        {
            id: 2,
            name: 'Thư giãn',
            totalAmount: 3000000,
            icon: require('../../assets/images/relaxation.png'),
            expenses: [3000000], // Các chi tiêu thuộc ngân sách này
            startDate: '01/11/2024', // Ngày bắt đầu
            endDate: '15/12/2024', // Ngày kết thúc
        },
        {
            id: 3,
            name: 'Ăn uống',
            totalAmount: 1000000,
            icon: require('../../assets/images/diet.png'),
            expenses: [2000000], // Các chi tiêu thuộc ngân sách này
            startDate: '15/09/2024', // Ngày bắt đầu
            endDate: '01/12/2024', // Ngày kết thúc
        },
        {
            id: 4,
            name: 'Học tập',
            totalAmount: 4000000,
            icon: require('../../assets/images/education.png'),
            expenses: [3000000], // Các chi tiêu thuộc ngân sách này
            startDate: '01/09/2024', // Ngày bắt đầu
            endDate: '30/11/2024', // Ngày kết thúc
        },
        {
            id: 5,
            name: 'Di chuyển',
            totalAmount: 5000000,
            icon: require('../../assets/images/vehicle.png'),
            expenses: [4250000], // Các chi tiêu thuộc ngân sách này
            startDate: '05/10/2024', // Ngày bắt đầu
            endDate: '15/12/2024', // Ngày kết thúc
        },
    ];

    const calculateRemainingAmount = (expenses, totalAmount) => {
        const totalExpenses = expenses.reduce((acc, expense) => acc + expense, 0);
        return totalAmount - totalExpenses;
    };

    const calculateProgress = (remainingAmount, totalAmount) => {
        if (totalAmount <= 0) return 0;
        return (remainingAmount / totalAmount) * 100;
    };

    const getProgressBarColor = (remainingAmount, totalAmount) => {
        const progress = calculateProgress(remainingAmount, totalAmount);
        if (progress >= 50) return 'green';
        if (progress >= 25) return 'blue'; // Thay thế màu vàng bằng xanh dương nhạt
        if (progress > 0) return 'orange';
        return 'red';
    };

    const getProgressBarWidth = (remainingAmount, totalAmount) => {
        const progress = calculateProgress(remainingAmount, totalAmount);
        return `${Math.max(progress, -100)}%`;
    };

    const getProgressBarText = (remainingAmount, totalAmount) => {
        const progress = calculateProgress(remainingAmount, totalAmount);
        return `${Math.round(Math.max(progress, -100))}%`;
    };

    const getBudgetStatus = (remainingAmount, totalAmount) => {
        if (remainingAmount < 0) {
            return {
                text: 'Chi tiêu vượt ngân sách',
                color: 'red',
            };
        }
        if (remainingAmount <= 0) {
            return {
                text: 'Ngân sách đã hết',
                color: 'red',
            };
        }
        return {
            text: `Ngân sách còn ${Math.round(calculateProgress(remainingAmount, totalAmount))}%`,
            color: getProgressBarColor(remainingAmount, totalAmount),
        };
    };

    // Hàm điều hướng sang màn hình chi tiết ngân sách
    const navigateToDetail = (budget) => {
        navigation.navigate('BudgetDetail', { budget });
    };

    // Hàm mở modal xác nhận xóa
    const openDeleteModal = (budget) => {
        setBudgetToDelete(budget);
        setModalVisible(true);
    };

    // Hàm xác nhận xóa ngân sách
    const confirmDelete = () => {
        // Xóa ngân sách tại đây
        // Bạn có thể thêm mã để xóa ngân sách khỏi danh sách của bạn
        setModalVisible(false);
        setBudgetToDelete(null);
        // Cập nhật danh sách ngân sách ở đây nếu cần
    };

    // Hàm hủy bỏ xóa
    const cancelDelete = () => {
        setModalVisible(false);
        setBudgetToDelete(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Danh sách ngân sách</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('BudgetAdd')}>
                    <Text style={styles.addButtonText}>Thêm mới</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.budgetList}>
                {budgets.map((budget) => {
                    const remainingAmount = calculateRemainingAmount(budget.expenses, budget.totalAmount);
                    const progressText = getProgressBarText(remainingAmount, budget.totalAmount);
                    const progressColor = getProgressBarColor(remainingAmount, budget.totalAmount);
                    const budgetStatus = getBudgetStatus(remainingAmount, budget.totalAmount);

                    return (
                        <TouchableOpacity key={budget.id} onPress={() => navigateToDetail(budget)}>
                            <View style={styles.budgetItem}>
                                <View style={styles.budgetHeader}>
                                    <Image source={budget.icon} style={styles.budgetIcon} />
                                    <Text style={styles.budgetName}>{budget.name}</Text>
                                    <TouchableOpacity onPress={() => openDeleteModal(budget)}>
                                        <Icon name="trash" size={20} color="red" />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.budgetAmount}>
                                    Ngân sách: {budget.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </Text>
                                <View style={styles.progressBar}>
                                    <View
                                        style={[
                                            styles.progress,
                                            {
                                                width: getProgressBarWidth(remainingAmount, budget.totalAmount),
                                                backgroundColor: progressColor,
                                            },
                                        ]}
                                    />
                                </View>
                                <View style={styles.statusContainer}>
                                    <Text style={[styles.budgetStatus, { color: budgetStatus.color }]}>
                                        {budgetStatus.text}
                                    </Text>
                                    <Text style={[styles.budgetStatus, { color: progressColor }]}>
                                        {progressText}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Modal xác nhận xóa */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={cancelDelete}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Xác nhận xóa ngân sách</Text>
                        <Text style={styles.modalMessage}>
                            Bạn có chắc chắn muốn xóa ngân sách "{budgetToDelete?.name}" không?
                        </Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={cancelDelete}>
                                <Text style={styles.modalButtonText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={confirmDelete}>
                                <Text style={styles.modalButtonText}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: '#6200EA',
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#9C27B0',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    budgetList: {
        flex: 1,
        paddingHorizontal: 10,
    },
    budgetItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    budgetHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    budgetIcon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    budgetName: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
    },
    budgetAmount: {
        marginVertical: 10,
        fontSize: 16,
    },
    progressBar: {
        height: 10,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progress: {
        height: '100%',
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    budgetStatus: {
        fontSize: 14,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: '#6200EA',
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
