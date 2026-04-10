import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { questionnaire } from "@fragrance-ai/fragrance-engine";

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>Fragrance AI</Text>
        <Text style={styles.title}>A mobile-first perfume discovery experience.</Text>
        <Text style={styles.subtitle}>
          The mobile app will guide users through the same structured fragrance quiz used by the web platform.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Opening questions</Text>
          {questionnaire.questions.slice(0, 4).map((question) => (
            <Text key={question.id} style={styles.listItem}>
              • {question.title}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5eee5"
  },
  container: {
    padding: 24
  },
  eyebrow: {
    color: "#8b4b1f",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 12
  },
  title: {
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "700",
    color: "#2c1b10"
  },
  subtitle: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 25,
    color: "#6e5648"
  },
  card: {
    marginTop: 28,
    padding: 20,
    borderRadius: 24,
    backgroundColor: "#fff9f3"
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2c1b10",
    marginBottom: 12
  },
  listItem: {
    fontSize: 15,
    lineHeight: 24,
    color: "#52382c"
  }
});
