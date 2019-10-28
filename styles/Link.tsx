import React from "react";
import { default as NextLink } from "next/link";

type LinkProps = {
  href: string;
  as?: string;
  target?: string;
  children: React.ReactNode;
};

const Link = ({ href, as, target, children }: LinkProps) => (
  <NextLink href={href} as={as ? as : href}>
    <a target={target ? target : "_self"}>{children}</a>
  </NextLink>
);

export default Link;
