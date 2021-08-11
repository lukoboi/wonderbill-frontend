import React from 'react';
import { useField, FieldHookConfig } from 'formik';

import { FormError } from './FormError';

interface SelectProps {
  /**
   * Form input label text
   */
  label: string;
  /**
   * List of options to display to the user
   */
  options: { value: any; label: string }[];
}

export const Select = (props: SelectProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  const { label, options } = props;
  const { name, value } = field;

  const [labelTop, setLabelTop] = React.useState(
    Boolean(value && value !== 'default')
  );

  React.useEffect(() => {
    setLabelTop(Boolean(value && value !== 'default'));
  }, [value]);

  return (
    <div className="relative flex flex-col justify-end w-full text-xl h-14">
      <fieldset>
        <label
          htmlFor={name}
          className={`absolute text-wb-grey left-2 ${
            labelTop ? 'bottom-9 text-base' : 'bottom-1'
          } transition-all duration-200`}
        >
          {label}
        </label>

        <select
          {...field}
          id={name}
          className="w-full pl-2 border-b-2 outline-none border-wb-grey-light text-wb-grey-dark"
          value={value}
          onFocus={() => setLabelTop(true)}
          onBlur={() => setLabelTop(Boolean(value && value !== 'default'))}
        >
          <option value="default" disabled></option>
          {options?.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        {meta.touched && meta.error && <FormError>{meta.error}</FormError>}
      </fieldset>
    </div>
  );
};
