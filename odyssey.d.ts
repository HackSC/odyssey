// All Odyssey specific types go here :)

declare type FormStepProps = {
  user?: User;
  profile?: any;
  children?: React.ReactNode;
};

declare type FormStep = {
  title: string;
  slug: string;
  component: React.FunctionComponent<FormStepProps>;
};

declare type Profile = {
  gender: "male" | "female" | "non-binary" | "other" | "no-say";
  userId: ResourceID;
  ethnicity: string;
  email: string;
  major: string;
  minor: string;
  resume: string;
  skills: string;
  interests: string;
  submittedAt: Date;
  status:
    | "unverified"
    | "verified"
    | "submitted"
    | "accepted"
    | "waitlisted"
    | "rejected"
    | "confirmed"
    | "declined"
    | "checkedIn";
  firstName: string;
  lastName: string;
  phoneNumber: string;
  school: string;
  year: "freshman" | "sophomore" | "junior" | "senior" | "graduate";
  skillLevel: "beginner" | "intermediate" | "advanced";
  questionOne: string;
  questionTwo: string;
  questionThree: string;
  role: "hacker" | "admin" | "sponsor" | "superadmin";
  graduationDate:
    | "spring-2020"
    | "fall-2020"
    | "spring-2021"
    | "fall-2021"
    | "spring-2022"
    | "fall-2022"
    | "spring-2023"
    | "fall-2023"
    | "other";
  over18: boolean;
  needBus: boolean;
  links: string;
  codeOfConduct: boolean;
  authorize: boolean;
  marketing: string;
  promoCode: string;
  referrerCode: string;
  referred: Profile[];
  teamId: string;
  team: Team;
};

declare type Team = {
  name: string;
  teamCode: string;
  ownerId: string;
  HackerProfiles: Array<Object>;
};

declare type QueryParamValues = {
  referrerCode?: string;
};

declare type CookieValues = {
  referrerCode?: string;
};

declare type Person = {
  Profile: Profile;
  identityId: ResourceID;
};

declare type Prize = {
  title: string;
  description: string;
  id: ResourceID;
};

declare type ProjectTeam = {
  name: ResourceID;
  devpostLink: string;
  githubLink: string;
  Members: Person[];
  Prizes: Prize[];
};

//ID's have additional semantic meaning beyond string or number
declare type ResourceID = (string | number) & { __type: "ResourceID" };

declare type GetRoute = string & { __type: "GetRoute" };
declare type PostRoute = string & { __type: "PostRoute" };
declare type PutRoute = string & { __type: "PutRoute" };
declare type DeleteRoute = string & { __type: "DeleteRoute" };
declare type Route = GetRoute & PostRoute & PutRoute & DeleteRoute;

declare type APIResponse<T> = {
  success?: T;
  error?: string;
};
