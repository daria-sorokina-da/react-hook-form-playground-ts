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
  formState,
  fieldState,
}: CustomFormFieldInternalProps<TFieldValues, TName>) => {
  type FullName = {
    first: string | undefined;
    last: string | undefined;
  };
  type FullNameTouched = {
    [field in keyof FullName]: boolean;
  };
  const [fullName, setFullName] = useState<FullName>(value);
  const [touched, setTouched] = useState<FullNameTouched>({
    first: false,
    last: false,
  });

  const updateFirst = (newFirst: string | undefined) => {
    setTouched((prevState) => ({ ...prevState, first: true }));
    setFullName((prevState) => ({
      ...prevState,
      first: newFirst,
    }));
  };

  const updateLast = (newLast: string | undefined) => {
    setTouched((prevState) => ({ ...prevState, last: true }));
    setFullName((prevState) => ({
      ...prevState,
      last: newLast,
    }));
  };

  const onFieldBlur = (fieldName: keyof FullName) => {
    setTouched((prevState) => ({ ...prevState, [fieldName]: true }));
    onBlur();
  };

  useEffect(() => {
    onChange(fullName);
  }, [fullName]);

  console.log("FullName formState", formState);
  console.log("FullName fieldState", fieldState);
  console.log("FullName touched", touched);

  const shouldShowError = (fieldName: keyof FullName) =>
    formState.isSubmitted || touched[fieldName];

  return (
    <div>
      <label htmlFor={`${name}.first`}>First Name (required)</label>
      <input
        id={`${name}.first`}
        value={value.first}
        onChange={(e) => updateFirst(e.target.value)}
        onBlur={() => onFieldBlur('first')}
      />
      {shouldShowError("first") && (
        <ErrorMessage
          errors={formState.errors}
          name={
            `${name}.first` as unknown as FieldName<
              FieldValuesFromFieldErrors<FieldErrors<TFieldValues>>
            >
          }
          render={({ message }) => <p>{message}</p>}
        />
      )}
      <label htmlFor={`${name}.last`}>Last Name (required)</label>
      <input
        id={`${name}.last`}
        value={value.last}
        onChange={(e) => updateLast(e.target.value)}
        onBlur={() => onFieldBlur('last')}
      />
      {shouldShowError("last") && (
        <ErrorMessage
          errors={formState.errors}
          name={
            `${name}.last` as unknown as FieldName<
              FieldValuesFromFieldErrors<FieldErrors<TFieldValues>>
            >
          }
          render={({ message }) => <p>{message}</p>}
        />
      )}
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
