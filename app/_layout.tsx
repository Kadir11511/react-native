import { Stack } from "expo-router";
import { KiralamaProvider } from "../context/KiralamaContext";
import { FavoriProvider } from "../context/FavoriContext";
import { UserProvider } from "../context/UserContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <FavoriProvider>
        <KiralamaProvider>
          <Stack
            screenOptions={{ headerShown: false }}
            // initialRouteName kaldırabilirsin, Stack zaten otomatik olarak index.js'i ana sayfa yapar
          />
        </KiralamaProvider>
      </FavoriProvider>
    </UserProvider>
  );
}
