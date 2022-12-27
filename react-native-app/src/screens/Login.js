import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { classNames } from '@tailwindcss/react-native';

const LoginScreen = () => {
  return (
    <View className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Text className="text-2xl font-bold text-gray-800 mb-6">Welcome Back!</Text>
      <TextInput
        className="w-full p-4 rounded-md bg-white text-gray-800 focus:outline-none focus:shadow-outline-blue"
        placeholder="Email"
      />
      <TextInput
        className="w-full p-4 mt-4 rounded-md bg-white text-gray-800 focus:outline-none focus:shadow-outline-blue"
        placeholder="Password"
        secureTextEntry={true}
      />
      <TouchableOpacity
        className="w-full py-4 mt-6 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
        onPress={() => {}}
      >
        <Text className="text-center text-lg font-bold">Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

