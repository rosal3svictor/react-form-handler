/* eslint-disable react/jsx-props-no-spreading */
import { BaseFieldProps } from '@interfaces';
import { ChangeEvent, FocusEvent } from 'react';
import { FieldValues } from 'react-hook-form';

function withBaseField<T extends FieldValues>(WrappedComponent: React.FC<T>) {
  return function WithFormHandlerField(props: T & BaseFieldProps<T>) {
    const {
      formhandler,
      name,
      onChange: onChangeProp,
      onBlur: onBlurProp,
    } = props;

    const onChange = (
      input: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      if (formhandler) {
        formhandler.setFormValue({
          name: name ?? '',
          value: input.target.value,
        });
      }

      if (onChangeProp) {
        onChangeProp(input);
      }
    };

    const onBlur = (
      input: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      if (formhandler) {
        formhandler.setFormValue({
          name: name ?? '',
          value: input.target.value,
        });
      }

      if (onBlurProp) {
        onBlurProp(input);
      }
    };

    return <WrappedComponent {...props} onChange={onChange} onBlur={onBlur} />;
  };
}

export default withBaseField;
