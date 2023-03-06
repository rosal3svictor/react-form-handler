import { UseFormReturn } from '@interfaces';
import { SetStateAction, Dispatch } from 'react';

/** Global state assiged to a form instance */
export interface FormContext {
  formHandler: UseFormReturn;
  mode: FormMode;
  setMode: Dispatch<SetStateAction<FormMode>>;
}

/** Allowed forms mode */
export type FormMode = 'create' | 'update';
