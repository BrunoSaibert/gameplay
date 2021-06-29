import React from "react";

import { Text } from "react-native";

import { styles } from "./styles";

type Props = {
  children: string;
};

export function Error({ children }: Props) {
  return <Text style={styles.container}>{children}</Text>;
}
