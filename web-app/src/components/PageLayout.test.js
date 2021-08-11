import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

import { PageLayout } from './PageLayout';

describe('when <PageLayout /> renders', () => {
  const pageTitle = 'page title';

  it('should display a header with the correct text heading', () => {
    render(<PageLayout headerTitle={pageTitle} />);
    expect(screen.getByRole('heading')).toHaveTextContent(pageTitle);
  });

  it('should default to medium page size', () => {
    render(<PageLayout />);
    expect(screen.getByTestId('pageLayoutContent')).toHaveClass('max-w-md');
  });

  it('should display the provided content', () => {
    render(<PageLayout>Content</PageLayout>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
