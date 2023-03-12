import { DemoFormSchema } from '@interfaces';
import * as yup from 'yup';

function useDemoFormHelper() {
  const defaultValues: Record<keyof DemoFormSchema, any> = {
    name: '',
    lastName: '',
  };

  const schema = yup.object().shape<Record<keyof DemoFormSchema, yup.Schema>>({
    name: yup.string().required(),
    lastName: yup.string().required(),
  });

  return {
    defaultValues,
    schema,
  };
}

export default useDemoFormHelper;
