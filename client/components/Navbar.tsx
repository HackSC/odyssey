import React from "react";

import styled from "styled-components";

import HeaderLogo from "../assets/header_logo.png";

import { Container } from "../styles";

const Navbar: React.FunctionComponent = props => {
  return (
    <Wrapper>
      <NavbarContainer>
        <a href="/">
          <HeaderLogoImg src={HeaderLogo} />
        </a>

        <Links>
          <Link href="/">Home</Link>
          <Link href="/">Login</Link>
        </Links>
      </NavbarContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 32px 0;
`;

const NavbarContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLogoImg = styled.img`
  width: 169px;
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Link = styled.a`
  text-decoration: none;
  color: #ff8379;
  padding: 0 16px;
`;

export default Navbar;
