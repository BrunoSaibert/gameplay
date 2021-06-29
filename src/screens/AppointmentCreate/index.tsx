import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import {
  Text,
  View,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { isValid } from "date-fns";

import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { theme } from "../../global/styles/theme";
import { styles } from "./styles";

import { Error } from "../../components/Error";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { GuildProps } from "../../components/Guild";
import { TextArea } from "../../components/TextArea";
import { ModalView } from "../../components/ModalView";
import { GuildIcon } from "../../components/GuildIcon";
import { SmallInput } from "../../components/SmallInput";
import { Background } from "../../components/Background";
import { CategorySelect } from "../../components/CategorySelect";

import { Guilds } from "../Guilds";

interface FormData {
  description: string;
  day: number;
  month: number;
  hour: number;
  minute: number;
}

const schema = Yup.object().shape({
  description: Yup.string().required("Descrição é obrigatório"),
  day: Yup.number()
    .typeError("Informe um valor")
    .positive("O valor não pode ser negativo")
    .required("Dia é obrigatório")
    .min(1, "Dia inválido")
    .max(31, "Dia inválido"),
  month: Yup.number()
    .typeError("Informe um valor")
    .positive("O valor não pode ser negativo")
    .required("Mês é obrigatório")
    .min(1, "Mês inválido")
    .max(12, "Mês inválido"),
  hour: Yup.number()
    .typeError("Informe um valor")
    .positive("O valor não pode ser negativo")
    .required("Hora é obrigatório")
    .min(0, "Hora inválida")
    .max(23, "Hora inválida"),
  minute: Yup.number()
    .typeError("Informe um valor")
    .positive("O valor não pode ser negativo")
    .required("Minuto é obrigatório")
    .min(0, "Minuto inválido")
    .max(59, "Minuto inválido"),
});

function formatNumber(number: number) {
  return number.toString().padStart(2, "0");
}

export function AppointmentCreate() {
  const [category, setCategory] = useState("");
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation();

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  function handleOpenGuilds() {
    setOpenGuildsModal(true);
  }

  function handleCloseGuilds() {
    setOpenGuildsModal(false);
  }

  function handleGuildSelect(guildSelect: GuildProps) {
    setGuild(guildSelect);
    setOpenGuildsModal(false);
  }

  async function handleSave(form: FormData) {
    const date = new Date(
      `${new Date().getFullYear()}-${formatNumber(form.month)}-${formatNumber(
        form.day
      )}`
    );

    if (!category) {
      return Alert.alert("Selecione uma categoria");
    }

    if (!guild.id) {
      return Alert.alert("Selecione um servidor");
    }

    if (!isValid(date)) {
      return Alert.alert("Data inválida");
    }

    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${formatNumber(form.day)}/${formatNumber(
        form.month
      )} às ${formatNumber(form.hour)}:${formatNumber(form.minute)}h`,
      description: form.description,
    };

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment])
    );

    navigation.navigate("Home");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Background>
        <Header title="Agendar partida" />
        <ScrollView>
          <Text
            style={[
              styles.label,
              {
                paddingHorizontal: 24,
                marginTop: 36,
              },
            ]}
          >
            Categotia
          </Text>
          <CategorySelect
            hasCheckBox
            categorySelected={category}
            setCategory={handleCategorySelect}
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>
              <View style={styles.select}>
                {guild.id ? (
                  <GuildIcon guidId={guild.id} iconId={guild.icon} />
                ) : (
                  <View style={styles.image} />
                )}

                <View style={styles.selectBody}>
                  <Text style={[styles.label, { marginBottom: 0 }]}>
                    {guild.name ? guild.name : "Selecione um servidor"}
                  </Text>
                </View>

                <Feather
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>

            <View style={styles.fild}>
              <View>
                <Text style={styles.label}>Dia e mês</Text>
                <View style={styles.column}>
                  <SmallInput maxLength={2} name="day" control={control} />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput maxLength={2} name="month" control={control} />
                </View>
              </View>

              <View>
                <Text style={styles.label}>Hora e minuto</Text>
                <View style={styles.column}>
                  <SmallInput maxLength={2} name="hour" control={control} />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput maxLength={2} name="minute" control={control} />
                </View>
              </View>
            </View>

            <View style={styles.fildErrors}>
              <View>
                {errors.day && <Error>{errors.day.message}</Error>}
                {errors.month && <Error>{errors.month.message}</Error>}
              </View>
              <View>
                {errors.hour && <Error>{errors.hour.message}</Error>}
                {errors.minute && <Error>{errors.minute.message}</Error>}
              </View>
            </View>

            <View style={styles.fild}>
              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.caracteresLimit}>Max 100 caracteres</Text>
            </View>
            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              name="description"
              control={control}
            />
            {errors.description && <Error>{errors.description.message}</Error>}
          </View>
          <View style={styles.footer}>
            <Button
              title="Agendar"
              activeOpacity={0.8}
              onPress={handleSubmit(handleSave)}
            />
          </View>
        </ScrollView>
      </Background>

      <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}
