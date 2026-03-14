import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const devices = [
  {
    id: '1',
    name: 'Guardian Watch',
    description: 'Continuous vital tracking with African-inspired design',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    price: '₦45,000',
    features: ['Heart Rate', 'Blood Pressure', 'Sleep Analysis', 'Emergency SOS'],
  },
  {
    id: '2',
    name: 'Unity Band',
    description: 'Activity and sleep monitoring for holistic wellness',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400',
    price: '₦25,000',
    features: ['Step Count', 'Calories', 'Sleep Stages', 'Reminders'],
  },
  {
    id: '3',
    name: 'Serenity Necklace',
    description: 'Elegant stress and wellness tracking',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
    price: '₦35,000',
    features: ['Stress Detection', 'Breathing', 'Mindfulness', 'Wellness Score'],
  },
  {
    id: '4',
    name: 'Vitality Ring',
    description: 'Discrete 24/7 health monitoring',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
    price: '₦55,000',
    features: ['Heart Rate', 'Temperature', 'Activity', 'Water Resistant'],
  },
];

export default function WearablesScreen() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Future of Monitoring</Text>
        <Text style={styles.headerSubtitle}>African-themed wearable devices</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Featured Device Carousel */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const slide = Math.round(e.nativeEvent.contentOffset.x / width);
            setActiveIndex(slide);
          }}
        >
          {devices.map((device) => (
            <View key={device.id} style={styles.deviceSlide}>
              <View style={styles.deviceImageContainer}>
                <Image source={{ uri: device.image }} style={styles.deviceImage} />
              </View>
              <View style={styles.deviceInfo}>
                <Text style={styles.deviceName}>{device.name}</Text>
                <Text style={styles.deviceDescription}>{device.description}</Text>
                <Text style={styles.devicePrice}>{device.price}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Dots */}
        <View style={styles.dotsContainer}>
          {devices.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === activeIndex && styles.activeDot]}
            />
          ))}
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <View style={styles.featuresGrid}>
            {devices[activeIndex].features.map((feature, idx) => (
              <View key={idx} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#f08080" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* All Devices */}
        <Text style={styles.sectionTitle}>All Devices</Text>
        <View style={styles.allDevicesContainer}>
          {devices.map((device) => (
            <TouchableOpacity key={device.id} style={styles.smallDeviceCard}>
              <Image source={{ uri: device.image }} style={styles.smallDeviceImage} />
              <Text style={styles.smallDeviceName}>{device.name}</Text>
              <Text style={styles.smallDevicePrice}>{device.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Notify Button */}
        <TouchableOpacity style={styles.notifyButton}>
          <Text style={styles.notifyButtonText}>Notify Me When Available</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf5',
  },
  header: {
    backgroundColor: '#60a5fa',
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  deviceSlide: {
    width,
    padding: 20,
  },
  deviceImageContainer: {
    backgroundColor: '#fce4d4',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
  },
  deviceImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  deviceInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  deviceName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343434',
  },
  deviceDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  devicePrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f08080',
    marginTop: 12,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e5e5e5',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#f08080',
    width: 20,
  },
  featuresContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343434',
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureText: {
    fontSize: 14,
    color: '#343434',
  },
  allDevicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
  },
  smallDeviceCard: {
    width: (width - 52) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  smallDeviceImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  smallDeviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#343434',
    marginTop: 8,
  },
  smallDevicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f08080',
    marginTop: 4,
  },
  notifyButton: {
    backgroundColor: '#f08080',
    margin: 20,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  notifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
