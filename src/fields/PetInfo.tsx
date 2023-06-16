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

const PetInfoFields = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  field: { onChange, onBlur, value, name, ref },
  formState: { errors },
}: CustomFormFieldInternalProps<TFieldValues, TName>) => {
  type PetInfo = {
    name: string | undefined;
    isFat: boolean;
    favouriteFood: string | undefined;
  };
  const [petInfo, setPetInfo] = useState<PetInfo>(value);

  const updateName = (newName: string | undefined) => {
    setPetInfo((prevState) => ({
      ...prevState,
      name: newName,
    }));
  };

  const updateIsFat = (newIsFat: boolean) => {
    setPetInfo((prevState) => ({
      ...prevState,
      isFat: newIsFat,
      favouriteFood: undefined,
    }));
  };

  const updateFavouriteFood = (newFavouriteFood: string | undefined) => {
    setPetInfo((prevState) => ({
      ...prevState,
      favouriteFood: newFavouriteFood,
    }));
  };

  useEffect(() => {
    onChange(petInfo);
  }, [petInfo]);

  return (
    <div>
      <label htmlFor={`${name}.name`}>Pet Name</label>
      <input
        id={`${name}.name`}
        value={value.name}
        onChange={(e) => updateName(e.target.value)}
        onBlur={onBlur}
      />
      <ErrorMessage
        errors={errors}
        name={
          `${name}.name` as unknown as FieldName<
            FieldValuesFromFieldErrors<FieldErrors<TFieldValues>>
          >
        }
        render={({ message }) => <p>{message}</p>}
      />
      <label htmlFor={`${name}.isFat`}>Is pet fat?</label>
      <input
        id={`${name}.isFat`}
        type="checkbox"
        checked={value.isFat}
        onBlur={onBlur}
        onChange={(e) => updateIsFat(e.target.checked)}
      />
      {petInfo.isFat && (
        <>
          <label htmlFor={`${name}.favouriteFood`}>Pet's favourite food</label>
          <input
            id={`${name}.favouriteFood`}
            value={value.favouriteFood}
            onChange={(e) => updateFavouriteFood(e.target.value)}
            onBlur={onBlur}
          />
          <ErrorMessage
            errors={errors}
            name={
              `${name}.favouriteFood` as unknown as FieldName<
                FieldValuesFromFieldErrors<FieldErrors<TFieldValues>>
              >
            }
            render={({ message }) => <p>{message}</p>}
          />
        </>
      )}
    </div>
  );
};

const PetInfo = <TFieldValues extends FieldValues>({
  name,
  control,
}: CustomFormFieldProps<TFieldValues>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState, formState }) => (
      <PetInfoFields
        field={field}
        fieldState={fieldState}
        formState={formState}
      />
    )}
  />
);
export default PetInfo;
