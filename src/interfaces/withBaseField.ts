import { ChangeEvent, FocusEvent } from 'react';
import { UseFormReturn } from '@interfaces';
import { FieldValues } from 'react-hook-form';

export type BaseFieldProps<T extends FieldValues> = {
  onChange?: (
    input: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur?: (input: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  formhandler?: UseFormReturn<T>;
};
