import { renderHook } from '@testing-library/react-hooks';
import * as yup from 'yup';
import useFormHandler from '.';

export interface DemoFormSchema {
  name: string;
  lastName: string;
  sex: 'M' | 'F';
  email: string;
}

const defaultValues: DemoFormSchema = {
  name: 'Victor',
  lastName: 'Rosales',
  sex: 'M',
  email: 'rosalesvictor.dev@gmail.com',
};

const schema = yup.object().shape<Record<keyof DemoFormSchema, yup.Schema>>({
  name: yup.string().required(),
  lastName: yup.string().required(),
  sex: yup.mixed().oneOf(['F', 'M']).required(),
  email: yup.string().required(),
});

const performRender = () =>
  renderHook(() =>
    useFormHandler({
      defaultValues,
      schema,
    }),
  );

describe('useFormHandler Hook', () => {
  it('Returns the expected key names', () => {
    const { result } = performRender();

    console.log('result ', result.current);
  });
});
