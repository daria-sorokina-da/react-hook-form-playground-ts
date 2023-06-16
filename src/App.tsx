import "./App.css";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";
import FullName from "./fields/FullName";
import PetInfo from "./fields/PetInfo";
import YesNoCheckboxes from "./fields/YesNoCheckboxes";

export type MappedLike<Type, PropertyType> = {
  [Property in keyof Type]: PropertyType;
};

export type FormFields = {
  personName: {
    first: string | undefined;
    last: string | undefined;
  };
  email: string | undefined;
  hasPets: boolean | undefined;
  petInfos: {
    name: string | undefined;
    isFat: boolean;
    favouriteFood: string | undefined;
  }[];
};

const schema: MappedLike<FormFields, Joi.SchemaLike> = {
  personName: Joi.object({
    first: Joi.string()
      .empty("")
      .max(10)
      .message("Max length is 10")
      .when("...email", { // https://joi.dev/api/?v=17.9.1#relative-references
        is: "req@email.com",
        then: Joi.required(),
      }),
    last: Joi.string()
      .empty("")
      .max(10)
      .message("Max length is 10")
      .when("first", {
        is: "req",
        then: Joi.required(),
      }),
  }),
  hasPets: Joi.boolean().when("personName.first", {
    is: "req",
    then: Joi.required(),
  }),
  petInfos: Joi.array()
    .items(
      Joi.object({
        name: Joi.string()
          .empty("")
          .max(10)
          .message("Max length is 10")
          .when("/personName.first", { // https://joi.dev/api/?v=17.9.1#relative-references
            is: "req",
            then: Joi.required(),
          }),
        isFat: Joi.boolean(),
        favouriteFood: Joi.string().empty("").max(10).when("isFat", {
          is: true,
          then: Joi.required(),
        }),
      })
    )
    .when("hasPets", {
      is: true,
      then: Joi.array().min(1),
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
};

export const formResolver = joiResolver(Joi.object(schema), {
  errors: {
    wrap: {
      label: false,
    },
  },
  abortEarly: false,
});

export default function App() {
  const { handleSubmit, control, formState, getValues } = useForm<FormFields>({
    mode: "onTouched",
    defaultValues: {
      personName: {
        first: "first",
        last: "last",
      },
      email: "t@e.c",
      petInfos: [],
    },
    resolver: formResolver,
  });
  const petInfosFields = useFieldArray({
    control,
    name: "petInfos",
  });

  useEffect(() => {});

  const onSubmit = (data: FormFields) => {
    console.log("submitting!");
    console.log(data);
  };

  const log = () => {
    console.log("submit click");
    console.log(formState);
    console.log(getValues());
    console.log(formState.errors);
  };

  const addPet = () => {
    petInfosFields.append({
      name: undefined,
      isFat: false,
      favouriteFood: undefined,
    });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({
            field: { onChange, onBlur, value, name, ref },
            formState: { errors },
          }) => (
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
              <ErrorMessage
                errors={errors}
                name={name}
                render={({ message }) => <p>{message}</p>}
              />
            </div>
          )}
        />
        <FullName name="personName" control={control} />
        <YesNoCheckboxes name="hasPets" control={control} />
        {petInfosFields.fields.map((petInfo, index) => (
          <PetInfo
            key={petInfo.id}
            name={`petInfos.${index}`}
            control={control}
          />
        ))}
        <ErrorMessage
          errors={formState.errors}
          name="petInfos"
          render={({ message }) => <p>{message}</p>}
        />
        <div>
          <button type="button" onClick={() => addPet()}>
            Add Pet
          </button>
          <button type="submit" onClick={() => log()}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
