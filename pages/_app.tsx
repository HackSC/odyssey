import React from "react";
import App from "next/app";
import { ThemeProvider } from "styled-components";
import { hotjar } from "react-hotjar";
import * as Sentry from "@sentry/browser";

import { persistLinkReferrerCode } from "../lib/referrerCode";
import "react-tippy/dist/tippy.css";

import { Theme, GlobalStyles } from "../styles";
import { ToastProvider } from "react-toast-notifications";

class OdysseyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    persistLinkReferrerCode(ctx, ctx.query);

    return { pageProps };
  }

  componentDidMount() {
    // Let's just hardcode the hotjar
    if (process.env.NODE_ENV === "production") {
      hotjar.initialize("1547187");
    }

    if (typeof window !== "undefined") {
      Sentry.init({
        dsn: "https://1a18ac7b9aa94cb5b2a8c9fc2f7e4fc8@sentry.io/1801129",
        environment:
          process.env.NODE_ENV !== "production" ? "dev" : "production"
      });
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={Theme}>
        <ToastProvider autoDismiss={true} autoDismissTimeout={3000}>
          <>
            <GlobalStyles />
            <Component {...pageProps} />
          </>
        </ToastProvider>
      </ThemeProvider>
    );
  }
}

export default OdysseyApp;
