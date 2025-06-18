import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useKiralama } from "../context/KiralamaContext";
import { useUser } from "../context/UserContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function AdminPanel({ navigation }) {
  const {
    bekleyenKiralamalar,
    onaylanmisKiralamalar,
    onaylaKiralama,
    setBekleyenKiralamalar,
  } = useKiralama();

  const { role, setRole, setUsername } = useUser(); // Çıkış için ekledik

  // ✅ YETKİ KONTROLÜ
  useEffect(() => {
    if (role !== "admin") {
      Alert.alert("Yetkisiz Giriş", "Bu sayfaya erişim izniniz yok!", [
        {
          text: "Tamam",
          onPress: () => navigation.replace("Home"),
        },
      ]);
    }
  }, [role]);

  // ✅ ÇIKIŞ
  const handleLogout = () => {
    setRole(null);
    setUsername("");
    navigation.replace("Home");
  };

  const reddetKiralama = (id) => {
    Alert.alert(
      "Talebi Reddet",
      "Bu kiralama talebini reddetmek istediğinize emin misiniz?",
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Evet",
          onPress: () =>
            setBekleyenKiralamalar((prev) =>
              prev.filter((k) => k.id !== id)
            ),
        },
      ]
    );
  };

  const renderBekleyenItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons
          name="time-outline"
          size={28}
          color="#FF9800"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.itemTitle}>{item.name}</Text>
        <View style={styles.badgeWarning}>
          <Text style={styles.badgeText}>Bekliyor</Text>
        </View>
      </View>
      <Text style={styles.itemDate}>{item.tarih}</Text>
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.approve]}
          onPress={() => onaylaKiralama(item.id)}
          activeOpacity={0.8}
        >
          <MaterialIcons name="check-circle" size={22} color="#fff" />
          <Text style={styles.actionText}>Onayla</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.reject]}
          onPress={() => reddetKiralama(item.id)}
          activeOpacity={0.8}
        >
          <MaterialIcons name="cancel" size={22} color="#fff" />
          <Text style={styles.actionText}>Reddet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOnaylanmisItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: "#eafaf1" }]}>
      <View style={styles.cardHeader}>
        <Ionicons
          name="checkmark-done-circle-outline"
          size={28}
          color="#43a047"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.itemTitle}>{item.name}</Text>
        <View style={styles.badgeSuccess}>
          <Text style={styles.badgeText}>Onaylandı</Text>
        </View>
      </View>
      <Text style={styles.itemDate}>{item.tarih}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        {/* ÜST BAR: Başlık + Çıkış */}
        <View style={styles.topBar}>
          <Text style={styles.title}>Admin Paneli</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={28} color="#333" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Bekleyen Kiralama Talepleri</Text>
        {bekleyenKiralamalar.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons
              name="cloud-offline-outline"
              size={60}
              color="#bbb"
              style={{ marginBottom: 10 }}
            />
            <Text style={styles.emptyText}>Şu an bekleyen talep yok.</Text>
          </View>
        ) : (
          <FlatList
            data={bekleyenKiralamalar}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderBekleyenItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}

        <Text style={styles.sectionTitle}>Onaylanan Kiralamalar</Text>
        {onaylanmisKiralamalar.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons
              name="checkmark-done-outline"
              size={60}
              color="#bbb"
              style={{ marginBottom: 10 }}
            />
            <Text style={styles.emptyText}>Henüz onaylanan kiralama yok.</Text>
          </View>
        ) : (
          <FlatList
            data={onaylanmisKiralamalar}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderOnaylanmisItem}
            contentContainerStyle={{ paddingBottom: 60 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f4f8fb",
  },
  container: {
    flex: 1,
    backgroundColor: "#f4f8fb",
    padding: 18,
    paddingTop: Platform.OS === "android" ? 30 : 6,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#263859",
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "600",
    color: "#2b4865",
    marginBottom: 9,
    marginTop: 12,
    textAlign: "left",
  },
  emptyBox: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 18,
    marginBottom: 24,
    elevation: 2,
    shadowColor: "#bbb",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  emptyText: {
    color: "#888",
    fontSize: 17,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#223",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: "bold",
    flex: 1,
    color: "#2b4865",
  },
  itemDate: {
    fontSize: 14,
    color: "#758a99",
    marginBottom: 6,
    marginLeft: 4,
  },
  badgeWarning: {
    backgroundColor: "#ffe082",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  badgeSuccess: {
    backgroundColor: "#b2f2bb",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  cardActions: {
    flexDirection: "row",
    marginTop: 10,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    marginHorizontal: 4,
  },
  approve: {
    backgroundColor: "#3cb371",
  },
  reject: {
    backgroundColor: "#ef5350",
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 6,
    fontSize: 15,
  },
});
