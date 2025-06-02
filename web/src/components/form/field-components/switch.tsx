import type { SwitchProps } from "@mantine/core";
import type { Except } from "type-fest";

import { Switch } from "@mantine/core";

import { useFieldContext } from "..";

export interface SwitchFieldProps extends Except<SwitchProps, "checked" | "error" | "onBlur" | "onChange"> {
}

export function SwitchField(props: SwitchFieldProps) {
  const {
    state,
    handleBlur,
    handleChange,
  } = useFieldContext<boolean>();

  return (
    <Switch
      {...props}
      checked={state.value}
      error={state.meta.errors.map(error => error.message).join(", ")}
      onBlur={handleBlur}
      onChange={event => handleChange(event.target.checked)}
    />
  );
}
