import {
  DefaultValues,
  Mode,
  UseFormProps,
  SetValueConfig,
  FieldValues,
} from 'react-hook-form';
import { ObjectSchema, AnyObject } from 'yup';
import useFormHandler from '@utils/useFormHandler';
import { AnyKey } from '@interfaces';

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

export type UseFormReturn<T extends FieldValues> = ReturnType<
  typeof useFormHandler<T>
>;

export type FormSchemaConstructor<T> = Omit<T, AnyKey>;
