import * as React from "react";
import Head from "next/head";
import HeaderComponent from "./HeaderComponent";
import { Footer } from "../styles";

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = (props) => {
  const { children, title = "This is the default title" } = props;
  return (
    <div style={{ height: "100%" }}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HeaderComponent />
      <div style={{ height: "80%", paddingTop: "1px" }}>{children}</div>
      <Footer>
        <h3>© 2020 HackSC.</h3>
        <h3>All rights reserved.</h3>
      </Footer>
    </div>
  );
};

export default Layout;
