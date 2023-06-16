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

const YesNoCheckboxesFields = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  field: { onChange, onBlur, value, name, ref },
  formState: { errors },
}: CustomFormFieldInternalProps<TFieldValues, TName>) => {
  const [yesNo, setYesNo] = useState<boolean | undefined>(value);

  const updateYes = (newYesChecked: boolean) => {
    setYesNo(newYesChecked ? true : undefined);
  };

  const updateNo= (newNoChecked: boolean) => {
    setYesNo(newNoChecked ? false : undefined);
  };

  useEffect(() => {
    onChange(yesNo);
  }, [yesNo]);

  return (
    <div>
      <span>Do you have pets? (required when first name is req)</span>
      <label htmlFor={`${name}.yes`}>Yes</label>
      <input
        type="checkbox"
        id={`${name}.yes`}
        checked={value === true}
        onChange={(e) => updateYes(e.target.checked)}
        onBlur={onBlur}
      />
      <label htmlFor={`${name}.no`}>No</label>
      <input
        type="checkbox"
        id={`${name}.no`}
        checked={value === false}
        onChange={(e) => updateNo(e.target.checked)}
        onBlur={onBlur}
      />
      <ErrorMessage
        errors={errors}
        name={
          `${name}` as unknown as FieldName<
            FieldValuesFromFieldErrors<FieldErrors<TFieldValues>>
          >
        }
        render={({ message }) => <p>{message}</p>}
      />
    </div>
  );
};

const YesNoCheckboxes = <TFieldValues extends FieldValues>({
  name,
  control,
}: CustomFormFieldProps<TFieldValues>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState, formState }) => (
      <YesNoCheckboxesFields
        field={field}
        fieldState={fieldState}
        formState={formState}
      />
    )}
  />
);
export default YesNoCheckboxes;
