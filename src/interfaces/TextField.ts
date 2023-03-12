import { TextFieldProps as MUITextFieldProps } from '@mui/material';
import { BaseFieldProps } from '@interfaces';
import { FieldValues } from 'react-hook-form';

export type TextFieldProps<T extends FieldValues> = MUITextFieldProps &
  BaseFieldProps<T>;
