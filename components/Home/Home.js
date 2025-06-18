import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import fetchCars from "../../fetchCars";
import CarCard from "../CarCard/CarCard";
import styles from "./HomeStyles";
import { useFavori } from "../../context/FavoriContext";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../context/UserContext";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  const [cars, setCars] = useState([]);
  const { favoriler, toggleFavori } = useFavori();
  const navigation = useNavigation();

  const { username, setUsername, role, setRole } = useUser();
  const [inputName, setInputName] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  useEffect(() => {
    const getCars = async () => {
      const carList = await fetchCars();
      setCars(carList);
    };
    getCars();
  }, []);

  // Giriş kontrolü
  const handleUserLogin = () => {
    if (!inputName.trim() || !inputPassword.trim()) {
      Alert.alert("Hata", "Lütfen kullanıcı adı ve şifre giriniz!");
      return;
    }
    setUsername(inputName.trim());
    setRole("user");
  };

  // Çıkış yap
  const handleLogout = () => {
    setUsername("");
    setRole(null);
  };

  // Login ekranı
  if (!role) {
    return (
      <View style={styles.loginContainer}>
        {/* Admin Giriş İkonu */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.adminIconButton}
            onPress={() => navigation.navigate("AdminLogin")}
          >
            <Ionicons name="shield-outline" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.adminIconLabel}>Admin Girişi</Text>
        </View>

        <View style={styles.loginCard}>
          <Text style={styles.loginTitle}>Kullanıcı Girişi</Text>

          <Text style={styles.loginLabel}>Kullanıcı Adı</Text>
          <TextInput
            value={inputName}
            onChangeText={setInputName}
            placeholder="Kullanıcı adı"
            style={styles.input}
            placeholderTextColor="#888"
          />

          <Text style={styles.loginLabel}>Şifre</Text>
          <TextInput
            value={inputPassword}
            onChangeText={setInputPassword}
            placeholder="Şifre"
            style={styles.input}
            placeholderTextColor="#888"
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleUserLogin}
          >
            <Text style={styles.loginButtonText}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Ana ekran
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Kiralık Araç Modelleri</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      <Text style={styles.usernameLabel}>
        Giriş: {username} ({role})
      </Text>

      {cars.length > 0 ? (
        <FlatList
          data={cars}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CarCard
              car={item}
              isFavorite={favoriler.some((fav) => fav.id === item.id)}
              onToggleFavorite={() => toggleFavori(item)}
            />
          )}
        />
      ) : (
        <Text style={styles.loading}>Araçlar yükleniyor...</Text>
      )}
    </View>
  );
};

export default Home;
