import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { Button, ButtonLevel } from './Button';

describe('when <Button /> renders', () => {
  const message = 'button text';

  it('should show the correct text content', () => {
    render(<Button>{message}</Button>);
    expect(screen.getByRole('button')).toHaveTextContent(message);
  });

  it('should have a green background colour by default', () => {
    render(<Button>{message}</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-wb-green');
  });

  describe('and the button level is warning', () => {
    it('should have a red background', () => {
      render(<Button buttonLevel={ButtonLevel.WARNING}>{message}</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-wb-red');
    });
  });

  describe('and the button is clicked', () => {
    it('should trigger the onClick handler', () => {
      const clickHandler = jest.fn();
      render(<Button onClick={clickHandler}>{message}</Button>);

      userEvent.click(screen.getByRole('button'));
      expect(clickHandler).toBeCalledTimes(1);
    });
  });

  describe('when the button is disabled', () => {
    it('should not be clickable', () => {
      const clickHandler = jest.fn();
      render(
        <Button onClick={clickHandler} disabled>
          {message}
        </Button>
      );

      userEvent.click(screen.getByRole('button'));
      expect(clickHandler).toBeCalledTimes(0);
    });
  });
});
