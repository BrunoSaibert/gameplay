import React from "react";
import { TouchableOpacity, Text, Image, View } from "react-native";

import DiscordImage from "../../assets/discord.png";
import { styles } from "./styles";

interface Props {
  title: string;
}

export function ButtonIcon({ title }: Props) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <View style={styles.iconWrapper}>
        <Image source={DiscordImage} style={styles.icon} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
