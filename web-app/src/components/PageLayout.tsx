import React from 'react';
import Helmet from 'react-helmet';

import { Header } from './Header';

interface PageLayoutProps {
  /**
   * Title of page displayed on the browser
   */
  pageTitle: string;
  /**
   * Used to set the header title
   */
  headerTitle: string;
  /**
   * Main content. Will scroll when content overflow
   */
  children: React.ReactNode;
  /**
   * Optional maximum page width. Default to 'md'
   */
  pageWidth?: 'sm' | 'md' | 'lg';
}

export const PageLayout = ({
  pageTitle,
  headerTitle,
  children,
  pageWidth = 'md',
}: PageLayoutProps) => {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <div className="flex flex-col items-center w-full h-screen overflow-x-hidden overflow-y-auto">
        <div className="w-full">
          <Header title={headerTitle} />
        </div>
        <main
          data-testid="pageLayoutContent"
          className={`max-w-sm w-full flex flex-col items-center pb-4 px-2 
            ${pageWidth === 'sm' && 'max-w-sm'} 
            ${pageWidth === 'md' && 'max-w-md'} 
            ${pageWidth === 'lg' && 'max-w-lg'}
          `}
        >
          {children}
        </main>
      </div>
    </>
  );
};
