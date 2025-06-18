import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useKiralama } from "../context/KiralamaContext";
import { useUser } from "../context/UserContext"; // EKLENDİ

const TESLIM_NOKTALARI = [
  "Ankara Esenboğa Havalimanı",
  "AŞTİ Otogar",
  "Kızılay Meydanı",
  "Çankaya"
];
const SIGORTA_SECENEKLERI = [
  "Standart Sigorta",
  "Tam Kapsamlı Sigorta (+100 TL)"
];
const ODEME_YONTEMLERI = [
  "Nakit",
  "Kredi Kartı",
  "Banka Havalesi"
];
const EKSTRA_HIZMETLER = [
  { label: "Bebek Koltuğu (+50 TL)", value: "bebek", price: 50 },
  { label: "Navigasyon (+40 TL)", value: "navigasyon", price: 40 },
  { label: "Ek Sürücü (+75 TL)", value: "ek_sürücü", price: 75 }
];

const AracKiralama = ({ route, navigation }) => {
  const { car } = route.params;
  const { addBekleyenKiralama } = useKiralama();
  const { username } = useUser(); // EKLENDİ

  const [baslangicTarihi, setBaslangicTarihi] = useState(new Date());
  const [bitisTarihi, setBitisTarihi] = useState(new Date());
  const [showBaslangic, setShowBaslangic] = useState(false);
  const [showBitis, setShowBitis] = useState(false);
  const [alisSaati, setAlisSaati] = useState(new Date());
  const [iadeSaati, setIadeSaati] = useState(new Date());
  const [showAlisSaat, setShowAlisSaat] = useState(false);
  const [showIadeSaat, setShowIadeSaat] = useState(false);

  const [teslimNoktasi, setTeslimNoktasi] = useState(TESLIM_NOKTALARI[0]);
  const [sigorta, setSigorta] = useState(SIGORTA_SECENEKLERI[0]);
  const [odemeYontemi, setOdemeYontemi] = useState(ODEME_YONTEMLERI[0]);
  const [ekstraHizmetler, setEkstraHizmetler] = useState([]);
  const [notlar, setNotlar] = useState("");

  const gunSayisi = Math.max(
    1,
    Math.ceil((bitisTarihi - baslangicTarihi) / (1000 * 60 * 60 * 24))
  );
  const ekstraUcret = ekstraHizmetler.reduce((toplam, item) => {
    const bul = EKSTRA_HIZMETLER.find(i => i.value === item);
    return toplam + (bul ? bul.price : 0);
  }, 0);

  // --- Kampanya: SUV araçlarda %10 indirim! ---
  let fiyat = parseInt(car.Fiyat, 10);
  let indirimliFiyat = fiyat;
  if (car.Kategori && car.Kategori.toLowerCase().includes("suv")) {
    indirimliFiyat = fiyat * 0.9;
  }
  const toplamUcret = gunSayisi * indirimliFiyat + ekstraUcret;
  // --------------------------------------------

  const handleEkstraSec = value => {
    setEkstraHizmetler(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const formatDate = date =>
    `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

  const formatTime = date =>
    date
      .toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });

  // SADECE BURASI DEĞİŞTİ!
  const handleSubmit = () => {
    const yeniKiralama = {
      id: Date.now().toString(),
      name: car.Baslik,
      tarih: `${formatDate(baslangicTarihi)} - ${formatDate(bitisTarihi)}`,
      gunSayisi: gunSayisi,
      toplamUcret: toplamUcret,
      teslimNoktasi,
      sigorta,
      odemeYontemi,
      ekstraHizmetler: [...ekstraHizmetler],
      notlar,
      user: username // EKLENDİ
    };
    addBekleyenKiralama(yeniKiralama);
    Alert.alert("Başarılı!", "Kiralama talebiniz gönderildi!");
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.title}>{car.Baslik} Kiralama Formu</Text>
      <Text style={styles.label}>Başlangıç Tarihi</Text>
      <TouchableOpacity onPress={() => setShowBaslangic(true)} style={styles.input}>
        <Text>{formatDate(baslangicTarihi)}</Text>
      </TouchableOpacity>
      {showBaslangic && (
        <DateTimePicker
          value={baslangicTarihi}
          mode="date"
          display="default"
          onChange={(_, date) => {
            setShowBaslangic(false);
            if (date) setBaslangicTarihi(date);
          }}
        />
      )}
      <Text style={styles.label}>Bitiş Tarihi</Text>
      <TouchableOpacity onPress={() => setShowBitis(true)} style={styles.input}>
        <Text>{formatDate(bitisTarihi)}</Text>
      </TouchableOpacity>
      {showBitis && (
        <DateTimePicker
          value={bitisTarihi}
          mode="date"
          display="default"
          onChange={(_, date) => {
            setShowBitis(false);
            if (date) setBitisTarihi(date);
          }}
        />
      )}
      <Text style={styles.label}>Alış Saati</Text>
      <TouchableOpacity onPress={() => setShowAlisSaat(true)} style={styles.input}>
        <Text>{formatTime(alisSaati)}</Text>
      </TouchableOpacity>
      {showAlisSaat && (
        <DateTimePicker
          value={alisSaati}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(_, date) => {
            setShowAlisSaat(false);
            if (date) setAlisSaati(date);
          }}
        />
      )}
      <Text style={styles.label}>İade Saati</Text>
      <TouchableOpacity onPress={() => setShowIadeSaat(true)} style={styles.input}>
        <Text>{formatTime(iadeSaati)}</Text>
      </TouchableOpacity>
      {showIadeSaat && (
        <DateTimePicker
          value={iadeSaati}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(_, date) => {
            setShowIadeSaat(false);
            if (date) setIadeSaati(date);
          }}
        />
      )}
      <Text style={styles.label}>Araç Teslim Noktası</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={teslimNoktasi}
          onValueChange={setTeslimNoktasi}
          style={{ color: "#111", backgroundColor: "#e5e5e5" }}
          dropdownIconColor="#007bff"
        >
          {TESLIM_NOKTALARI.map(option => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Ekstra Hizmetler</Text>
      <View style={styles.extraServices}>
        {EKSTRA_HIZMETLER.map(item => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.extraServiceButton,
              ekstraHizmetler.includes(item.value) && styles.extraServiceButtonSelected
            ]}
            onPress={() => handleEkstraSec(item.value)}
          >
            <Text style={[
              styles.extraServiceText,
              ekstraHizmetler.includes(item.value) && styles.extraServiceTextSelected
            ]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Sigorta Seçeneği</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={sigorta}
          onValueChange={setSigorta}
          style={{ color: "#111", backgroundColor: "#e5e5e5" }}
          dropdownIconColor="#007bff"
        >
          {SIGORTA_SECENEKLERI.map(option => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Ödeme Yöntemi</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={odemeYontemi}
          onValueChange={setOdemeYontemi}
          style={{ color: "#111", backgroundColor: "#e5e5e5" }}
          dropdownIconColor="#007bff"
        >
          {ODEME_YONTEMLERI.map(option => (
            <Picker.Item label={option} value={option} key={option} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Özel Notlarınız</Text>
      <TextInput
        style={[styles.input, { height: 60 }]}
        placeholder="Not eklemek için buraya dokunun"
        value={notlar}
        onChangeText={setNotlar}
        multiline
      />
      <Text style={styles.price}>
        Toplam Ücret: {toplamUcret} TL ({gunSayisi} gün)
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Kiralama Talebi Gönder</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7fa", padding: 15 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16, marginTop: 10, textAlign: "center" },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 13,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "#f5f6fa",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "#e5e5e5",
    paddingHorizontal: 6,
  },
  extraServices: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
    gap: 10,
  },
  extraServiceButton: {
    borderWidth: 2,
    borderColor: "#007bff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "#fff"
  },
  extraServiceButtonSelected: {
    backgroundColor: "#007bff",
    borderColor: "#0056b3"
  },
  extraServiceText: {
    color: "#007bff",
    fontWeight: "bold"
  },
  extraServiceTextSelected: {
    color: "#fff"
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#007bff"
  },
  button: {
    backgroundColor: "#007bff",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 18
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default AracKiralama;
