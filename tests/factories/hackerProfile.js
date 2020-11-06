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
    year: "",
    skillLevel: "",
    questionOne: faker.company.bs(),
    questionTwo: faker.company.bs(),
    questionThree: faker.company.bs(),
    role: "hacker",
    graduationDate: "",
    over18: true,
    needBus: false,
    links: "",
    codeOfConduct: true,
    authorize: true,
    marketing: "",
    promoCode: faker.random.uuid(),
    travelOrigin: "",
    travelMethod: "",
    shirtSize: "",
    travelPlan: "",
    dietaryRestrictions: "",
    confirmCodeOfConduct: true,
    noBusCheck: true,
    confirmedAt: faker.date.recent(20),
    declinedAt: "",
  };
  return { ...defaultProps, ...props };
};

const hackerProfileFactory = (props = {}) => {
  console.log("Creating HP", props);
  return models.HackerProfile.create(data(props));
};

module.exports = hackerProfileFactory;
