import type { PasswordInputProps } from "@mantine/core";
import type { Except } from "type-fest";

import { PasswordInput } from "@mantine/core";

import { useFieldContext } from "../context";

export interface PasswordFieldProps extends Except<PasswordInputProps, "value" | "error" | "onBlur" | "onChange"> {
}

export function PasswordField(props: PasswordFieldProps) {
  const {
    state,
    handleBlur,
    handleChange,
  } = useFieldContext<string>();

  return (
    <PasswordInput
      {...props}
      error={state.meta.errors.map(error => error.message).join(", ")}
      value={state.value}
      onBlur={handleBlur}
      onChange={event => handleChange(event.target.value)}
    />
  );
}
