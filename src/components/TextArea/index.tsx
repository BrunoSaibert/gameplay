import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { Control, Controller } from "react-hook-form";

import { styles } from "./styles";

import { Error } from "../Error";

interface Props extends TextInputProps {
  control: Control;
  name: string;
}

export function TextArea({ control, name, ...rest }: Props) {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextInput
          style={styles.container}
          onChangeText={onChange}
          value={value}
          {...rest}
        />
      )}
      name={name}
    />
  );
}
