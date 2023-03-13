import useFormHelper from '@utils/useFormHelper';
import TextField from '@components/TextField';
import { DemoFormSchema, FormSchemaConstructor } from '@interfaces';
import useDemoFormHelper from './useDemoFormHelper';

function DemoForm() {
  const { context: DemoFormContext } =
    useFormHelper<FormSchemaConstructor<DemoFormSchema>>();
  const { formHandler, contextValue, onError, onSubmit } = useDemoFormHelper();

  return (
    <DemoFormContext.Provider value={contextValue}>
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
