import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Modal, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Import thư viện

const iconsList = [
    { id: '1', source: require('../../assets/images/diet.png') },
    { id: '2', source: require('../../assets/images/education.png') },
    { id: '3', source: require('../../assets/images/healthy.png') },
    { id: '4', source: require('../../assets/images/relaxation.png') },
    { id: '5', source: require('../../assets/images/travel-luggage.png') },
    { id: '6', source: require('../../assets/images/vehicle.png') },
];

// Hàm phân tích định dạng DD/MM/YYYY
const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day);
};

const BudgetEdit = ({ route, navigation }) => {
    const { budget } = route.params;

    const [budgetName, setBudgetName] = useState(budget.name);
    const [totalAmount, setTotalAmount] = useState(budget.totalAmount);
    const [icon, setIcon] = useState(budget.icon);
    const [startDate, setStartDate] = useState(parseDate(budget.startDate));
    const [endDate, setEndDate] = useState(parseDate(budget.endDate));
    const [modalVisible, setModalVisible] = useState(false);
    const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

    const handleSave = () => {
        // Thực hiện cập nhật ngân sách
    };

    const selectIcon = (selectedIcon) => {
        setIcon(selectedIcon);
        setModalVisible(false);
    };

    const handleConfirmStartDate = (date) => {
        setStartDate(date);
        setStartDatePickerVisible(false);
    };

    const handleConfirmEndDate = (date) => {
        setEndDate(date);
        setEndDatePickerVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.budgetList}>
                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.label}>Tên ngân sách</Text>
                        <TextInput
                            style={styles.input}
                            value={budgetName}
                            onChangeText={setBudgetName}
                            placeholder="Nhập tên ngân sách"
                        />
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.label}>Số tiền</Text>
                        <TextInput
                            style={styles.input}
                            value={totalAmount.toString()}
                            onChangeText={text => setTotalAmount(Number(text))}
                            placeholder="Nhập số tiền"
                            keyboardType="numeric"
                        />
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.label}>Thời gian</Text>
                        <View style={styles.dateContainer}>
                            <View style={styles.dateInputContainer}>
                                <Text style={styles.label}>Ngày bắt đầu</Text>
                                <TouchableOpacity onPress={() => setStartDatePickerVisible(true)} style={styles.input}>
                                    <Text>{startDate.toLocaleDateString('vi-VN')}</Text>
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={isStartDatePickerVisible}
                                    mode="date"
                                    date={startDate}
                                    onConfirm={handleConfirmStartDate}
                                    onCancel={() => setStartDatePickerVisible(false)}
                                />
                            </View>
                            <View style={styles.dateInputContainer}>
                                <Text style={styles.label}>Ngày kết thúc</Text>
                                <TouchableOpacity onPress={() => setEndDatePickerVisible(true)} style={styles.input}>
                                    <Text>{endDate.toLocaleDateString('vi-VN')}</Text>
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    isVisible={isEndDatePickerVisible}
                                    mode="date"
                                    date={endDate}
                                    onConfirm={handleConfirmEndDate}
                                    onCancel={() => setEndDatePickerVisible(false)}
                                />
                            </View>
                        </View>
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Content>
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconContainer}>
                            <Text style={styles.iconLabel}>Chọn danh mục: </Text>
                            <Image source={icon} style={styles.icon} />
                        </TouchableOpacity>
                    </Card.Content>
                </Card>

                <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
                    Lưu
                </Button>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
                    <Text style={styles.cancelText}>Hủy bỏ</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Chọn biểu tượng danh mục</Text>
                            <FlatList
                                data={iconsList}
                                keyExtractor={item => item.id}
                                numColumns={3}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => selectIcon(item.source)} style={styles.iconButton}>
                                        <Image source={item.source} style={styles.modalIcon} />
                                    </TouchableOpacity>
                                )}
                            />
                            <Button onPress={() => setModalVisible(false)} mode="text" style={styles.closeButton}>
                                Đóng
                            </Button>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F5F5F5',
    },
    budgetList: {
        flex: 1,
        paddingHorizontal: 10,
    },
    card: {
        marginBottom: 15,
        borderRadius: 10,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateInputContainer: {
        flex: 1,
        marginHorizontal: 5,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    iconLabel: {
        marginRight: 10,
        fontSize: 16,
    },
    saveButton: {
        marginTop: 20,
        paddingVertical: 5,
        borderRadius: 5,
    },
    cancelButton: {
        marginTop: 10,
        alignItems: 'center',
        padding: 10, // Thêm padding cho nút Hủy bỏ
        borderWidth: 1,
        borderColor: 'red', // Thêm đường viền cho nút Hủy bỏ
        borderRadius: 5, // Thêm bo góc cho nút Hủy bỏ
    },
    cancelText: {
        color: 'red',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
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
    iconButton: {
        margin: 10,
    },
    modalIcon: {
        width: 60,
        height: 60,
    },
    closeButton: {
        marginTop: 10,
    },
});

export default BudgetEdit;
