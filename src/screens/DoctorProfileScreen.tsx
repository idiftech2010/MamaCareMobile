import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const doctors = [
  {
    id: '1',
    name: 'Dr. Amara Okafor',
    specialty: 'Obstetrics & Gynecology',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400',
    bio: 'Board-certified obstetrician with 15 years of experience in maternal health.',
    rating: 4.9,
    reviews: 128,
    languages: ['English', 'Igbo'],
    education: 'University of Lagos Medical School',
    experience: 15,
    consultationFee: 15000,
    available: true,
    nextAvailable: 'Today, 2:00 PM',
  },
];

export default function DoctorProfileScreen({ route }: any) {
  const doctor = doctors[0]; // In real app, fetch by ID from route.params

  const handleBook = () => {
    Alert.alert(
      'Appointment Request',
      `Request appointment with ${doctor.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => Alert.alert('Success', 'Request sent!') },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Image */}
      <View style={styles.header}>
        <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
        <View style={styles.overlay} />
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.specialty}>{doctor.specialty}</Text>
          </View>
          <View style={[styles.availabilityBadge, { backgroundColor: doctor.available ? '#22c55e20' : '#f59e0b20' }]}>
            <Text style={[styles.availabilityText, { color: doctor.available ? '#22c55e' : '#f59e0b' }]}>
              {doctor.available ? 'Available' : 'Busy'}
            </Text>
          </View>
        </View>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={18} color="#fbbf24" />
          <Text style={styles.rating}>{doctor.rating}</Text>
          <Text style={styles.reviews}>({doctor.reviews} reviews)</Text>
          <Text style={styles.separator}>|</Text>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.experience}>{doctor.experience} years</Text>
        </View>

        <Text style={styles.bio}>{doctor.bio}</Text>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleBook}>
            <Ionicons name="calendar" size={18} color="#fff" />
            <Text style={styles.primaryButtonText}>Book Appointment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="videocam" size={18} color="#f08080" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="chatbubbles" size={18} color="#f08080" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Details */}
      <View style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>Information</Text>
        
        <View style={styles.detailItem}>
          <Ionicons name="school-outline" size={20} color="#f08080" />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Education</Text>
            <Text style={styles.detailValue}>{doctor.education}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Ionicons name="language-outline" size={20} color="#f08080" />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Languages</Text>
            <Text style={styles.detailValue}>{doctor.languages.join(', ')}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Ionicons name="cash-outline" size={20} color="#f08080" />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Consultation Fee</Text>
            <Text style={styles.detailValue}>₦{doctor.consultationFee.toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={20} color="#f08080" />
          <View style={styles.detailContent}>
            <Text style={styles.detailLabel}>Next Available</Text>
            <Text style={styles.detailValue}>{doctor.nextAvailable}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffaf5',
  },
  header: {
    height: 250,
    position: 'relative',
  },
  doctorImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  infoCard: {
    backgroundColor: '#fff',
    marginTop: -30,
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  doctorName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#343434',
  },
  specialty: {
    fontSize: 14,
    color: '#f08080',
    marginTop: 4,
  },
  availabilityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
  },
  reviews: {
    fontSize: 13,
    color: '#666',
  },
  separator: {
    color: '#ccc',
    marginHorizontal: 6,
  },
  experience: {
    fontSize: 13,
    color: '#666',
  },
  bio: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f08080',
    padding: 14,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryButton: {
    width: 48,
    height: 48,
    backgroundColor: '#fce4d4',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsCard: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 12,
    borderRadius: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343434',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
  },
  detailValue: {
    fontSize: 15,
    color: '#343434',
    fontWeight: '500',
    marginTop: 2,
  },
});
