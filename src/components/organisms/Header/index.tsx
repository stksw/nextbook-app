import React from 'react';
import Text from 'components/atoms/Text';
import Flex from 'components/layout/Flex';
import styled from 'styled-components';
import { useAuthContext } from 'context/AuthContext';
import { useShoppingCartContext } from 'context/ShoppingCartContext';
import Link from 'next/link';
import Box from 'components/layout/Box';
import Spinner from 'components/atoms/Spinner';
import Button from 'components/atoms/Button';

const HeaderRoot = styled.div`
  height: 88px;
  padding: ${({ theme }) => theme.space[2]} 0px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Nav = styled(Flex)`
  & > span:not(:first-child) {
    margin-left: ${({ theme }) => theme.space[2]};
  }
`;

const NavLink = styled.span`
  display: inline;
`;

const Anchor = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const productNavs = [
  { label: 'すべて', path: '/search' },
  { label: 'トップス', path: '/search/clothes' },
  { label: '本', path: '/search/books' },
  { label: 'シューズ', path: '/search/shoes' },
];

const Header = () => {
  const { cart } = useShoppingCartContext();
  const { authUser, isLoading } = useAuthContext();

  return (
    <HeaderRoot>
      <Flex>
        <Nav as="nav" height="56px" alignItems="center">
          <NavLink>
            <Link href="/" passHref>
              <Anchor as="a">{/* logo */}</Anchor>
            </Link>
          </NavLink>
          {productNavs.map((nav, index) => (
            <NavLink key={index}>
              <Box display={{ base: 'none', md: 'block' }}>
                <Link href={nav.path} passHref>
                  <Anchor as="a">{nav.label}</Anchor>
                </Link>
              </Box>
            </NavLink>
          ))}
        </Nav>
        <Nav as="nav" height="56px" alignItems="center">
          <NavLink>
            <Box display={{ base: 'none', md: 'block' }}>
              <Link href="/search" passHref>
                <Anchor as="a"></Anchor>
              </Link>
            </Box>
          </NavLink>
          <NavLink>
            <Link href="/cart">
              <Anchor as="a"></Anchor>
            </Link>
          </NavLink>
          <NavLink>
            {(() => {
              if (authUser) {
                return (
                  <Link href={`/users/${authUser.id}`} passHref>
                    <Anchor as="a"></Anchor>
                  </Link>
                );
              } else if (isLoading) {
                return <Spinner size={20} strokeWidth={2} />;
              } else {
                return (
                  <Link href="/signin" passHref>
                    <Anchor as="a"></Anchor>
                  </Link>
                );
              }
            })()}
          </NavLink>
          <NavLink>
            <Link href="/sell" passHref>
              <Button as="a">出品</Button>
            </Link>
          </NavLink>
        </Nav>
      </Flex>
    </HeaderRoot>
  );
};

export default Header;
