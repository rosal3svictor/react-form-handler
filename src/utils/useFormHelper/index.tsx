import { createContext, useContext } from 'react';
import { FormContext } from '@interfaces';

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
export default function useFormHelper() {
  const context = createContext<FormContext>({} as any);
  const useFormContext = () => useContext(context);

  return { context, useFormContext };
}
