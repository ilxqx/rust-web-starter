import type { TextInputProps } from "@mantine/core";
import type { Except } from "type-fest";

import { TextInput } from "@mantine/core";

import { useFieldContext } from "../context";

export interface TextFieldProps extends Except<TextInputProps, "value" | "error" | "onBlur" | "onChange"> {
}

export function TextField(props: TextFieldProps) {
  const {
    state,
    handleBlur,
    handleChange,
  } = useFieldContext<string>();
  return (
    <TextInput
      {...props}
      error={state.meta.errors.map(error => error.message).join(", ")}
      value={state.value}
      onBlur={handleBlur}
      onChange={event => handleChange(event.target.value)}
    />
  );
}
