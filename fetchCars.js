const fetchCars = async () => {
  try {
    console.log("Veri çekme fonksiyonu çalıştı!");
    
    const response = await fetch("https://getaraclar-ghuenigpsq-uc.a.run.app");
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const cars = await response.json();
    console.log("Araçlar:", cars);
    return cars;
    
  } catch (error) {
    console.error("API'den veri çekme hatası:", error);
    return [];
  }
};

export default fetchCars;
