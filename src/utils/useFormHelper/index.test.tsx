/* eslint-disable import/no-extraneous-dependencies */
import { renderHook, RenderHookResult } from '@testing-library/react-hooks';
import useFormHelper from '.';

const performRender = (): RenderHookResult<
  null,
  ReturnType<typeof useFormHelper>
> => renderHook(useFormHelper);

describe('useFormHelper Hook', () => {
  it('Returns the expected key names', () => {
    const { result } = performRender();

    expect(Object.keys(result.current)).toMatchObject([
      'context',
      'useFormContext',
    ]);
  });

  it('Properties type definitions are the expected for those keys', () => {
    const { result } = performRender();

    expect(result.current).toEqual({
      context: expect.any(Object),
      useFormContext: expect.any(Function),
    });
  });
});
