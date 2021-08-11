import React from 'react';
import { useField, FieldHookConfig } from 'formik';

import { FormError } from './FormError';

interface FormInputProps {
  /**
   * Form input label text
   */
  label: string;
  /**
   * Type of input to use. Defaults to 'text'
   */
  type?: 'text' | 'number' | 'date' | 'currency';
  /**
   * Optionally used to override '£' symbol when using 'currency' type
   */
  currencySymbol?: string;
}

export const Input = (props: FormInputProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  const { label, type = 'text', currencySymbol = '£' } = props;
  const { name, value } = field;

  const [labelTop, setLabelTop] = React.useState(Boolean(value));

  React.useEffect(() => {
    setLabelTop(Boolean(value));
  }, [value]);

  return (
    <div className="relative flex flex-col justify-end w-full text-xl h-14 text-wb-grey-dark">
      <fieldset>
        <label
          htmlFor={name}
          className={`absolute text-wb-grey left-3 ${
            labelTop ? 'bottom-9 text-base' : 'bottom-1'
          } transition-all duration-200`}
        >
          {label}
        </label>

        {/* Display currency symbol for currency types */}
        {type === 'currency' && labelTop && (
          <span className="absolute pl-3">{currencySymbol}</span>
        )}

        <input
          {...field}
          id={name}
          type={type === 'currency' ? 'number' : type}
          className={`border-b-2 pl-3 border-wb-grey-light outline-none w-full ${
            type === 'currency' ? 'pl-6' : 'pl-3'
          }`}
          onFocus={() => setLabelTop(true)}
          onBlur={() => setLabelTop(Boolean(value))}
        />

        {meta.touched && meta.error && <FormError>{meta.error}</FormError>}
      </fieldset>
    </div>
  );
};
