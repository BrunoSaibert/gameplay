import { StyleSheet } from "react-native";

import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },
  image: {
    width: "100%",
    height: 360,
  },
  content: {
    marginTop: -40,
    paddingHorizontal: 50,
  },
  title: {
    color: theme.colors.heading,
    textAlign: "center",
    fontSize: 40,
    lineHeight: 40,
    marginBottom: 16,
  },
  subtitle: {
    color: theme.colors.heading,
    textAlign: "center",
    fontSize: 15,
    lineHeight: 25,
    marginBottom: 64,
  },
});
