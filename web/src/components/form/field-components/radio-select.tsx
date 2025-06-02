import type { RadioGroupProps } from "@mantine/core";
import type { Except } from "type-fest";

import { Radio } from "@mantine/core";

import { useFieldContext } from "..";

export interface RadioSelectProps extends Except<RadioGroupProps, "value" | "error" | "onBlur" | "onChange"> {
}

export function RadioSelectField(props: RadioSelectProps) {
  const {
    state,
    handleBlur,
    handleChange,
  } = useFieldContext<string>();

  return (
    <Radio.Group
      {...props}
      error={state.meta.errors.map(error => error.message).join(", ")}
      value={state.value}
      onBlur={handleBlur}
      onChange={value => handleChange(value)}
    />
  );
}
