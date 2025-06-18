import React, { createContext, useContext, useState } from "react";

const FavoriContext = createContext();

export function FavoriProvider({ children }) {
  const [favoriler, setFavoriler] = useState([]);

  // Favoriye ekle/çıkar
  const toggleFavori = (car) => {
    setFavoriler((prev) =>
      prev.some(item => item.id === car.id)
        ? prev.filter(item => item.id !== car.id)
        : [...prev, car]
    );
  };

  // Favoriden kaldırma (çarpı için)
  const removeFavori = (id) => {
    setFavoriler((prev) => prev.filter(item => item.id !== id));
  };

  return (
    <FavoriContext.Provider value={{ favoriler, toggleFavori, removeFavori }}>
      {children}
    </FavoriContext.Provider>
  );
}

export function useFavori() {
  return useContext(FavoriContext);
}
