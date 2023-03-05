import {
  DefaultValues,
  Mode,
  UseFormProps,
  SetValueConfig,
} from 'react-hook-form';
import { ObjectSchema, AnyObject } from 'yup';
import { useFormHandler } from '@utils';

export interface FormHandlerProps<T> {
  defaultValues: DefaultValues<T>;
  schema: ObjectSchema<T & AnyObject>;
  mode?: Mode;
  options?: Omit<
    UseFormProps,
    'defaultValues' | 'mode' | 'resolver' | 'values'
  >;
}

export interface SetValueProps {
  name: string;
  value: unknown;
  options?: Omit<SetValueConfig, 'shouldValidate' | 'shouldDirty'>;
}

export type UseFormReturn = typeof useFormHandler;
