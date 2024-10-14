import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

export default function CustomDeleteModal({ isVisible, onConfirm, onCancel, message }) {
  const scaleValue = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    if (isVisible) {
      Animated.spring(scaleValue, {
        toValue: 1, // Mở rộng modal
        useNativeDriver: true,
        tension: 20,
        friction: 6,
      }).start();
    } else {
      Animated.timing(scaleValue, {
        toValue: 0, // Thu nhỏ modal
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, scaleValue]);

  if (!isVisible) {
    return null; 
  }

  return (
    <View style={styles.modalContainer}>
      <Animated.View style={[styles.modal, { transform: [{ scale: scaleValue }] }]}>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.action}>
          <TouchableOpacity style={styles.textCancel} onPress={onCancel}>
            <Text style={styles.text}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textConfirm} onPress={onConfirm}>
            <Text style={styles.text}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ đằng sau
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modal: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textCancel: {
    padding: 10,
    marginRight: 8
  },
  textConfirm: {
    padding: 10,
    marginLeft: 8
  },
  text: {
    color: '#5A5DD1',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
