import { useState, useMemo } from 'react';
import { DemoFormSchema, FormMode, FormSchemaConstructor } from '@interfaces';
import * as yup from 'yup';
import useFormHandler from '@utils/useFormHandler';

function useDemoFormHelper() {
  const [mode, setMode] = useState<FormMode>('create');
  const defaultValues: Record<keyof DemoFormSchema, any> = {
    name: '',
    lastName: '',
  };

  const schema = yup.object().shape<Record<keyof DemoFormSchema, yup.Schema>>({
    name: yup.string().required(),
    lastName: yup.string().required(),
  });
  const formHandler = useFormHandler<FormSchemaConstructor<DemoFormSchema>>({
    defaultValues,
    schema,
  });
  /** IMPORTANT: This prevents non-stable values (i.e. object identities)
   * from being used as a value for Context.Provider. */
  const contextValue = useMemo(
    () => ({
      formHandler,
      mode,
      setMode,
    }),
    [formHandler, mode],
  );

  const onSubmit = (data: DemoFormSchema) => {
    console.log('Data ', data);
  };

  const onError = (errors: DemoFormSchema) => {
    console.log('something happened ', errors);
  };

  return {
    defaultValues,
    schema,
    onSubmit,
    onError,
    formHandler,
    contextValue,
  };
}

export default useDemoFormHelper;
