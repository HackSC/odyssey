import React from "react";

import styled from "styled-components";

import HeaderLogo from "../assets/header_logo.png";

import { Container, Link } from "../styles";

type NavbarProps = {
  loggedIn?: boolean;
};

const Navbar: React.FunctionComponent<NavbarProps> = ({
  loggedIn
}: NavbarProps) => {
  return (
    <Wrapper>
      <NavbarContainer>
        <a href={loggedIn ? "/dashboard" : "/"}>
          <HeaderLogoImg src={HeaderLogo} />
        </a>

        <Links>
          {loggedIn ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/auth/logout">Logout</Link>
            </>
          ) : (
            <>
              <Link href="/">Home</Link>
              <Link href="/auth/login">Login</Link>
            </>
          )}
        </Links>
      </NavbarContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 30px 0;
`;

const NavbarContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLogoImg = styled.img`
  width: 169px;

  ${({ theme }) =>
    theme.media.mobile`
      width: 120px;
    `}
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.black};
    text-transform: uppercase;
    padding: 0 12px;
  }
`;

export default Navbar;
