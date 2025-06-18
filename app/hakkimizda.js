import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Platform, StatusBar } from 'react-native';

export default function About() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Hakkımızda</Text>
        <Image
          style={styles.image}
          source={require('../assets/images/download.jpeg')}
          resizeMode="cover"
        />
        <Text style={styles.text}>
          Geleceğin ulaşımını bugünden keşfedin! Araç Kiralama, yenilikçi ve çevre dostu araçlarıyla sizlere en güvenli ve rahat yolculuk deneyimini sunuyor. Vizyonumuz, modern teknolojiyi herkes için erişilebilir hale getirmek ve sürdürülebilir bir gelecek inşa etmektir.
        </Text>
        <Text style={styles.text}>
          En son teknolojiyle donatılmış araçlarımız, her türlü ihtiyaca uygun çözümler sunar. İster iş seyahati ister tatil, otonom araçlarımızla her yolculuk unutulmaz bir deneyime dönüşür.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f8ff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 28 : 48, // başlık ekrandan taşmaz
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 18,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: "#172a58",
    marginBottom: 14,
    letterSpacing: 1,
  },
  image: {
    width: '98%',
    height: 210,
    marginBottom: 15,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#dbe7fa",
    backgroundColor: "#eee",
    // Görsel tam gözüksün ve köşeler estetik dursun
  },
  text: {
    fontSize: 17,
    marginBottom: 11,
    color: "#223168",
    textAlign: 'center',
    lineHeight: 25,
    fontWeight: "500",
  },
});
