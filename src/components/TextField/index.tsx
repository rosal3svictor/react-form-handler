/* eslint-disable react/jsx-props-no-spreading */
import { useRef } from 'react';
import { TextField as MUITextField } from '@mui/material';
import { TextFieldProps } from '@interfaces';
import withBaseField from '@hocs/withBaseField';
import { FieldValues } from 'react-hook-form';

function BaseTextField<T extends FieldValues>(props: TextFieldProps<T>) {
  const ref = useRef<HTMLInputElement>(null);

  return <MUITextField {...props} ref={ref} />;
}

export default withBaseField(BaseTextField);
