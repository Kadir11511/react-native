import React from "react";


import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import styles from "./CarCardStyles";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';

const CarCard = ({ car, isFavorite, isRented, onToggleFavorite }) => {
  const navigation = useNavigation();

  const handleRent = () => {
    navigation.navigate("Araç Kiralama", { car });
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: car.AracImage }} style={styles.image} />
      
      {/* Üst sağda kalp/favori */}
      <TouchableOpacity
        style={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}
        onPress={() => onToggleFavorite(car.id)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <FontAwesome
          name={isFavorite ? "heart" : "heart-o"}
          size={24}
          color={isFavorite ? "red" : "gray"}
        />
      </TouchableOpacity>

      <Text style={styles.carTitle}>{car.Baslik}</Text>
      <Text style={styles.carDesc}>{car.Aciklama}</Text>
      <Text style={styles.price}>Fiyat: {car.Fiyat} TL</Text>
      
      {/* Kiralandı rozeti veya Kirala butonu */}
      {isRented ? (
        <View style={[styles.rentedBadge, {marginTop: 8}]}>
          <Text style={{ color: "#fff" }}>Kiralandı</Text>
        </View>
      ) : (
        <Button title="Kirala" onPress={handleRent} />
      )}
    </View>
  );
};

export default CarCard;
