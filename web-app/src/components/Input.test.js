import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Form, Formik } from 'formik';

import { Input } from './Input';

describe('when <Input /> renders', () => {
  const fieldLabel = 'field label';
  const textValue = 'abc';

  it('should have the correct label', async () => {
    render(
      <Formik initialValues={{ name: '' }} onSubmit={() => {}}>
        <Form>
          <Input label={fieldLabel} name="name" />
        </Form>
      </Formik>
    );

    expect(await screen.findByText(fieldLabel)).toBeInTheDocument();
  });

  it('should update the value on type', async () => {
    render(
      <Formik initialValues={{ name: '' }} onSubmit={() => {}}>
        <Form>
          <Input label={fieldLabel} name="name" />
        </Form>
      </Formik>
    );

    const inputField = await screen.findByLabelText(fieldLabel);
    userEvent.type(inputField, textValue);
    expect(inputField).toHaveValue(textValue);
  });

  describe('and the type is number', () => {
    it('should only accept numbers', async () => {
      render(
        <Formik initialValues={{ name: '' }} onSubmit={() => {}}>
          <Form>
            <Input label={fieldLabel} name="name" type="number" />
          </Form>
        </Formik>
      );

      const inputField = await screen.findByLabelText(fieldLabel);
      userEvent.type(inputField, 'abc');
      userEvent.type(inputField, '123');
      expect(inputField).toHaveValue(123);
    });
  });

  describe('and the type is currency', () => {
    it.only('should display the currency symbol on focus', async () => {
      render(
        <Formik initialValues={{ name: '' }} onSubmit={() => {}}>
          <Form>
            <Input label={fieldLabel} name="name" type="currency" />
          </Form>
        </Formik>
      );

      const inputField = await screen.findByLabelText(fieldLabel);
      userEvent.click(inputField);
      expect(await screen.findByText('£')).toBeInTheDocument();
    });
  });
});
