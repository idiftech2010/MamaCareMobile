import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const API_BASE_URL = 'https://mamacare-backend-n1z7.onrender.com/api';

interface RiskResult {
  level: 'low' | 'medium' | 'high';
  score: number;
  confidence: number;
  factors: string[];
  recommendations: string[];
}

export default function AssessmentScreen() {
  const { isAuthenticated, getToken } = useAuth();
  const [isAssessing, setIsAssessing] = useState(false);
  const [riskResult, setRiskResult] = useState<RiskResult | null>(null);
  const [formData, setFormData] = useState({
    age: '',
    systolicBP: '',
    diastolicBP: '',
    bloodSugar: '',
    bodyTemp: '',
    heartRate: '',
    pregnancyWeek: '',
  });

  const handleAssess = async () => {
    if (!isAuthenticated) {
      Alert.alert('Login Required', 'Please login to use the risk assessment');
      return;
    }

    // Validate
    const required = ['age', 'systolicBP', 'diastolicBP', 'bloodSugar', 'bodyTemp', 'heartRate', 'pregnancyWeek'];
    const missing = required.filter(f => !formData[f as keyof typeof formData]);
    if (missing.length > 0) {
      Alert.alert('Missing Fields', 'Please fill in all fields');
      return;
    }

    setIsAssessing(true);

    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/risk-assessment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          age: parseInt(formData.age),
          systolicBP: parseInt(formData.systolicBP),
          diastolicBP: parseInt(formData.diastolicBP),
          bloodSugar: parseFloat(formData.bloodSugar),
          bodyTemp: parseFloat(formData.bodyTemp),
          heartRate: parseInt(formData.heartRate),
          pregnancyWeek: parseInt(formData.pregnancyWeek),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setRiskResult(result.result);
        Alert.alert('Success', 'Assessment completed successfully!');
      } else {
        const error = await response.json();
        Alert.alert('Assessment Failed', error.error || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Network Error', 'Please check your connection and try again');
      console.error('Assessment error:', error);
    } finally {
      setIsAssessing(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return '#22c55e';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#666';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Risk Assessment</Text>
        <Text style={styles.headerSubtitle}>Enter your vitals for AI analysis</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Age (years)</Text>
            <TextInput
              style={styles.input}
              placeholder="28"
              keyboardType="numeric"
              value={formData.age}
              onChangeText={(text) => setFormData({ ...formData, age: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Heart Rate (bpm)</Text>
            <TextInput
              style={styles.input}
              placeholder="75"
              keyboardType="numeric"
              value={formData.heartRate}
              onChangeText={(text) => setFormData({ ...formData, heartRate: text })}
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Systolic BP</Text>
            <TextInput
              style={styles.input}
              placeholder="120"
              keyboardType="numeric"
              value={formData.systolicBP}
              onChangeText={(text) => setFormData({ ...formData, systolicBP: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Diastolic BP</Text>
            <TextInput
              style={styles.input}
              placeholder="80"
              keyboardType="numeric"
              value={formData.diastolicBP}
              onChangeText={(text) => setFormData({ ...formData, diastolicBP: text })}
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Blood Sugar</Text>
            <TextInput
              style={styles.input}
              placeholder="7.0"
              keyboardType="decimal-pad"
              value={formData.bloodSugar}
              onChangeText={(text) => setFormData({ ...formData, bloodSugar: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Temperature (°C)</Text>
            <TextInput
              style={styles.input}
              placeholder="37.0"
              keyboardType="decimal-pad"
              value={formData.bodyTemp}
              onChangeText={(text) => setFormData({ ...formData, bodyTemp: text })}
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Pregnancy Week</Text>
            <TextInput
              style={styles.input}
              placeholder="12"
              keyboardType="numeric"
              value={formData.pregnancyWeek}
              onChangeText={(text) => setFormData({ ...formData, pregnancyWeek: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            {/* Empty container for layout balance */}
          </View>
        </View>

        <TouchableOpacity
          style={styles.assessButton}
          onPress={handleAssess}
          disabled={isAssessing}
        >
          {isAssessing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="analytics" size={20} color="#fff" />
              <Text style={styles.assessButtonText}>Get Assessment</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {riskResult && (
        <View style={[styles.resultCard, { borderColor: getRiskColor(riskResult.level) }]}>
          <View style={styles.resultHeader}>
            <Ionicons
              name={riskResult.level === 'low' ? 'checkmark-circle' : riskResult.level === 'medium' ? 'alert-circle' : 'warning'}
              size={40}
              color={getRiskColor(riskResult.level)}
            />
            <View style={styles.resultTitleContainer}>
              <Text style={styles.resultLabel}>Risk Level</Text>
              <Text style={[styles.resultLevel, { color: getRiskColor(riskResult.level) }]}>
                {riskResult.level.toUpperCase()} RISK
              </Text>
            </View>
          </View>

          <View style={styles.confidenceContainer}>
            <Text style={styles.confidenceLabel}>Confidence: {riskResult.confidence.toFixed(1)}%</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${riskResult.confidence}%` }]} />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Factors</Text>
            {riskResult.factors.map((factor, idx) => (
              <Text key={idx} style={styles.factorText}>{factor}</Text>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommendations</Text>
            {riskResult.recommendations.map((rec, idx) => (
              <Text key={idx} style={styles.recommendationText}>{rec}</Text>
            ))}
          </View>
        </View>
      )}

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Normal Ranges</Text>
        <Text style={styles.infoText}>• Blood Pressure: 90-120/60-80 mmHg</Text>
        <Text style={styles.infoText}>• Blood Sugar: 4-7 mmol/L</Text>
        <Text style={styles.infoText}>• Heart Rate: 60-100 bpm</Text>
        <Text style={styles.infoText}>• Temperature: 36.5-37.5°C</Text>
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
  formContainer: {
    padding: 20,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  inputContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  assessButton: {
    backgroundColor: '#f08080',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  assessButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  resultTitleContainer: {
    flex: 1,
  },
  resultLabel: {
    fontSize: 12,
    color: '#666',
  },
  resultLevel: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  confidenceContainer: {
    marginBottom: 16,
  },
  confidenceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e5e5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#f08080',
    borderRadius: 4,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#343434',
    marginBottom: 8,
  },
  factorText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  recommendationText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  infoCard: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#343434',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
});
