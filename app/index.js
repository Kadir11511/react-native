import AppRouter from "../navigation/AppRouter";
import { FavoriProvider } from "../context/FavoriContext";      // 🔴 EKLENDİ
import { KiralamaProvider } from "../context/KiralamaContext";  // 🔴 EKLENDİ

export default function Page() {
  return (
    <FavoriProvider>
      <KiralamaProvider>
        <AppRouter />
      </KiralamaProvider>
    </FavoriProvider>
  );
}
