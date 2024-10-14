import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, FlatList, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function BudgetAdd({ navigation }) {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategoryImage, setSelectedCategoryImage] = useState(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const categories = [
        { id: '1', name: 'Ăn uống', source: require('../../assets/images/diet.png') },
        { id: '2', name: 'Học tập', source: require('../../assets/images/education.png') },
        { id: '3', name: 'Sức khỏe', source: require('../../assets/images/healthy.png') },
        { id: '4', name: 'Thư giản', source: require('../../assets/images/relaxation.png') },
        { id: '5', name: 'Du lịch', source: require('../../assets/images/travel-luggage.png') },
        { id: '6', name: 'Di chuyển', source: require('../../assets/images/vehicle.png') },
    ];

    const onSubmit = (data) => {
        console.log('Dữ liệu ngân sách mới:', { ...data, category: selectedCategory, categoryImage: selectedCategoryImage, startDate, endDate });
        navigation.navigate('BudgetScreen');
    };

    const handleAmountChange = (onChange) => (value) => {
        if (value && parseFloat(value) < 0) {
            return; // Không cho phép số âm
        }
        onChange(value);
    };

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => {
                setSelectedCategory(item.name);
                setSelectedCategoryImage(item.source);
                setModalVisible(false);
            }}
        >
            <Image source={item.source} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Thêm mới ngân sách</Text>

            <View style={styles.inputContainer}>
                <Text>Tên ngân sách</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Nhập tên ngân sách"
                        />
                    )}
                    name="name"
                    rules={{ required: 'Tên ngân sách là bắt buộc' }}
                />
                {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
            </View>

            <View style={styles.inputContainer}>
                <Text>Số tiền</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={handleAmountChange(onChange)} // Sử dụng hàm mới
                            value={value}
                            placeholder="Nhập số tiền"
                            keyboardType="numeric"
                        />
                    )}
                    name="totalAmount"
                    rules={{ required: 'Số tiền là bắt buộc' }}
                />
                {errors.totalAmount && <Text style={styles.errorText}>{errors.totalAmount.message}</Text>}
            </View>

            <View style={styles.inputContainer}>
                <Text>Danh mục</Text>
                <TouchableOpacity style={styles.iconPicker} onPress={() => setModalVisible(true)}>
                    {selectedCategoryImage && <Image source={selectedCategoryImage} style={styles.selectedCategoryImage} />}
                    <Text>{selectedCategory ? selectedCategory : 'Chọn danh mục'}</Text>
                    <Icon name="chevron-down" size={20} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Đặt hai ô input ngày bắt đầu và ngày kết thúc trên cùng một hàng */}
            <View style={styles.dateInputContainer}>
                <View style={styles.dateInputWrapper}>
                    <Text>Ngày bắt đầu</Text>
                    <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
                        <TextInput
                            style={styles.input}
                            editable={false}
                            value={startDate.toLocaleDateString()} // Hiển thị ngày
                        />
                    </TouchableOpacity>
                    {showStartDatePicker && (
                        <DateTimePicker
                            value={startDate}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                if (selectedDate) {
                                    setStartDate(selectedDate);
                                }
                                setShowStartDatePicker(false);
                            }}
                        />
                    )}
                </View>

                <View style={styles.dateInputWrapper}>
                    <Text>Ngày kết thúc</Text>
                    <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
                        <TextInput
                            style={styles.input}
                            editable={false}
                            value={endDate.toLocaleDateString()} // Hiển thị ngày
                        />
                    </TouchableOpacity>
                    {showEndDatePicker && (
                        <DateTimePicker
                            value={endDate}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                if (selectedDate) {
                                    setEndDate(selectedDate);
                                }
                                setShowEndDatePicker(false);
                            }}
                        />
                    )}
                </View>
            </View>

            <Button title="Lưu ngân sách" onPress={handleSubmit(onSubmit)} />

            {/* Modal chọn danh mục */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>Chọn danh mục</Text>
                        <FlatList
                            data={categories}
                            renderItem={renderCategoryItem}
                            keyExtractor={(item) => item.id}
                        />
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
    },
    iconPicker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    selectedCategoryImage: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    modalHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    categoryImage: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    categoryText: {
        fontSize: 16,
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    dateInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Đảm bảo khoảng cách đều giữa hai ô input
        marginBottom: 15,
    },
    dateInputWrapper: {
        flex: 1,
        marginHorizontal: 5, // Giảm khoảng cách giữa các ô input
    },
});
