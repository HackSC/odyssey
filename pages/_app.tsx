import React from "react";
import App from "next/app";
import { ThemeProvider } from "styled-components";
import { hotjar } from "react-hotjar";
import * as Sentry from "@sentry/browser";

import { persistLinkReferrerCode } from "../lib/referrerCode";
import "react-tippy/dist/tippy.css";
import "react-step-progress-bar/styles.css";

import { Theme, GlobalStyles } from "../styles";
import { ToastProvider } from "react-toast-notifications";
import PersonSwitcher from "../components/PersonSwitcher";
import { getProfile, getProfileList } from "../lib/authenticate";
import UserContext from "../components/UserContext";

class OdysseyApp extends App<any> {
  state = {
    isDev: false,
  };

  static async getInitialProps({ Component, ctx }) {
    let pageProps: any = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const profile = await getProfile(ctx.req);

    let profile_list = [];

    // ! Make sure this fetch only happens in a strict development environment.
    // ! We should never provide other profiles outside of the development environment unless user role is admin.
    if (process.env.NODE_ENV === "development") {
      profile_list = await getProfileList(ctx.req);
    }

    return { pageProps, user: { profile }, profileList: profile_list };
  }

  componentDidMount() {
    // Let's just hardcode the hotjar
    if (process.env.NODE_ENV === "production") {
      hotjar.initialize(1547187, 6);
    } else {
      this.setState({ isDev: true });
    }

    if (typeof window !== "undefined") {
      Sentry.init({
        dsn: "https://1a18ac7b9aa94cb5b2a8c9fc2f7e4fc8@sentry.io/1801129",
        environment:
          process.env.NODE_ENV !== "production" ? "dev" : "production",
      });
    }
  }

  render() {
    const { Component, pageProps, user, profileList } = this.props;
    const { isDev } = this.state;

    return (
      <ThemeProvider theme={Theme}>
        <ToastProvider
          autoDismiss={true}
          autoDismissTimeout={3000}
          placement="bottom-center"
        >
          <UserContext.Provider value={user}>
            <>
              <GlobalStyles />
              {/* {isDev && <PersonSwitcher profileList={profileList} />} */}
              <Component {...pageProps} />
            </>
          </UserContext.Provider>
        </ToastProvider>
      </ThemeProvider>
    );
  }
}

export default OdysseyApp;
