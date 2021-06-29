import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";

import { styles } from "./styles";

import { ListDivider } from "../../components/ListDivider";
import { Loading } from "../../components/Loading";
import { Guild, GuildProps } from "../../components/Guild";

import { api } from "../../services/api";

type Props = {
  handleGuildSelect: (guild: GuildProps) => void;
};

export function Guilds({ handleGuildSelect }: Props) {
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchGuilds() {
    const response = await api.get("/users/@me/guilds");
    setGuilds(response.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchGuilds();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={guilds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Guild data={item} onPress={() => handleGuildSelect(item)} />
        )}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
        ListHeaderComponent={() => <ListDivider isCentered />}
        contentContainerStyle={{
          paddingTop: 103,
          paddingBottom: 69,
        }}
        showsVerticalScrollIndicator={false}
        style={styles.guilds}
      />
    </View>
  );
}
