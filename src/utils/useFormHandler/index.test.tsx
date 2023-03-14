/* eslint-disable @typescript-eslint/ban-ts-comment */
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { defaultValues, mockFormInstance, mockOnValid, schema } from './mocks';
import useFormHandler from '.';

/**
 * This function was created to comply with this rule {@link https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-render-in-setup.md}
 */
const performRender = () =>
  renderHook(() =>
    useFormHandler({
      defaultValues,
      schema,
    }),
  );

describe('useFormHandler Hook', () => {
  it('Returns methods exposing individual functions to manage the form state', () => {
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
      'onSubmitHandler',
    ]);
  });

  it('Type definitions for the previous methods returned are the expected', () => {
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
      onSubmitHandler: expect.any(Function),
    });
  });

  describe('Hook functionalities work as expected', () => {
    it('setFormValue - Dynamically sets the value of a registered field', async () => {
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

    it('formState - Returns an object containing information about the entire form state', () => {
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

    it('fieldState - Returns individual field state', () => {
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

    it('clearErrors - Function through which it can be manually cleared errors in the form', async () => {
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

    it('resetField - Resets the value for a single registered field', async () => {
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

    it('partialReset - Resets the value for a group of registered fields', async () => {
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

    it('resetForm - Reset the entire form state, fields reference, and subscriptions', async () => {
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

    it('triggerValidation - Manually triggers form or input validation', async () => {
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

    it('formHasChanges - Performs a deep comparison between "defaultValues" and the current form state to determine if they are equivalent', async () => {
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

    describe('onSubmitHandler - This function will receive the form data if form validation is successful', () => {
      beforeEach(() => {
        vi.clearAllMocks();
      });

      it('should call onValid callback with form data if validation is successful', async () => {
        const {
          result: {
            current: { onSubmitHandler },
          },
        } = performRender();

        const onSubmit = onSubmitHandler(mockOnValid);

        await waitFor(async () => {
          // @ts-ignore
          await onSubmit(mockFormInstance);
        });

        expect(mockOnValid).toHaveBeenCalledTimes(1);
        expect(mockOnValid).toHaveBeenCalledWith(
          defaultValues,
          mockFormInstance,
        );
      });
    });
  });
});
