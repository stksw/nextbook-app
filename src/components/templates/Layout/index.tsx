import Separator from 'components/atoms/Separator';
import Box from 'components/layout/Box';
import Footer from 'components/organisms/Footer';
import Header from 'components/organisms/Header';
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Separator />
      <Box padding={3}>
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
