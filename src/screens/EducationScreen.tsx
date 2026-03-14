import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { id: 'nutrition', title: 'Nutrition', icon: 'nutrition', color: '#22c55e' },
  { id: 'exercise', title: 'Exercise', icon: 'fitness', color: '#3b82f6' },
  { id: 'mental', title: 'Mental Health', icon: 'brain', color: '#8b5cf6' },
  { id: 'prenatal', title: 'Prenatal', icon: 'baby', color: '#ec4899' },
];

const articles = [
  {
    id: '1',
    title: 'Essential Nutrients for a Healthy Pregnancy',
    category: 'Nutrition',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
  },
  {
    id: '2',
    title: 'Safe Exercises During Pregnancy',
    category: 'Exercise',
    readTime: 10,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
  },
  {
    id: '3',
    title: 'Managing Pregnancy Anxiety',
    category: 'Mental Health',
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
  },
];

export default function EducationScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Education Hub</Text>
        <Text style={styles.headerSubtitle}>Evidence-based resources for your journey</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.categoryCard}>
              <View style={[styles.categoryIcon, { backgroundColor: cat.color + '20' }]}>
                <Ionicons name={cat.icon as any} size={24} color={cat.color} />
              </View>
              <Text style={styles.categoryTitle}>{cat.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Articles */}
        <Text style={styles.sectionTitle}>Featured Articles</Text>
        {articles.map((article) => (
          <TouchableOpacity key={article.id} style={styles.articleCard}>
            <Image source={{ uri: article.image }} style={styles.articleImage} />
            <View style={styles.articleContent}>
              <View style={styles.articleMeta}>
                <Text style={styles.articleCategory}>{article.category}</Text>
                <View style={styles.readTime}>
                  <Ionicons name="time-outline" size={14} color="#666" />
                  <Text style={styles.readTimeText}>{article.readTime} min</Text>
                </View>
              </View>
              <Text style={styles.articleTitle}>{article.title}</Text>
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
    backgroundColor: '#fbbf24',
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
  categoriesContainer: {
    padding: 16,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 12,
    color: '#343434',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343434',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  articleCard: {
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
  articleImage: {
    width: '100%',
    height: 150,
  },
  articleContent: {
    padding: 16,
  },
  articleMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  articleCategory: {
    fontSize: 12,
    color: '#f08080',
    fontWeight: '600',
  },
  readTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readTimeText: {
    fontSize: 12,
    color: '#666',
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#343434',
  },
});
