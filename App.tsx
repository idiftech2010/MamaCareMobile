import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import AssessmentScreen from './src/screens/AssessmentScreen';
import TelemedicineScreen from './src/screens/TelemedicineScreen';
import EducationScreen from './src/screens/EducationScreen';
import WearablesScreen from './src/screens/WearablesScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DoctorProfileScreen from './src/screens/DoctorProfileScreen';
import ChatScreen from './src/screens/ChatScreen';

// Contexts
import { AuthProvider } from './src/contexts/AuthContext';
import { LanguageProvider } from './src/contexts/LanguageContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <LanguageProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerStyle: { backgroundColor: '#f08080' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
              }}
            >
              <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Mamacare' }} />
              <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'AI Chat' }} />
              <Stack.Screen name="Assessment" component={AssessmentScreen} options={{ title: 'Risk Assessment' }} />
              <Stack.Screen name="Telemedicine" component={TelemedicineScreen} options={{ title: 'Telemedicine' }} />
              <Stack.Screen name="Education" component={EducationScreen} options={{ title: 'Education Hub' }} />
              <Stack.Screen name="Wearables" component={WearablesScreen} options={{ title: 'Wearables' }} />
              <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Sign In' }} />
              <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Profile' }} />
              <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} options={{ title: 'Doctor Profile' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </LanguageProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
