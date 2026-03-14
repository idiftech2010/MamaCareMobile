import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const { width } = Dimensions.get('window');

const carouselImages = [
  { image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800', title: 'Expecting Together' },
  { image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800', title: 'New Beginnings' },
  { image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800', title: 'Expert Care' },
];

const features = [
  { icon: 'fitness', title: 'AI Risk Assessment', screen: 'Assessment', color: '#f08080' },
  { icon: 'videocam', title: 'Telemedicine', screen: 'Telemedicine', color: '#4ade80' },
  { icon: 'book', title: 'Education Hub', screen: 'Education', color: '#fbbf24' },
  { icon: 'watch', title: 'Wearables', screen: 'Wearables', color: '#60a5fa' },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="heart" size={32} color="#f08080" />
          <Text style={styles.logoText}>Mamacare</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate(isAuthenticated ? 'Profile' : 'Login')}>
          <Ionicons name="person-circle" size={40} color="#f08080" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Carousel */}
        <View style={styles.carouselContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const slide = Math.round(e.nativeEvent.contentOffset.x / width);
              setCurrentSlide(slide);
            }}
          >
            {carouselImages.map((slide, index) => (
              <View key={index} style={styles.slide}>
                <Image source={{ uri: slide.image }} style={styles.slideImage} />
                <View style={styles.slideOverlay}>
                  <Text style={styles.slideTitle}>{slide.title}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={styles.dotsContainer}>
            {carouselImages.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === currentSlide && styles.activeDot]}
              />
            ))}
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>84%</Text>
            <Text style={styles.statLabel}>AI Accuracy</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>9</Text>
            <Text style={styles.statLabel}>Languages</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>Support</Text>
          </View>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={styles.featureCard}
                onPress={() => navigation.navigate(feature.screen as never)}
              >
                <View style={[styles.featureIcon, { backgroundColor: feature.color + '20' }]}>
                  <Ionicons name={feature.icon as any} size={28} color={feature.color} />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* CTA */}
        <View style={styles.ctaContainer}>
          <Text style={styles.ctaTitle}>Start Your Journey Today</Text>
          <Text style={styles.ctaSubtitle}>
            Join thousands of mothers who trust MamaCare
          </Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Assessment' as never)}
          >
            <Text style={styles.ctaButtonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#fce4d4',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343434',
  },
  carouselContainer: {
    height: 250,
  },
  slide: {
    width,
    height: 250,
  },
  slideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  slideOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  slideTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#f08080',
    width: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f08080',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  featuresContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343434',
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    width: (width - 52) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#343434',
    textAlign: 'center',
  },
  ctaContainer: {
    backgroundColor: '#343434',
    padding: 30,
    margin: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#f08080',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    gap: 8,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
