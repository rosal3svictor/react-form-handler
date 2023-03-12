import { FieldValues } from 'react-hook-form';

export interface DemoFormSchema extends FieldValues {
  name: string;
  lastName: string;
}
