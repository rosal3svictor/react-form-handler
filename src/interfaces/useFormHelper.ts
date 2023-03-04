import { UseFormReturn } from '@interfaces';
import { SetStateAction, Dispatch } from 'react';

export interface FormContext {
  formHandler: UseFormReturn;
  mode: FormMode;
  setMode: Dispatch<SetStateAction<FormMode>>;
}

export type FormMode = 'create' | 'update';
