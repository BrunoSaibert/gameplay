import { StyleSheet } from "react-native";

import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    width: 104,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginRight: 8,
  },
  content: {
    width: 100,
    height: 116,
    borderRadius: 8,
    backgroundColor: theme.colors.secondary40,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 7,
  },
  check: {
    width: 12,
    height: 12,
    backgroundColor: theme.colors.secondary100,
    alignSelf: "flex-end",
    marginRight: 7,
    borderColor: theme.colors.secondary50,
    borderWidth: 2,
    borderRadius: 3,
  },
  checked: {
    width: 10,
    height: 10,
    backgroundColor: theme.colors.primary,
    alignSelf: "flex-end",
    marginRight: 7,
    borderRadius: 3,
  },
  title: {
    fontFamily: theme.fonts.text500,
    fontSize: 15,
    color: theme.colors.heading,
  },
});
