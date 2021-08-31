import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

interface Props {
  name: string;
  label: string;
  control: Control;
  rules?: RegisterOptions;
}

export const FormInput: React.FC<Props> = ({
  control, label, name, rules,
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
      <input {...field} id={name} name={name} className={error ? 'has-error' : ''} />
      {error && <div className="error-message">{error.message || error.type}</div>}
    </div>
  );
};
