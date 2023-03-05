import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
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

    expect(Object.keys(result.current)).toEqual([
      'setFormValue',
      'formState',
      'fieldState',
      'clearErrors',
      'resetField',
      'partialReset',
      'resetForm',
      'triggerValidation',
      'formHasChanges',
    ]);
  });

  it('Properties type definitions are the expected for those keys', () => {
    const { result } = performRender();

    expect(result.current).toEqual({
      setFormValue: expect.any(Function),
      formState: expect.any(Function),
      fieldState: expect.any(Function),
      clearErrors: expect.any(Function),
      resetField: expect.any(Function),
      partialReset: expect.any(Function),
      resetForm: expect.any(Function),
      triggerValidation: expect.any(Function),
      formHasChanges: expect.any(Function),
    });
  });

  describe('Hook functionalities', () => {
    it('setFormValue works as expected', async () => {
      const {
        result: {
          current: { setFormValue, formState },
        },
      } = performRender();
      const newPropertyValue = 'Ana';

      setFormValue({
        name: 'name',
        value: newPropertyValue,
      });

      expect(formState().currentState.name).toBe(newPropertyValue);
    });

    it('formState method returns what is expected', () => {
      const {
        result: {
          current: { formState },
        },
      } = performRender();

      const expectedKeyNamesReturned = [
        'defaultValues',
        'currentState',
        'isValid',
        'errors',
      ];

      // Returns the expected key names
      expect(Object.keys(formState())).toStrictEqual(expectedKeyNamesReturned);

      // Returns the expected property values
      expect(formState()).toStrictEqual({
        defaultValues,
        currentState: defaultValues,
        isValid: false,
        errors: {},
      });
    });

    it('fieldState method returns what is expected', () => {
      const {
        result: {
          current: { fieldState },
        },
      } = performRender();

      const expectedKeyNamesReturned = [
        'isDirty',
        'isTouched',
        'invalid',
        'error',
      ];

      // Returns the expected key names
      expect(Object.keys(fieldState('email'))).toStrictEqual(
        expectedKeyNamesReturned,
      );

      // Returns the expected property values
      expect(fieldState('email')).toStrictEqual({
        isDirty: false,
        isTouched: false,
        invalid: false,
        error: undefined,
      });
    });

    it('clearErrors works as expected', async () => {
      const {
        result: {
          current: { setFormValue, fieldState, clearErrors },
        },
      } = performRender();

      await waitFor(() => {
        setFormValue({
          name: 'sex',
          value: 3,
        });
      });

      // Field 'sex' should be flagged as 'invalid'
      expect(fieldState('sex').invalid).toBeTruthy();

      await waitFor(() => {
        clearErrors('sex');
      });

      // Fiels 'sex' should be valid again
      expect(fieldState('sex').invalid).toBeFalsy();
    });

    it('resetField works as expected', async () => {
      const {
        result: {
          current: { setFormValue, resetField, formState },
        },
      } = performRender();

      await waitFor(() => {
        setFormValue({
          name: 'name',
          value: 'Josué',
        });
      });

      await waitFor(() => {
        resetField({
          name: 'name',
          value: '',
        });
      });

      expect(formState().currentState.name).toEqual('');
    });

    it('partialReset works as expected', async () => {
      const {
        result: {
          current: { partialReset, formState },
        },
      } = performRender();

      await waitFor(() => {
        partialReset([
          {
            name: 'name',
            value: 'Josué',
          },
          {
            name: 'lastName',
            value: 'Rock',
          },
        ]);
      });

      expect(formState().currentState.name).toEqual('Josué');
      expect(formState().currentState.lastName).toEqual('Rock');
    });

    it('resetForm works as expected', async () => {
      const {
        result: {
          current: { formState, resetForm },
        },
      } = performRender();

      await waitFor(() => {
        resetForm({
          name: 'Test Value 1',
          lastName: 'Test Value 2',
          sex: 'F',
          email: 'dummyEmail@gmail.com',
        });
      });

      // Current form state should display the set values
      expect(formState().currentState).toStrictEqual({
        name: 'Test Value 1',
        lastName: 'Test Value 2',
        sex: 'F',
        email: 'dummyEmail@gmail.com',
      });
    });

    it('triggerValidation works as expected', async () => {
      const {
        result: {
          current: { triggerValidation, fieldState, resetForm },
        },
      } = performRender();

      await waitFor(() => {
        resetForm({
          name: '',
          lastName: '',
          sex: 'M',
          email: '',
        });
      });

      await waitFor(() => {
        triggerValidation();
      });

      expect(fieldState('name').invalid).toBeTruthy();
      expect(fieldState('lastName').invalid).toBeTruthy();
      expect(fieldState('email').invalid).toBeTruthy();
    });

    it('formHasChanges works as expected', async () => {
      const {
        result: {
          current: { setFormValue, formHasChanges },
        },
      } = performRender();

      await waitFor(() => {
        setFormValue({
          name: 'lastName',
          value: 'Mujica',
        });
      });

      expect(formHasChanges()).toBeTruthy();
    });
  });
});
