import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as yup from 'yup';
import useDemoFormHelper from '.';

/**
 * This function was created to comply with this rule {@link https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-render-in-setup.md}
 */
const performRender = () => renderHook(() => useDemoFormHelper());

describe('useDemoFormHelper Hook', () => {
  it('Returns methods exposing individual functions/pieces of data to interact with the form', () => {
    const { result } = performRender();

    expect(Object.keys(result.current)).toEqual([
      'defaultValues',
      'schema',
      'onSubmit',
      'onError',
      'formHandler',
      'contextValue',
    ]);
  });

  it('Type definitions for the previous methods/data returned are the expected', () => {
    const { result } = performRender();

    expect(result.current).toEqual({
      defaultValues: expect.any(Object),
      schema: expect.any(yup.Schema),
      onSubmit: expect.any(Function),
      onError: expect.any(Function),
      formHandler: expect.any(Object),
      contextValue: expect.any(Object),
    });
  });

  it('The default values provided to the form instance are the expected', () => {
    const { result } = performRender();

    expect(Object.keys(result.current.defaultValues)).toEqual([
      'name',
      'lastName',
    ]);
  });

  it('Validation Schema fields provided to the form are the expected', () => {
    const { result } = performRender();

    expect(Object.keys(result.current.schema.fields)).toEqual([
      'name',
      'lastName',
    ]);
  });
});
