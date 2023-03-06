import {
  DefaultValues,
  Mode,
  UseFormProps,
  SetValueConfig,
} from 'react-hook-form';
import { ObjectSchema, AnyObject } from 'yup';
import { useFormHandler } from '@utils';

/** General Form Instance Definition */
export interface FormHandlerProps<T> {
  defaultValues: DefaultValues<T>;
  schema: ObjectSchema<T & AnyObject>;
  mode?: Mode;
  options?: Omit<
    UseFormProps,
    'defaultValues' | 'mode' | 'resolver' | 'values'
  >;
}

/** Properties for assigning a value to a registered field */
export interface SetValueProps {
  name: string;
  value: unknown;
  options?: Omit<SetValueConfig, 'shouldValidate' | 'shouldDirty'>;
}

export type UseFormReturn = typeof useFormHandler;
