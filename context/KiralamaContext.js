import React, { createContext, useContext, useState } from "react";

const KiralamaContext = createContext();

export function KiralamaProvider({ children }) {
  const [bekleyenKiralamalar, setBekleyenKiralamalar] = useState([]);
  const [onaylanmisKiralamalar, setOnaylanmisKiralamalar] = useState([]);

  const addBekleyenKiralama = (kiralama) => {
    setBekleyenKiralamalar(prev => [...prev, kiralama]);
  };

  const onaylaKiralama = (id) => {
    setBekleyenKiralamalar(prev => prev.filter(k => k.id !== id));
    const onaylanan = bekleyenKiralamalar.find(k => k.id === id);
    if (onaylanan) setOnaylanmisKiralamalar(prev => [...prev, onaylanan]);
  };

  return (
    <KiralamaContext.Provider value={{
      bekleyenKiralamalar,
      onaylanmisKiralamalar,
      addBekleyenKiralama,
      onaylaKiralama,
      setBekleyenKiralamalar,
      kiralamalar: onaylanmisKiralamalar // Bunu ekledik!
    }}>
      {children}
    </KiralamaContext.Provider>
  );
}

export function useKiralama() {
  return useContext(KiralamaContext);
}
