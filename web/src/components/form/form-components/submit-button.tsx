import type { ButtonProps } from "@mantine/core";

import { Button } from "@mantine/core";

import { useFormContext } from "../context";

export interface SubmitButtonProps extends Omit<ButtonProps, "disabled" | "loading" | "type"> {
}

export function SubmitButton(props: SubmitButtonProps) {
  const { Subscribe } = useFormContext();

  return (
    <Subscribe selector={state => [!state.canSubmit, state.isSubmitting]}>
      {
        ([disabled, loading]) => (
          <Button
            disabled={disabled}
            loading={loading}
            type="submit"
            {...props}
          />
        )
      }
    </Subscribe>
  );
}
