import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavori } from '../context/FavoriContext';
import { useKiralama } from '../context/KiralamaContext';
import { useUser } from "../context/UserContext";

const TABS = ["Kiraladıklarım", "Favorilerim", "Kampanyalar"];
const DARK_BLUE = "#162447";
const BLUE = "#1f4068";
const LIGHT_BG = "#eaefff";
const WHITE = "#fff";
const SHADOW = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.13,
  shadowRadius: 6,
  elevation: 4,
};

export default function AracModelleri() {
  const [selectedTab, setSelectedTab] = useState(0);
  const { favoriler, removeFavori } = useFavori();
  const { onaylanmisKiralamalar } = useKiralama();
  const { username } = useUser();

  const kendiKiralamalarim = onaylanmisKiralamalar.filter(item => item.user === username);

  const kampanyalar = [
    { id: '4', title: "Yaz İndirimi", detail: "%10 indirim tüm SUV araçlarda!" },
  ];

  return (
    <View style={styles.container}>
      {/* Sekmeler */}
      <View style={styles.tabContainer}>
        {TABS.map((tab, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.tab,
              selectedTab === i && styles.tabSelected,
              SHADOW,
            ]}
            onPress={() => setSelectedTab(i)}
            activeOpacity={0.85}
          >
            <Text style={[styles.tabText, selectedTab === i && styles.tabTextSelected]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sekme İçerikleri */}
      <View style={{ flex: 1 }}>
        {selectedTab === 0 && (
          <View style={styles.listContainer}>
            {kendiKiralamalarim.length === 0 ? (
              <Text style={styles.emptyText}>Hiç araç kiralamadınız.</Text>
            ) : (
              kendiKiralamalarim.map(item => (
                <View key={item.id} style={styles.itemBox}>
                  <View style={styles.iconCircle}>
                    <Ionicons name="car-sport" size={22} color={DARK_BLUE} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <Text style={styles.itemSub}>{item.tarih}</Text>
                    <Text style={styles.itemSub}>Toplam: {item.toplamUcret} TL / {item.gunSayisi} gün</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

        {selectedTab === 1 && (
          <View style={styles.listContainer}>
            {favoriler.length === 0 ? (
              <Text style={styles.emptyText}>Henüz favori eklemediniz.</Text>
            ) : (
              favoriler.map(item => (
                <View key={item.id} style={styles.itemBox}>
                  <View style={styles.iconCircleRed}>
                    <Ionicons name="heart" size={20} color="#e74c3c" />
                  </View>
                  <Text style={styles.itemText}>{item.Baslik || item.name}</Text>
                  {/* Çarpı ikonu */}
                  <TouchableOpacity
                    onPress={() => removeFavori(item.id)}
                    style={styles.removeBtn}
                  >
                    <Ionicons name="close-circle" size={22} color="#aaa" />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        )}

        {selectedTab === 2 && (
          <View style={styles.listContainer}>
            {kampanyalar.length === 0 ? (
              <Text style={styles.emptyText}>Şu an kampanya yok.</Text>
            ) : (
              kampanyalar.map(item => (
                <View key={item.id} style={styles.itemBox}>
                  <View style={styles.iconCircleGreen}>
                    <Ionicons name="pricetag" size={18} color="#27ae60" />
                  </View>
                  <View>
                    <Text style={styles.itemText}>{item.title}</Text>
                    <Text style={styles.itemSub}>{item.detail}</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: LIGHT_BG, padding: 12 },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 14,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
    ...SHADOW,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: "#f2f2f2",
    borderBottomWidth: 0,
  },
  tabSelected: {
    backgroundColor: BLUE,
    borderBottomWidth: 0,
    ...SHADOW,
  },
  tabText: {
    fontWeight: "bold",
    color: DARK_BLUE,
    fontSize: 15,
    letterSpacing: 0.5,
  },
  tabTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  listContainer: { flex: 1, padding: 5 },
  itemBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: WHITE,
    borderRadius: 20,
    marginBottom: 16,
    ...SHADOW,
    minHeight: 68,
  },
  itemText: { marginLeft: 12, fontSize: 17, fontWeight: "bold", color: DARK_BLUE },
  itemSub: { marginLeft: 12, fontSize: 13, color: "#666" },
  emptyText: { color: "#666", textAlign: "center", marginTop: 40, fontSize: 15 },
  iconCircle: {
    width: 34, height: 34, borderRadius: 18, backgroundColor: "#e5eaf5",
    alignItems: "center", justifyContent: "center",
    marginRight: 8,
  },
  iconCircleRed: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: "#fff1f0",
    alignItems: "center", justifyContent: "center",
    marginRight: 8,
  },
  iconCircleGreen: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: "#e6fff2",
    alignItems: "center", justifyContent: "center",
    marginRight: 10,
  },
  removeBtn: { marginLeft: "auto", padding: 2 },
});
