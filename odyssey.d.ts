// All Odyssey specific types go here :)

declare type FormStepProps = {
  user?: User;
  children?: React.ReactNode;
};

declare type FormStep = {
  title: string;
  component: React.FunctionComponent<FormStepProps>;
};

declare type User = {
  displayName: string;
  id: string;
  user_id: string;
  name: {
    familyName: string;
    givenName: string;
  };
  emails: [
    {
      value: string;
    }
  ];
  picture: string;
  locale: string;
  nickname: string;
  _json: {
    sub: string;
    given_name: string;
    family_name: string;
    nickname: string;
    name: string;
    picture: string;
    locale: string;
    updated_at: string;
    email: string;
    email_verified: boolean;
  };
  _raw: string;
};
