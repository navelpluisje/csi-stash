/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

interface Props {
  name: string;
  label: string;
  control: Control;
  rules?: RegisterOptions;
}

export const FormSelect: React.FC<Props> = ({
  control, label, name, rules, children,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue: '',
  });

  return (
    <div className="form-field-group">
      <label htmlFor={name}>{label}</label>
      <select {...field} id={name} name={name} className={error ? 'has-error' : ''}>{children}</select>
      {error && <div className="error-message">{error.message || error.type}</div>}
    </div>
  );
};
