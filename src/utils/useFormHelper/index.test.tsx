/* eslint-disable import/no-extraneous-dependencies */
import { renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { describe, expect, it } from 'vitest';
import useFormHelper from '.';

/**
 * This function was created to comply with this rule {@link https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-render-in-setup.md}
 */
const performRender = (): RenderHookResult<
  null,
  ReturnType<typeof useFormHelper>
> => renderHook(useFormHelper);

describe('useFormHelper Hook', () => {
  it('Returns a new context for a form instance and the hook to read and subscribe to it', () => {
    const { result } = performRender();

    expect(Object.keys(result.current)).toStrictEqual([
      'context',
      'useFormContext',
    ]);
  });

  it('Type definitions for the previous context and custom hook returned are the expected', () => {
    const { result } = performRender();

    expect(result.current).toStrictEqual({
      context: expect.any(Object),
      useFormContext: expect.any(Function),
    });
  });
});
