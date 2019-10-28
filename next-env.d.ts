/// <reference types="next" />
/// <reference types="next/types/global" />

// Not really sure what to do with types
declare type FormStep = {
  title: string;
  component: React.FunctionComponent<any>;
};

declare module "*.png";
declare module "*.svg";
