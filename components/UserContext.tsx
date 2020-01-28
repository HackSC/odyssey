import React from "react";

type Context = {
  profile?: Profile;
};
const UserContext = React.createContext<Context>({});

export default UserContext;
