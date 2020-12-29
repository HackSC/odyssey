import React from "react";

import styled from "styled-components";

import HeaderLogo from "../assets/header_logo_21_transparent.png";

import { Button, Container, Link } from "../styles";

import constants from "../lib/hackathonConstants";
import { useState } from "react";

type NavbarProps = {
  loggedIn?: boolean;
  showLive?: boolean;
  showDash?: boolean;
  showApp?: boolean;
  showMaps?: boolean;
  showAPI?: boolean;
  showResults?: boolean;
  showTeam?: boolean;
  showLogout?: boolean;
  showProjectTeam?: boolean;
  activePage?: string;
  admin?: boolean;
  volunteer?: boolean;
  superadmin?: boolean;
  judge?: boolean;
  sponsor?: boolean;
};

const style = (background) => {
  return {
    "&:hover": {
      backgroundColor: "#FF8379 !important",
      color: "white !important",
    },
    padding: "10px",
    margin: "10px",
    color: background !== "white" ? "white" : "black",
    backgroundColor: background,
    cursor: "pointer",
  };
};

const Navbar: React.FunctionComponent<NavbarProps> = ({
  loggedIn,
  showLive = constants.showLive,
  showDash = constants.showDash,
  showApp = constants.showApp,
  showMaps = constants.showMaps,
  showAPI = constants.showAPI,
  showResults = constants.showResults,
  showTeam = constants.showTeam,
  showLogout = true,
  showProjectTeam = constants.showProjectTeam,
  activePage,
  admin,
  superadmin,
  volunteer,
  judge,
  sponsor,
}: NavbarProps) => {
  const [checked, setChecked] = useState(false);

  return (
    <Wrapper>
      <NavbarContainer>
        <a href={loggedIn && showLive ? "/live" : "/"}>
          <HeaderLogoImg src={HeaderLogo} />
        </a>
        <Links>
          {loggedIn ? (
            <>
              {/*!admin && !volunteer && !sponsor && showDash && (
                <Link
                  href="/dashboard"
                  style={style(
                    activePage === "dashboard" ? "#FF8379" : "white"
                  )}
                >
                  Dashboard
                </Link>
                  )*/}
              {!superadmin &&
                !admin &&
                !volunteer &&
                !sponsor &&
                !judge &&
                showApp && (
                  <Link
                    href="/application"
                    id="application-page"
                    style={style(
                      activePage === "application" ? "#FF8379" : "white"
                    )}
                  >
                    Application
                  </Link>
                )}
              {!superadmin &&
                !admin &&
                !volunteer &&
                !sponsor &&
                !judge &&
                showResults && (
                  <Link
                    href="/results"
                    id="results-page"
                    style={style(
                      activePage === "results" ? "#FF8379" : "white"
                    )}
                  >
                    Results
                  </Link>
                )}
              {!superadmin &&
                !admin &&
                !volunteer &&
                !sponsor &&
                !judge &&
                showTeam && (
                  <Link
                    href="/team"
                    id="team-page"
                    style={style(activePage === "team" ? "#FF8379" : "white")}
                  >
                    Team
                  </Link>
                )}
              {!superadmin &&
                !admin &&
                !volunteer &&
                !sponsor &&
                !judge &&
                showProjectTeam && (
                  <Link
                    href="/projectTeam"
                    id="projectTeam-page"
                    style={style(
                      activePage === "projectTeam" ? "#FF8379" : "white"
                    )}
                  >
                    Manage Team
                  </Link>
                )}
              {!superadmin &&
                !admin &&
                !volunteer &&
                !sponsor &&
                !judge &&
                showMaps && (
                  <Link
                    href="/maps"
                    id="maps-page"
                    style={style(activePage === "maps" ? "#FF8379" : "white")}
                  >
                    Maps
                  </Link>
                )}
              {!superadmin &&
                !admin &&
                !volunteer &&
                !sponsor &&
                !judge &&
                showAPI && (
                  <Link
                    href="/api-directory"
                    id="api-directory-page"
                    style={style(activePage === "api" ? "#FF8379" : "white")}
                  >
                    APIs
                  </Link>
                )}
              {superadmin && (
                <>
                  <DevModeButton
                    outline={checked ? true : false}
                    onClick={() => setChecked(!checked)}
                  >
                    Dev Mode
                  </DevModeButton>
                  {checked ? (
                    <style>{`
                    * {
                      background: #000 !important;
                      color: #0f0 !important;
                      outline: solid #f00 1px !important;
                    }
                    `}</style>
                  ) : (
                    ""
                  )}
                </>
              )}
              {(superadmin || admin || sponsor || volunteer || judge) && ( // * showLive - should be true always since admins, sponsors, volunteers, and judges need visibility
                <Link
                  href="/admin/live"
                  id="live-page"
                  style={style(activePage === "live" ? "#FF8379" : "white")}
                >
                  Live
                </Link>
              )}
              {(superadmin || admin || sponsor || volunteer || judge) && (
                <Link
                  href="/admin"
                  id="admin-dashboard-page"
                  style={style(activePage === "/" ? "#FF8379" : "white")}
                >
                  Admin Dashboard
                </Link>
              )}
              {(superadmin || admin || sponsor) && (
                <Link
                  href="/admin/admin-stats"
                  id="admin-stats-page"
                  style={style(
                    activePage === "admin-stats" ? "#FF8379" : "white"
                  )}
                >
                  Statistics
                </Link>
              )}
              {showLogout && (
                <Link
                  href="/auth/logout"
                  id="auth-logout-page"
                  style={style(activePage === "logout" ? "#FF8379" : "white")}
                >
                  Logout
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                href="/"
                id="main-page"
                style={style(activePage === "/" ? "#FF8379" : "white")}
              >
                Home
              </Link>
              <Link
                href="/auth/login"
                id="auth-login-page"
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

const DevModeButton = styled(Button)`
  max-width: 120px;
  font: inherit;
  font-size: 14px !important;
  margin: 10px;
  padding: 10px;
  color: black;
  font-weight: 600 !important;
  outline: none;
  background-color: white;
  border-radius: 4px;

  &:hover {
    background-color: #ff8379 !important;
    color: white !important;
  }
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
  width: 220px;
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
