import { createFormHookContexts } from "@tanstack/react-form";

const {
  formContext,
  fieldContext,
  useFormContext,
  useFieldContext,
} = createFormHookContexts();

export {
  fieldContext,
  formContext,
  useFieldContext,
  useFormContext,
};
