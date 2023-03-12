import { UseFormReturn } from '@interfaces';
import { SetStateAction, Dispatch } from 'react';
import { FieldValues } from 'react-hook-form';

/** Global state assiged to a form instance */
export interface FormContext<T extends FieldValues> {
  formHandler: UseFormReturn<T>;
  mode: FormMode;
  setMode: Dispatch<SetStateAction<FormMode>>;
}

/** Allowed forms mode */
export type FormMode = 'create' | 'update';
