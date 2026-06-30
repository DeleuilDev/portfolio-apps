import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#FFFFFF', padding: 35, fontSize: 10, fontFamily: 'Helvetica' },
  header: { marginBottom: 18, borderBottomWidth: 1, borderBottomColor: '#666666', paddingBottom: 12, alignItems: 'center' },
  name: { fontSize: 22, fontWeight: 'bold', color: '#000000', marginBottom: 4, textAlign: 'center' },
  title: { fontSize: 13, color: '#333333', marginBottom: 10, textAlign: 'center' },
  contactInfo: { flexDirection: 'row', gap: 14, fontSize: 9, color: '#666666', justifyContent: 'center', alignItems: 'center' },
  contactItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  link: { color: '#000000', textDecoration: 'none' },
  section: { marginBottom: 14 },
  sectionHeader: { borderBottomWidth: 1, borderBottomColor: '#cccccc', paddingBottom: 3, marginBottom: 7 },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', color: '#000000', textTransform: 'uppercase' },
  summaryText: { fontSize: 10, color: '#333333', lineHeight: 1.4, textAlign: 'justify' },
  item: { marginBottom: 11 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 },
  itemTitle: { fontSize: 10, fontWeight: 'bold', color: '#000000' },
  itemSub: { fontSize: 10, color: '#333333', fontWeight: 'bold', marginBottom: 2 },
  period: { fontSize: 9, color: '#666666' },
  description: { fontSize: 9, color: '#333333', lineHeight: 1.4, textAlign: 'justify' },
  skillsRow: { flexDirection: 'row', marginBottom: 5 },
  skillCategory: { fontSize: 10, fontWeight: 'bold', color: '#333333', width: '25%' },
  skillList: { fontSize: 9, color: '#333333', width: '75%' },
  langRow: { flexDirection: 'row', marginBottom: 3 },
  langName: { fontSize: 10, color: '#333333', width: '30%' },
  langLevel: { fontSize: 10, color: '#333333', width: '70%' },
});

export interface CVGeneratorData {
  personal: { name: string; email: string; website: string; location: string; linkedin: string; };
  jobTitle: string;
  summary: string;
  experience: { title: string; company: string; period: string; description: string; }[];
  education: { title: string; company: string; period: string; description: string; }[];
  skills: { category: string; list: string; }[];
  languages: { name: string; level: string; }[];
}

export default function CVGeneratorPDF({ data }: { data: CVGeneratorData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.personal.name}</Text>
          <Text style={styles.title}>{data.jobTitle}</Text>
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}><Text>{data.personal.email}</Text></View>
            <View style={styles.contactItem}><Text>{data.personal.location}</Text></View>
            {data.personal.website ? (
              <View style={styles.contactItem}>
                <Link src={`https://${data.personal.website}`} style={styles.link}>{data.personal.website}</Link>
              </View>
            ) : null}
            {data.personal.linkedin ? (
              <View style={styles.contactItem}>
                <Link src={`https://${data.personal.linkedin}`} style={styles.link}>{data.personal.linkedin}</Link>
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
          </View>
          <Text style={styles.summaryText}>{data.summary}</Text>
        </View>

        {data.experience.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
            </View>
            {data.experience.map((exp, i) => (
              <View key={i} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{exp.title}</Text>
                  <Text style={styles.period}>{exp.period}</Text>
                </View>
                <Text style={styles.itemSub}>{exp.company}</Text>
                <Text style={styles.description}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {data.education.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Education</Text>
            </View>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.item}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{edu.title}</Text>
                  <Text style={styles.period}>{edu.period}</Text>
                </View>
                <Text style={styles.itemSub}>{edu.company}</Text>
                {edu.description ? <Text style={styles.description}>{edu.description}</Text> : null}
              </View>
            ))}
          </View>
        )}

        {data.skills.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Technical Skills</Text>
            </View>
            {data.skills.map((s, i) => (
              <View key={i} style={styles.skillsRow}>
                <Text style={styles.skillCategory}>{s.category.charAt(0).toUpperCase() + s.category.slice(1)}</Text>
                <Text style={styles.skillList}>{s.list}</Text>
              </View>
            ))}
          </View>
        )}

        {data.languages.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Languages</Text>
            </View>
            {data.languages.map((l, i) => (
              <View key={i} style={styles.langRow}>
                <Text style={styles.langName}>{l.name}</Text>
                <Text style={styles.langLevel}>{l.level}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
