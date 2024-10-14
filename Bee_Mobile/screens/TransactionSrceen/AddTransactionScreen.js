import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import ExpenseAdd from './ExpenseSrceen/ExpenseAdd';
import IncomeAdd from './IncomeSrceen/IncomeAdd';

const AddTransactionScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Chi tiêu'); 

  return (
    <ScrollView>
      <SegmentedControl
        values={['Chi tiêu', 'Thu nhập']}
        selectedIndex={selectedTab === 'Chi tiêu' ? 0 : 1}
        onChange={(event) => {
          const { nativeEvent } = event;
          setSelectedTab(nativeEvent.value); 
        }}
        style={styles.segmentedControl}
        tintColor="#5A5DD1"  // Màu nền khi chọn
        backgroundColor="#F0F0F0"  // Màu nền của segment
        fontStyle={{ fontWeight: '600' }}  // Kiểu chữ
        activeFontStyle={{ color: '#FFF' }}  // Màu chữ khi chọn
      />

      {selectedTab === 'Chi tiêu' ? (
        <ExpenseAdd />
      ) : (
        <IncomeAdd />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  segmentedControl: {
    marginVertical: 7,
    marginHorizontal: 50,
    height: 40,  
  },
});

export default AddTransactionScreen;
