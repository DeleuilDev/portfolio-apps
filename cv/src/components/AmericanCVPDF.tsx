import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import personalData from '@/data/personal.json';
import experienceData from '@/data/experience.json';
import cvData from '@/data/cv.json';

// Styles pour le PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 35,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 18,
    borderBottom: 1,
    borderBottomColor: '#666666',
    paddingBottom: 12,
    alignItems: 'center',
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  contactInfo: {
    flexDirection: 'row',
    gap: 15,
    fontSize: 9,
    color: '#666666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  link: {
    color: '#000000',
    textDecoration: 'none',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    textTransform: 'uppercase',
    borderBottom: 1,
    borderBottomColor: '#cccccc',
    paddingBottom: 3,
  },
  summaryText: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.4,
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 12,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
  },
  company: {
    fontSize: 10,
    color: '#333333',
    fontWeight: 'bold',
  },
  period: {
    fontSize: 9,
    color: '#666666',
  },
  description: {
    fontSize: 9,
    color: '#333333',
    lineHeight: 1.4,
    textAlign: 'justify',
  },
  skillsSection: {
    marginBottom: 15,
  },
  skillsRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  skillCategory: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333333',
    width: '25%',
  },
  skillList: {
    fontSize: 9,
    color: '#333333',
    width: '75%',
  },
  languagesSection: {
    marginBottom: 15,
  },
  languageItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  languageName: {
    fontSize: 10,
    color: '#333333',
    width: '30%',
  },
  languageLevel: {
    fontSize: 10,
    color: '#333333',
    width: '70%',
  },
});

const AmericanCVPDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{personalData.personal.name}</Text>
        <Text style={styles.title}>{cvData.cv.title}</Text>
        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Text>{personalData.personal.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text>{personalData.personal.location}</Text>
          </View>
          <View style={styles.contactItem}>
            <Link src={`https://${personalData.personal.website}`} style={styles.link}>
              {personalData.personal.website}
            </Link>
          </View>
          <View style={styles.contactItem}>
            <Link src={`https://${personalData.personal.linkedin}`} style={styles.link}>
              {personalData.personal.linkedin}
            </Link>
          </View>
        </View>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.summaryText}>{cvData.cv.summary}</Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        {experienceData.experience.map((exp, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>{exp.title}</Text>
              <Text style={styles.period}>{exp.period}</Text>
            </View>
            <Text style={styles.company}>{exp.company}</Text>
            <Text style={styles.description}>{exp.description}</Text>
          </View>
        ))}
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {experienceData.education.map((edu, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>{edu.title}</Text>
              <Text style={styles.period}>{edu.period}</Text>
            </View>
            <Text style={styles.company}>{edu.company}</Text>
            <Text style={styles.description}>{edu.description}</Text>
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.skillsSection}>
        <Text style={styles.sectionTitle}>Technical Skills</Text>
        {Object.entries(cvData.cv.skills).map(([category, skills], index) => (
          <View key={index} style={styles.skillsRow}>
            <Text style={styles.skillCategory}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
            <Text style={styles.skillList}>{skills}</Text>
          </View>
        ))}
      </View>

      {/* Languages */}
      <View style={styles.languagesSection}>
        <Text style={styles.sectionTitle}>Languages</Text>
        {Object.entries(cvData.cv.languages).map(([language, level], index) => (
          <View key={index} style={styles.languageItem}>
            <Text style={styles.languageName}>{language}</Text>
            <Text style={styles.languageLevel}>{level}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default AmericanCVPDF; 