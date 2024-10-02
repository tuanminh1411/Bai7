import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Màn hình HomeScreen
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.homeText}>Chào mừng đến với HomeScreen!</Text>
    </View>
  );
};

// Màn hình Đăng nhập (LoginScreen)
const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [isValid, setIsValid] = useState(false);

  // Kiểm tra số điện thoại có hợp lệ hay không
  const isPhoneValid = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Kiểm tra số điện thoại có đúng 10 chữ số
    return phoneRegex.test(phone);
  };

  useEffect(() => {
    // Cập nhật trạng thái hợp lệ của số điện thoại khi thay đổi
    setIsValid(isPhoneValid(phone));
  }, [phone]);

  const handleContinue = () => {
    if (!isValid) {
      Alert.alert('Số điện thoại không đúng định dạng', 'Vui lòng nhập lại.');
    } else {
      // Hiển thị thông báo chào mừng và điều hướng tới màn hình Home
      Alert.alert('Welcome', 'Chào mừng đến với khóa học lập trình React Native tại CodeFresher.vn');
      navigation.navigate('Home');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.header}>
        <Text style={styles.title}>Đăng nhập</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Nhập số điện thoại</Text>
        <Text style={styles.subLabel}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="numeric"
          value={phone}
          onChangeText={setPhone}
          maxLength={10}
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isValid ? '#007BFF' : '#ddd' }]}
          onPress={handleContinue}
          disabled={!isValid}
        >
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

// Tạo Stack Navigator để điều hướng
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Đăng nhập' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Trang chủ' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  homeText: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default App;
