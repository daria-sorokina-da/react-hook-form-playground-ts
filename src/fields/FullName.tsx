import {
  ErrorMessage,
  FieldValuesFromFieldErrors,
} from "@hookform/error-message";
import { useEffect, useState } from "react";
import {
  Controller,
  FieldErrors,
  FieldName,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { CustomFormFieldInternalProps, CustomFormFieldProps } from "./types";

const FullNameFields = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  field: { onChange, onBlur, value, name, ref },
  formState: { errors },
}: CustomFormFieldInternalProps<TFieldValues, TName>) => {
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
      <label htmlFor={`${name}.first`}>First Name (required if email is req@email.com)</label>
      <input
        id={`${name}.first`}
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
      <label htmlFor={`${name}.last`}>Last Name (required if first name is req)</label>
      <input
        id={`${name}.last`}
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
}: CustomFormFieldProps<TFieldValues>) => (
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
