import { StyleSheet } from "react-native";

import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 24,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    fontFamily: theme.fonts.title700,
    fontSize: 18,
    color: theme.colors.heading,
  },
  category: {
    fontFamily: theme.fonts.text400,
    fontSize: 13,
    color: theme.colors.highlight,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontFamily: theme.fonts.text500,
    fontSize: 13,
    color: theme.colors.heading,
    marginLeft: 7,
  },
  playerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  player: {
    fontFamily: theme.fonts.text500,
    fontSize: 13,
    marginLeft: 7,
  },
});
