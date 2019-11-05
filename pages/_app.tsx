import React from "react";
import App from "next/app";
import { ThemeProvider } from "styled-components";
import { hotjar } from "react-hotjar";
import * as Sentry from "@sentry/browser";

import { Theme, GlobalStyles } from "../styles";

class OdysseyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    // Let's just hardcode the hotjar
    if (process.env.NODE_ENV === "production") {
      hotjar.initialize("1547187");
    }

    Sentry.init({
      dsn: "https://1a18ac7b9aa94cb5b2a8c9fc2f7e4fc8@sentry.io/1801129"
    });
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={Theme}>
        <>
          <GlobalStyles />
          <Component {...pageProps} />
        </>
      </ThemeProvider>
    );
  }
}

export default OdysseyApp;
