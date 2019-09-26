import React, { useEffect, useState } from "react";
import fetch from "isomorphic-unfetch";

import { apiHost } from "../config";

const Home = ({ message }) => {
  return <div>{message ? message : "Loading..."}</div>;
};

Home.getInitialProps = async () => {
  const res = await fetch(`${apiHost}/api/random`);
  const json = await res.json();
  return { message: json.message };
};

export default Home;
