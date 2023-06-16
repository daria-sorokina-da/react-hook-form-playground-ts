import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldErrors,
  FieldName,
  FieldPath,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";

type Props<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues, any>;
};
export declare type FieldValuesFromFieldErrors<TFieldErrors> =
  TFieldErrors extends FieldErrors<infer TFieldValues> ? TFieldValues : never;

type FullNameFieldsProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;
};

const FullNameFields = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  field: { onChange, onBlur, value, name, ref },
  formState: { errors },
}: FullNameFieldsProps<TFieldValues, TName>) => {
  type FullName = {
    first: string | undefined;
    last: string | undefined;
  };
  const [fullName, setFullName] = useState<FullName>(value);

  const updateFirst = (newFirst: string | undefined) => {
    setFullName((prevState) => ({
      ...prevState,
      first: newFirst,
    }));
  };

  const updateLast = (newLast: string | undefined) => {
    setFullName((prevState) => ({
      ...prevState,
      last: newLast,
    }));
  };

  useEffect(() => {
    onChange(fullName);
  }, [fullName]);

  return (
    <div>
      <input
        value={value.first}
        onChange={(e) => updateFirst(e.target.value)}
        onBlur={onBlur}
      />
      <ErrorMessage
        errors={errors}
        name={
          `${name}.first` as unknown as FieldName<
            FieldValuesFromFieldErrors<FieldErrors<TFieldValues>>
          >
        }
        render={({ message }) => <p>{message}</p>}
      />
      <input
        value={value.last}
        onChange={(e) => updateLast(e.target.value)}
        onBlur={onBlur}
      />
      <ErrorMessage
        errors={errors}
        name={
          `${name}.last` as unknown as FieldName<
            FieldValuesFromFieldErrors<FieldErrors<TFieldValues>>
          >
        }
        render={({ message }) => <p>{message}</p>}
      />
    </div>
  );
};

const FullName = <TFieldValues extends FieldValues>({
  name,
  control,
}: Props<TFieldValues>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState, formState }) => (
      <FullNameFields
        field={field}
        fieldState={fieldState}
        formState={formState}
      />
    )}
  />
);
export default FullName;
