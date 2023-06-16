import "./App.css";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";
import FullName from "./FullName";

export type MappedLike<Type, PropertyType> = {
  [Property in keyof Type]: PropertyType;
};

export type FormFields = {
  name: {
    first: string | undefined;
    last: string | undefined;
  };
  email: string | undefined;
};

const schema: MappedLike<FormFields, Joi.SchemaLike> = {
  name: Joi.object({
    first: Joi.string().max(10).message("Max length is 10").required(),
    last: Joi.string().max(10).message("Max length is 10").required(),
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
      name: {
        first: "first",
        last: "last",
      },
      email: "t@e.c",
    },
    resolver: formResolver,
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
              <input value={value} onChange={onChange} onBlur={onBlur} />
              <ErrorMessage
                errors={errors}
                name={name}
                render={({ message }) => <p>{message}</p>}
              />
            </div>
          )}
        />
        <FullName name="name" control={control} />
        <button type="submit" onClick={() => log()}>
          Submit
        </button>
      </form>
    </div>
  );
}
