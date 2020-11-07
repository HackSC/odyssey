import React from "react";
import { default as NextLink } from "next/link";
import A from "./A";

type LinkProps = {
  href: string;
  as?: string;
  id?: string;
  target?: string;
  children: React.ReactNode;
  style?: Object;
};

const Link = ({ href, as, id, target, children, style }: LinkProps) => (
  <NextLink href={href} as={as ? as : href}>
    <A id={id} style={style} target={target ? target : "_self"}>
      {children}
    </A>
  </NextLink>
);

export default Link;
