import { Control, ControllerFieldState, ControllerRenderProps, FieldPath, FieldValues, UseFormStateReturn } from "react-hook-form";

export type CustomFormFieldProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues, any>;
};

export type CustomFormFieldInternalProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;
};
