import {
  DefaultValues,
  Mode,
  Path,
  UseFormProps,
  SetValueConfig,
  KeepStateOptions,
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
  options?: SetValueConfig;
}

export interface ResetFieldProps<T> {
  name: Path<T>;
  options?: KeepStateOptions;
}

export type UseFormReturn = typeof useFormHandler;
