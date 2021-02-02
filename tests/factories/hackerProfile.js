const faker = require("faker");
const models = require("../../api/models");

const data = (props = {}) => {
  const defaultProps = {
    gender: "male",
    userId: faker.random.uuid(),
    travelStatus: "ineligible",
    ethnicity: "",
    email: faker.internet.email(),
    major: "",
    minor: "",
    resume: "",
    skills: "",
    interests: "",
    submittedAt: faker.date.past(2),
    status: "confirmed",
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phoneNumber: faker.phone.phoneNumber(),
    school: "",
    year: "freshman",
    skillLevel: "beginner",
    questionOne: faker.company.bs(),
    questionTwo: faker.company.bs(),
    questionThree: faker.company.bs(),
    role: "hacker",
    graduationDate: "spring-2020",
    over18: true,
    needBus: false,
    links: "",
    codeOfConduct: true,
    authorize: true,
    marketing: "",
    promoCode: faker.random.uuid(),
    travelOrigin: "",
    travelMethod: "driving",
    shirtSize: "m",
    travelPlan: "",
    dietaryRestrictions: "",
    confirmCodeOfConduct: true,
    noBusCheck: true,
    confirmedAt: faker.date.recent(20),
    declinedAt: faker.date.past(1),
    instagram: "",
    bio: "",
    slackProfile: "",
  };
  return { ...defaultProps, ...props };
};

const hackerProfileFactory = (props = {}) => {
  return models.HackerProfile.create(data(props));
};

module.exports = hackerProfileFactory;
