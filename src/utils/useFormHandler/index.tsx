/* eslint-disable import/no-extraneous-dependencies */
import {
  useForm,
  FieldValues,
  Path,
  KeepStateOptions,
  PathValue,
} from 'react-hook-form';
import { FormHandlerProps, SetValueProps } from '@interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { isEqual } from 'lodash';

/**
 * Custom hook to manage a form
 *
 * @see
 *  [useForm - React hooks for form validation](https://react-hook-form.com/api/useform)
 *
 * @returns Methods exposing individual functions to manage the form state.
 *
 * @example
 * ```Text
 * In order to make an implementation of this hook, make sure to follow these
 * steps:
 * ```
 *
 * ```Text
 *
 * 1. Create a hook which will serve as a central place to define the methods
 * for the form instance. Please, follow this name convention: 'use<entityName>FormHelper.ts':
 * ```
 *```TSX
 *
 *  import { FormSchema } from '@interfaces';
 *  import * as yup from 'yup';
 *
 *  export const useDemoFormHelper = () => {
 *    const defaultFormData: Partial<FormSchema> = {};
 *
 *    const schema: yup.SchemaOf<FormSchema> = yup.object({});
 *
 *    return {
 *      defaultFormData,
 *      schema,
 *    };
 *  }
 * ```
 * ```Text
 *
 * 2. Since the internal form state will be handled by React Context API, it is
 * required to use the utility function 'userFormHelper' to create such context.
 *
 * Also, make sure to import the hook 'useFormHandler' so we can create a new form
 * instance, which will be expecting some information from the previously created hook.
 *
 * In order to comply with the pattern, remember that you'll need:
 *  - Hook to define the methods to deal with the form.
 *  - Implement 'userFormHelper', to provide the internal state for the form.
 *  - Implement 'useFormHandler, to create a new form instance.
 *
 * The final implementation will look like the following sample:
 * ```
 *```TSX
 *
 * import { useMemo, useState } from "react";
 * import { useFormHandler, useFormHelper } from "@utils";
 * import { TextField } from "@components";
 * import { FormMode } from "@interfaces";
 * import { FieldValues } from "react-hook-form";
 * import { useDemoFormHelper } from "./useDemoFormHelper";
 *
 * export function DemoForm() {
 *    const [mode, setMode] = useState<FormMode>("create");
 *    const { context: DemoFormContext } = useFormHelper();
 *    const { defaultValues, schema } = useDemoFormHelper();
 *    const formHandler = useFormHandler<FieldValues>({
 *      defaultValues,
 *      schema,
 *    });
 *
 *   // IMPORTANT: This prevents non-stable values (i.e. object identities)
 *   // from being used as a value for Context.Provider.
 *   const value = useMemo(
 *     () => ({
 *      formHandler,
 *      mode,
 *      setMode,
 *    }),
 *    [formHandler, mode]
 *   );
 *
 *   return (
 *     <DemoFormContext.Provider value={value}>
 *      <>
 *        <TextField name="name" formhandler={formHandler} />
 *        <TextField name="lastName" formhandler={formHandler} />
 *      </>
 *     </DemoFormContext.Provider>
 *   );
 * }
 * ```
 */
const useFormHandler = <T extends FieldValues>(props: FormHandlerProps<T>) => {
  /**
   * It is a custom hook for managing forms with ease. It takes one object as
   * optional argument
   *
   * Link to official documentation {@link https://react-hook-form.com/api/useform}
   */
  const formInstance = useForm<T>({
    defaultValues: props.defaultValues,
    mode: props.mode ?? 'onChange',
    resolver: yupResolver(props.schema),
    ...props.options,
  });

  /**
   * This function allows you to dynamically set the value of a registered field
   * and have the options to validate and update the form state. At the same
   * time, it tries to avoid unnecessary rerender.
   *
   * Link to official documentation {@link https://react-hook-form.com/api/useform/setvalue}
   */
  const setFormValue = (args: SetValueProps) => {
    formInstance.setValue(
      args.name as Path<T>,
      args.value as PathValue<T, Path<T>>,
      { shouldValidate: true, shouldDirty: true, ...args.options },
    );
  };

  /**
   * This object contains information about the entire form state. It helps you
   * to keep on track with the user's interaction with your form application.
   *
   * Link to official documentation {@link https://react-hook-form.com/api/useform/formstate}
   */
  const formState = () => {
    const { defaultValues, isValid, errors } = formInstance.formState;

    return {
      defaultValues,
      currentState: formInstance.getValues(),
      isValid,
      errors,
    };
  };

  /**
   * This method is introduced in react-hook-form (v7.25.0) to return individual
   * field state. It's useful in case you are trying to retrieve nested field
   * state in a typesafe way.
   *
   * Link to official documentation {@link https://react-hook-form.com/api/useform/getfieldstate}
   */
  const fieldState = (name: Path<T>) => {
    const { isDirty, isTouched, invalid, error } =
      formInstance.getFieldState(name);

    return { isDirty, isTouched, invalid, error };
  };

  /**
   * This function can manually clear errors in the form.
   *
   * Link to official documentation {@link https://github.com/react-hook-form/react-hook-form/discussions/2704}
   */
  const clearErrors = (input?: Path<T> | Array<Path<T>>) => {
    if (typeof input === 'string') formInstance.clearErrors(input);
    if (typeof input === 'object') formInstance.clearErrors(input);
    formInstance.clearErrors();
  };

  /**
   * Reset the value for a single registered field.
   *
   * Link to official repository discussion to perform a partial form reset {@link https://github.com/react-hook-form/react-hook-form/discussions/2704}
   */
  const resetField = (args: SetValueProps) => {
    clearErrors(args.name as Path<T>);
    setFormValue({
      name: args.name,
      value: args.value,
      ...args.options,
    });
  };

  /**
   * Reset the value for a group of registered fields.
   *
   * Link to official repository discussion to perform a partial form reset {@link https://github.com/react-hook-form/react-hook-form/discussions/2704}
   */
  const partialReset = (input: Array<SetValueProps>) => {
    input.forEach((field) => {
      resetField(field);
    });
  };

  /**
   * Reset the entire form state, fields reference, and subscriptions. There are
   * optional arguments and will allow partial form state reset.
   *
   * Link to official documentation {@link https://react-hook-form.com/api/useform/reset}
   */
  const resetForm = (values?: T, options?: KeepStateOptions) => {
    if (values) return formInstance.reset(values, options);
    return formInstance.reset();
  };

  /**
   * Manually triggers form or input validation. This method is also useful when
   * you have dependant validation (input validation depends on another input's
   * value).
   *
   * Link to official documentation {@link https://react-hook-form.com/api/useform/trigger}
   */
  const triggerValidation = (input?: string | Array<string>) => {
    if (typeof input === 'string')
      return formInstance.trigger(input as Path<T>);
    if (typeof input === 'object')
      return formInstance.trigger(input as Array<Path<T>>);

    return formInstance.trigger();
  };

  /**
   * Performs a deep comparison between 'defaultValues' and the current form state
   * to determine if they are equivalent. This method is useful when you require
   * to verify if the form has had changes from its initial state.
   */
  const formHasChanges = () =>
    !isEqual(props.defaultValues, formInstance.getValues());

  return {
    setFormValue,
    formState,
    fieldState,
    clearErrors,
    resetField,
    partialReset,
    resetForm,
    triggerValidation,
    formHasChanges,
  };
};

export default useFormHandler;
