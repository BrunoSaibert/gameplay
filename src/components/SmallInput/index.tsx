import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { Control, Controller } from "react-hook-form";

import { styles } from "./styles";

interface Props extends TextInputProps {
  control: Control;
  name: string;
}

export function SmallInput({ control, name, ...rest }: Props) {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextInput
          style={styles.container}
          onChangeText={onChange}
          value={value}
          keyboardType="numeric"
          {...rest}
        />
      )}
      name={name}
    />
  );
}
