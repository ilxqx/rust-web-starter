import { createFormHook } from "@tanstack/react-form";

import { fieldContext, formContext } from "./context";
import { fieldComponents } from "./field-components";
import { formComponents } from "./form-components";

export { Form } from "./form-components";

const { useAppForm, withForm } = createFormHook({
  formContext,
  fieldContext,
  fieldComponents,
  formComponents,
});

export {
  useAppForm,
  withForm,
};
