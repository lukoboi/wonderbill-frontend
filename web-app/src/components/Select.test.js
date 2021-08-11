import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Form, Formik } from 'formik';

import { Select } from './Select';

describe('when <Select /> renders', () => {
  const fieldLabel = 'field label';
  const options = [
    { value: '1', label: 'number 1' },
    { value: '2', label: 'number 2' },
  ];

  it('should have the correct label', async () => {
    render(
      <Formik initialValues={{ name: '' }} onSubmit={() => {}}>
        <Form>
          <Select label={fieldLabel} name="name" />
        </Form>
      </Formik>
    );

    expect(await screen.findByText(fieldLabel)).toBeInTheDocument();
  });

  it('should display the correct options', () => {
    render(
      <Formik initialValues={{ name: '' }} onSubmit={() => {}}>
        <Form>
          <Select label={fieldLabel} name="name" options={options} />
        </Form>
      </Formik>
    );

    options.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('should update the value when selecting', async () => {
    render(
      <Formik initialValues={{ name: '' }} onSubmit={() => {}}>
        <Form>
          <Select label={fieldLabel} name="name" options={options} />
        </Form>
      </Formik>
    );

    const selectInput = await screen.findByLabelText(fieldLabel);
    userEvent.selectOptions(selectInput, options[0].label);
    expect(selectInput).toHaveValue(options[0].value);
  });
});
