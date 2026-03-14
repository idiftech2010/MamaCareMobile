import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const doctors = [
  {
    id: '1',
    name: 'Dr. Amara Okafor',
    specialty: 'Obstetrics & Gynecology',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400',
    rating: 4.9,
    reviews: 128,
    available: true,
    languages: ['English', 'Igbo'],
    nextAvailable: 'Today, 2:00 PM',
  },
  {
    id: '2',
    name: 'Dr. Fatima Al-Rashid',
    specialty: 'Maternal-Fetal Medicine',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
    rating: 4.8,
    reviews: 96,
    available: true,
    languages: ['English', 'Arabic'],
    nextAvailable: 'Tomorrow, 10:00 AM',
  },
  {
    id: '3',
    name: 'Dr. Sarah Mitchell',
    specialty: 'Obstetrics & Gynecology',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
    rating: 4.9,
    reviews: 156,
    available: true,
    languages: ['English', 'French'],
    nextAvailable: 'Today, 4:30 PM',
  },
  {
    id: '4',
    name: 'Dr. Ngozi Adeyemi',
    specialty: 'Reproductive Endocrinology',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400',
    rating: 4.7,
    reviews: 84,
    available: false,
    languages: ['English', 'Yoruba'],
    nextAvailable: 'Monday, 9:00 AM',
  },
];

export default function TelemedicineScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = doctors.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Connect With Experts</Text>
        <Text style={styles.headerSubtitle}>Instant access to maternal health specialists</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search doctors..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: '#f0808020' }]}>
              <Ionicons name="videocam" size={24} color="#f08080" />
            </View>
            <Text style={styles.featureText}>Video</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: '#4ade8020' }]}>
              <Ionicons name="chatbubbles" size={24} color="#4ade80" />
            </View>
            <Text style={styles.featureText}>Chat</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: '#fbbf2420' }]}>
              <Ionicons name="calendar" size={24} color="#fbbf24" />
            </View>
            <Text style={styles.featureText}>Book</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Our Doctors</Text>

        {filteredDoctors.map((doctor) => (
          <TouchableOpacity
            key={doctor.id}
            style={styles.doctorCard}
            onPress={() => (navigation as any).navigate('DoctorProfile', { doctorId: doctor.id })}          >
            <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
            <View style={styles.doctorInfo}>
              <View style={styles.doctorHeader}>
                <Text style={styles.doctorName}>{doctor.name}</Text>
                <View style={[styles.availabilityBadge, { backgroundColor: doctor.available ? '#22c55e20' : '#f59e0b20' }]}>
                  <Text style={[styles.availabilityText, { color: doctor.available ? '#22c55e' : '#f59e0b' }]}>
                    {doctor.available ? 'Available' : 'Busy'}
                  </Text>
                </View>
              </View>
              <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
              <View style={styles.doctorMeta}>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color="#fbbf24" />
                  <Text style={styles.ratingText}>{doctor.rating}</Text>
                  <Text style={styles.reviewsText}>({doctor.reviews})</Text>
                </View>
                <Text style={styles.languagesText}>{doctor.languages.join(', ')}</Text>
              </View>
              <View style={styles.nextAvailable}>
                <Ionicons name="time-outline" size={14} color="#666" />
                <Text style={styles.nextAvailableText}>Next: {doctor.nextAvailable}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    backgroundColor: '#424242',
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
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  featureItem: {
    alignItems: 'center',
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343434',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doctorImage: {
    width: 100,
    height: 130,
  },
  doctorInfo: {
    flex: 1,
    padding: 12,
  },
  doctorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343434',
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availabilityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  doctorSpecialty: {
    fontSize: 13,
    color: '#f08080',
    marginTop: 2,
  },
  doctorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
  },
  reviewsText: {
    fontSize: 12,
    color: '#666',
  },
  languagesText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 12,
  },
  nextAvailable: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  nextAvailableText: {
    fontSize: 12,
    color: '#666',
  },
});
