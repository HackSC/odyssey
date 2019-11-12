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
  userId: string;
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
};
