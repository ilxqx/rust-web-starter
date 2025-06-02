import type { DetailedHTMLProps, FormEvent, FormHTMLAttributes } from "react";

import { isFunction } from "radashi";
import { useMemo } from "react";

export interface FormProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
}

export function Form({
  onSubmit,
  onSubmitCapture,
  children,
  ...restProps
}: FormProps) {
  const submitHandler = useMemo(() => {
    if (isFunction(onSubmit)) {
      return (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(event);
      };
    }
  }, [onSubmit]);
  const submitCaptureHandler = useMemo(() => {
    if (isFunction(onSubmitCapture)) {
      return (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmitCapture(event);
      };
    }
  }, [onSubmitCapture]);

  return (
    <form {...restProps} onSubmit={submitHandler} onSubmitCapture={submitCaptureHandler}>
      {children}
    </form>
  );
}
