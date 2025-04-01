'use client';

import './globals.css';
import ReduxProvider from '@/components/ReduxProvider';
import Providers from './providers';
import { Toaster } from 'react-hot-toast';
interface RooteLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RooteLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <Toaster />
          <ReduxProvider>{children}</ReduxProvider>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
