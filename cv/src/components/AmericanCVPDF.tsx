import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 35, fontSize: 10, fontFamily: 'Helvetica' },
  header: { marginBottom: 18, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#666666', alignItems: 'center' },
  name: { fontSize: 24, fontWeight: 'bold', color: '#000000', marginBottom: 4, textAlign: 'center' },
  title: { fontSize: 14, color: '#333333', marginBottom: 10, textAlign: 'center' },
  contactInfo: { flexDirection: 'row', gap: 15, fontSize: 9, color: '#666666', justifyContent: 'center', alignItems: 'center' },
  contactItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  link: { color: '#000000', textDecoration: 'none' },
  section: { marginBottom: 15 },
  sectionHeader: { borderBottomWidth: 1, borderBottomColor: '#cccccc', paddingBottom: 3, marginBottom: 8 },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', color: '#000000', textTransform: 'uppercase' },
  summaryText: { fontSize: 10, color: '#333333', lineHeight: 1.4, textAlign: 'justify' },
  expItem: { marginBottom: 11 },
  expRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 },
  expTitle: { fontSize: 10, fontWeight: 'bold', color: '#000000' },
  expCompany: { fontSize: 10, color: '#333333', fontWeight: 'bold', marginBottom: 2 },
  expPeriod: { fontSize: 9, color: '#666666' },
  expDesc: { fontSize: 9, color: '#333333', lineHeight: 1.4, textAlign: 'justify' },
  skillsRow: { flexDirection: 'row', marginBottom: 5 },
  skillCat: { fontSize: 10, fontWeight: 'bold', color: '#333333', width: '25%' },
  skillList: { fontSize: 9, color: '#333333', width: '75%' },
  langRow: { flexDirection: 'row', marginBottom: 3 },
  langName: { fontSize: 10, color: '#333333', width: '30%' },
  langLevel: { fontSize: 10, color: '#333333', width: '70%' },
});

export interface CVPDFProps {
  personal: { name: string; email: string; website: string; location: string; linkedin: string; } | undefined;
  about: { role: string; } | undefined;
  experience: { title: string; company: string; period: string; description: string; }[];
  education: { title: string; company: string; period: string; description: string; }[];
  cv: { title: string; summary: string; skills: Record<string, string>; languages: Record<string, string>; } | undefined;
}

const AmericanCVPDF = ({ personal, about, experience, education, cv }: CVPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{personal?.name ?? ''}</Text>
        <Text style={styles.title}>{cv?.title || about?.role || ''}</Text>
        <View style={styles.contactInfo}>
          {personal?.email ? <View style={styles.contactItem}><Text>{personal.email}</Text></View> : null}
          {personal?.location ? <View style={styles.contactItem}><Text>{personal.location}</Text></View> : null}
          {personal?.website ? (
            <View style={styles.contactItem}>
              <Link src={`https://${personal.website}`} style={styles.link}>{personal.website}</Link>
            </View>
          ) : null}
          {personal?.linkedin ? (
            <View style={styles.contactItem}>
              <Link src={`https://${personal.linkedin}`} style={styles.link}>{personal.linkedin}</Link>
            </View>
          ) : null}
        </View>
      </View>

      {/* Summary */}
      {cv?.summary ? (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
          </View>
          <Text style={styles.summaryText}>{cv.summary}</Text>
        </View>
      ) : null}

      {/* Experience */}
      {experience?.length > 0 ? (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
          </View>
          {experience.map((exp, i) => (
            <View key={i} style={styles.expItem}>
              <View style={styles.expRow}>
                <Text style={styles.expTitle}>{exp.title}</Text>
                <Text style={styles.expPeriod}>{exp.period}</Text>
              </View>
              <Text style={styles.expCompany}>{exp.company}</Text>
              <Text style={styles.expDesc}>{exp.description}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {/* Education */}
      {education?.length > 0 ? (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Education</Text>
          </View>
          {education.map((edu, i) => (
            <View key={i} style={styles.expItem}>
              <View style={styles.expRow}>
                <Text style={styles.expTitle}>{edu.title}</Text>
                <Text style={styles.expPeriod}>{edu.period}</Text>
              </View>
              <Text style={styles.expCompany}>{edu.company}</Text>
              {edu.description ? <Text style={styles.expDesc}>{edu.description}</Text> : null}
            </View>
          ))}
        </View>
      ) : null}

      {/* Skills */}
      {cv?.skills && Object.keys(cv.skills).length > 0 ? (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
          </View>
          {Object.entries(cv.skills).map(([category, list], i) => (
            <View key={i} style={styles.skillsRow}>
              <Text style={styles.skillCat}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
              <Text style={styles.skillList}>{list}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {/* Languages */}
      {cv?.languages && Object.keys(cv.languages).length > 0 ? (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Languages</Text>
          </View>
          {Object.entries(cv.languages).map(([language, level], i) => (
            <View key={i} style={styles.langRow}>
              <Text style={styles.langName}>{language}</Text>
              <Text style={styles.langLevel}>{level}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </Page>
  </Document>
);

export default AmericanCVPDF;
