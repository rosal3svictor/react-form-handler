import { useMemo, useState } from 'react';
import useFormHandler from '@utils/useFormHandler';
import useFormHelper from '@utils/useFormHelper';
import TextField from '@components/TextField';
import { FormMode, DemoFormSchema, FormSchemaConstructor } from '@interfaces';
import { SubmitHandler } from 'react-hook-form';
import useDemoFormHelper from './useDemoFormHelper';

function DemoForm() {
  const [mode, setMode] = useState<FormMode>('create');
  const { context: DemoFormContext } =
    useFormHelper<FormSchemaConstructor<DemoFormSchema>>();
  const { defaultValues, schema } = useDemoFormHelper();
  const formHandler = useFormHandler<FormSchemaConstructor<DemoFormSchema>>({
    defaultValues,
    schema,
  });

  /** IMPORTANT: This prevents non-stable values (i.e. object identities)
   * from being used as a value for Context.Provider. */
  const value = useMemo(
    () => ({
      formHandler,
      mode,
      setMode,
    }),
    [formHandler, mode],
  );

  const onSubmit: SubmitHandler<DemoFormSchema> = (data: DemoFormSchema) => {
    console.log('Data ', data);
  };

  const onError = () => {
    console.log('something happened ');
  };

  return (
    <DemoFormContext.Provider value={value}>
      <form>
        <TextField name="name" formhandler={formHandler} />
        <TextField name="lastName" formhandler={formHandler} />
        <button
          type="button"
          onClick={formHandler.onSubmitHandler(onSubmit, onError)}
        >
          Submit
        </button>
      </form>
    </DemoFormContext.Provider>
  );
}

export default DemoForm;
