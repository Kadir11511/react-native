import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function AdminLogin({ navigation }) {
  const [username, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { setUsername, setRole } = useUser();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Lütfen kullanıcı adı ve şifre giriniz!");
      return;
    }

    try {
      const adminRef = doc(db, "UserDb", username.trim());
      const adminSnap = await getDoc(adminRef);

      if (adminSnap.exists()) {
        const adminData = adminSnap.data();
        if (adminData.password === password.trim()) {
          if (adminData.role === "admin") {
            setError("");
            setUsername(adminData.username);
            setRole("admin");
            Alert.alert("Başarılı", "Admin girişi başarılı!");
            navigation?.replace?.("AdminPanel");
          } else {
            setError("Bu kullanıcı admin değil!");
          }
        } else {
          setError("Şifre yanlış!");
        }
      } else {
        setError("Admin bulunamadı!");
      }
    } catch (err) {
      console.error(err);
      setError("Bir hata oluştu, tekrar deneyin!");
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="person-circle-outline"
        size={64}
        color="#263859"
        style={{ alignSelf: "center", marginBottom: 8 }}
      />
      <Text style={styles.title}>Admin Paneli Girişi</Text>
      <Text style={styles.infoText}>
        Lütfen yönetici bilgileriniz ile giriş yapınız.
      </Text>

      <Text style={styles.label}>Kullanıcı Adı</Text>
      <TextInput
        style={styles.input}
        placeholder="Admin kullanıcı adı"
        value={username}
        onChangeText={setUsernameInput}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Text style={styles.label}>Şifre</Text>
      <View style={styles.passwordBox}>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="#888"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 32,
    backgroundColor: "#f6f8fa",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#263859",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 1,
  },
  infoText: {
    color: "#555",
    fontSize: 15,
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    color: "#222e50",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#b2bec3",
    borderRadius: 12,
    padding: 13,
    marginBottom: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#b2bec3",
    borderRadius: 12,
    marginBottom: 14,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#263859",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#263859",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  error: {
    color: "#e74c3c",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 15,
  },
});
