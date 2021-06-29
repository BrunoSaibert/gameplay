import React from "react";
import { Alert, Text, View } from "react-native";
import { useAuth } from "../../hooks/auth";
import { RectButton } from "react-native-gesture-handler";

import { Avatar } from "../Avatar";

import { styles } from "./styles";

export function Profile() {
  const { user, welcomeMessage, signOut } = useAuth();

  function handleSignOut() {
    Alert.alert("Logout", "Deseja sair do GamePlay?", [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        onPress: () => {
          signOut();
        },
        style: "cancel",
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <RectButton onPress={handleSignOut}>
        <Avatar urlImage={user.avatar} />
      </RectButton>

      <View style={{}}>
        <View style={styles.user}>
          <Text style={styles.greeting}>Olá,</Text>
          <Text style={styles.username}>{user.firstName}</Text>
        </View>

        <Text style={styles.message}>{welcomeMessage}</Text>
      </View>
    </View>
  );
}
