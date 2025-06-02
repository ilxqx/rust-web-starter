import type { DatePickerInputProps } from "@mantine/dates";
import type { Except } from "type-fest";

import { DatePickerInput } from "@mantine/dates";

import { useFieldContext } from "..";

export interface DatePickerFieldProps extends Except<DatePickerInputProps, "value" | "error" | "onBlur" | "onChange"> {
}

export function DatePickerField(props: DatePickerFieldProps) {
  const {
    state,
    handleBlur,
    handleChange,
  } = useFieldContext<string>();

  return (
    <DatePickerInput
      {...props}
      error={state.meta.errors.map(error => error.message).join(", ")}
      value={state.value}
      valueFormat="YYYY-MM-DD"
      onBlur={handleBlur}
      onChange={value => handleChange(value as string)}
    />
  );
}
