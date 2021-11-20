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

declare type MajorEvents = {
  result: Array<MajorEvent>;
};

declare type MajorEvent = {
  id: number;
  name: string;
  isHackathon: boolean;
  start_date: Date;
  end_date: Date;
};

declare type API = {
  id: number;
  name: string;
  description: string;
  major_event: boolean;
  image_url: string;
  slack_channel: string;
  links: Array<ApiLink>;
};

declare type ApiLink = {
  id: number;
  name: string;
  link: string;
  api_id: number;
};

declare type PendingTeammateRequests = {
  id: number;
  teamId: number;
  hackerProfileId: string;
  ownder: "team" | "hacker";
  createdAt: Date;
  updatedAt: Date;
};

declare type HackathonConstant = {
  id: number;
  name: string;
  boolean: boolean;
  date: Date;
  type: "string" | "boolean" | "date";
};

declare type Judging = {
  id: number;
  judgeId: string;
  teamId: number;
  vertical: string;
  notes: string;
  judged: boolean;
  score: number;
  startsAt: Date;
  zoomLink: string;
  sponsor: string;
  endsAt: Date;
};

declare type Profile = {
  id: number;
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
  role: "hacker" | "admin" | "sponsor" | "volunteer" | "superadmin" | "judge";
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
  inPerson: boolean;
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
  qrCodeId: string;
  isBattlepassComplete?: boolean;
  lookingForTeam: boolean;
  portfolioUrl: string;
  instagram: string;
  bio: string;
  profilePic: string;
  raffleTickets: number;
};

declare type Team = {
  name: string;
  teamCode: string;
  ownerId: string;
  HackerProfiles: Array<Object>;
  lookingForTeammates: boolean;
  description: string;
  members: Array<Profile>;
};

declare type QueryParamValues = {
  referrerCode?: string;
};

declare type CookieValues = {
  referrerCode?: string;
};

declare type Person = {
  Profile: Profile;
  Contributions: Contribution[];
  identityId: StringID;
  isBattlepassComplete: boolean;
  Home: House;
  totalPoints?: number;
};

declare type Prize = {
  title: string;
  description: string;
  id: NumberID;
  sponsor: string;
  image_url: string;
  info_url: string;
  sponsor_url: string;
};

declare type House = {
  id: NumberID;
  HouseMembers: Person[];
  name: string;
  color: string;
  totalScore: number;
};

declare type Contribution = {
  Person: Person;
  Task: Task;
  multiplier: number;
  scannerId: StringID;
  createdAt: Date;
};

declare type SignUp = {
  email: string;
  ip: string;
  created_at: Date;
};

declare type ProjectTeam = {
  name: StringID;
  devpostLink: string;
  githubLink: string;
  Members: Person[];
  Prizes: Prize[];
};

declare type Battlepass = BattlepassObject[];

declare type BattlepassObject = {
  id: StringID;
  isPremium: boolean;
  pointValue: number;
  prizeName: string;
  unlocked: boolean;
  minimum: number;
};

declare type Announcement = {
  img: string;
  from: string;
  text: string;
  target: string;
};

interface Task {
  points: number;
  description: string;
  blocking: boolean;
  type: string;
  isGroupTask: boolean;
  isActive: boolean;
  name: string;
  id: NumberID;
  sponsor: string;
  isPast: boolean;
}

interface ActiveTask extends Task {
  isActive: true;
}

//ID's have additional semantic meaning beyond string or number
declare type ResourceID = (string | number) & { __type: "ResourceID" };
declare type StringID = ResourceID & string;
declare type NumberID = ResourceID & number;

declare type GetRoute = string & { __type: "GetRoute" };
declare type PostRoute = string & { __type: "PostRoute" };
declare type PutRoute = string & { __type: "PutRoute" };
declare type DeleteRoute = string & { __type: "DeleteRoute" };
declare type Route = GetRoute & PostRoute & PutRoute & DeleteRoute;

declare type APIResponse<T> = {
  success?: T;
  error?: string;
};

declare type TeamSuggestion = {
  hackerProfiles: Array<Profile>;
};
