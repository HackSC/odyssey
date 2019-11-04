import React from "react";
import App from "next/app";
import { ThemeProvider } from "styled-components";
import { hotjar } from "react-hotjar";

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
