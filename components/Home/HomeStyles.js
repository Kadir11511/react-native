import { StyleSheet, Platform, StatusBar } from "react-native";

const DARK_BLUE = "#162447";
const BLUE = "#1f4068";
const LIGHT_BLUE = "#eaefff";
const WHITE = "#ffffff";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_BLUE,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 50,
  },

  // Üst Bar - FLEX YAPISI
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  adminIconButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },

  adminIconLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: DARK_BLUE,
    textAlign: "center",
    flex: 1,
  },

  loading: {
    textAlign: "center",
    fontSize: 18,
    color: "#444",
    marginTop: 24,
    fontStyle: "italic",
  },

  usernameLabel: {
    color: "#555",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 10,
  },

  // LOGIN EKRANI
  loginContainer: {
    flex: 1,
    backgroundColor: LIGHT_BLUE,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  loginCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  loginTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: DARK_BLUE,
    textAlign: "center",
    marginBottom: 20,
  },

  loginLabel: {
    fontSize: 15,
    marginBottom: 6,
    color: DARK_BLUE,
    fontWeight: "600",
  },

  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 18,
    backgroundColor: "#f9faff",
    fontSize: 16,
    color: "#333",
  },

  loginButton: {
    backgroundColor: DARK_BLUE,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 0.8,
  },
});
