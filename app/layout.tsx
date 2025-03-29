'use client';

import './globals.css';
import ReduxProvider from '@/components/ReduxProvider';
import Providers from './providers';

interface RooteLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RooteLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <ReduxProvider>{children}</ReduxProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
