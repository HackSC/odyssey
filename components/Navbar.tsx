import React from "react";

import styled from "styled-components";

import HeaderLogo from "../assets/header_logo.png";

import { Container, Link } from "../styles";

type NavbarProps = {
  loggedIn?: boolean;
  activePage?: string;
  admin?: boolean;
};

const style = background => {
  return {
    "&:hover": {
      backgroundColor: "#FF8379 !important",
      color: "white !important"
    },
    padding: "10px",
    margin: "10px",
    color: background !== "white" ? "white" : "black",
    backgroundColor: background,
    cursor: "pointer"
  };
};

const Navbar: React.FunctionComponent<NavbarProps> = ({
  loggedIn,
  activePage,
  admin
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
              {!admin && (
                <Link
                  href="/dashboard"
                  style={style(
                    activePage === "dashboard" ? "#FF8379" : "white"
                  )}
                >
                  Dashboard
                </Link>
              )}
              {!admin && (
                <Link
                  href="/application"
                  style={style(
                    activePage === "application" ? "#FF8379" : "white"
                  )}
                >
                  Application
                </Link>
              )}
              {!admin && (
                <Link
                  href="/results"
                  style={style(activePage === "results" ? "#FF8379" : "white")}
                >
                  Results
                </Link>
              )}
              {!admin && (
                <Link
                  href="/teams"
                  style={style(activePage === "team" ? "#FF8379" : "white")}
                >
                  Teams
                </Link>
              )}
              <Link
                href="/auth/logout"
                style={style(activePage === "logout" ? "#FF8379" : "white")}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/"
                style={style(activePage === "/" ? "#FF8379" : "white")}
              >
                Home
              </Link>
              <Link
                href="/auth/login"
                style={style(activePage === "login" ? "#FF8379" : "white")}
              >
                Login
              </Link>
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

  ${({ theme }) =>
    theme.media.tablet`
      flex-direction: column;
    `}
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
    padding: 0 8px;
    font-size: 14px;
  }

  ${({ theme }) =>
    theme.media.tablet`
      flex-wrap: wrap;
      justify-content: center;
    `}
`;

export default Navbar;
