// All Odyssey specific types go here :)

declare type FormStepProps = {
  user?: User;
  profile?: any;
  children?: React.ReactNode;
};

declare type FormStep = {
  title: string;
  component: React.FunctionComponent<FormStepProps>;
};

declare type Profile = {
  gender: "male" | "female" | "other";
  userId: string;
  ethnicity: string;
  email: string;
  major: string;
  minor: string;
  resume: string;
  skills: string;
  interests: string;
  applicationSubmittedAt: Date;
  profileSubmittedAt: Date;
  status:
    | "unverified"
    | "verified"
    | "profileSubmitted"
    | "applicationSubmitted"
    | "accepted"
    | "waitlisted"
    | "rejected"
    | "confirmed"
    | "checkedIn";
  firstName: string;
  lastName: string;
  phoneNumber: string;
  school: string;
  year: "Freshman" | "Sophomore" | "Junior" | "Senior" | "Graduate";
  skillLevel: "Beginner" | "Intermediate" | "Advanced";
  questionOne: string;
  questionTwo: string;
  questionThree: string;
  role: "hacker" | "admin" | "sponsor" | "superadmin";
};
