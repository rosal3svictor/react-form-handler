import { createContext, useContext } from 'react';
import { FormContext } from '@interfaces';
import { FieldValues } from 'react-hook-form';

/**
 * Custom Hook to create and subscribe to a form instance state
 *
 * Links to official documentation
 * @see
 *  - [createContext](https://beta.reactjs.org/reference/react/createContext)
 *  - [useContext](https://beta.reactjs.org/reference/react/useContext)
 *
 * @returns Methods exposing individual functions to interact with the form state
 * context.
 */
function useFormHelper<T extends FieldValues>() {
  const context = createContext<FormContext<T>>({} as any);
  const useFormContext = () => useContext(context);

  return { context, useFormContext };
}

export default useFormHelper;
