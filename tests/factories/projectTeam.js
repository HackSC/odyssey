const faker = require("faker");

const models = require("../../api/models");

const data = (props = {}) => {
  const defaultProps = {
    name: faker.hacker.noun(),
    devpostLink: faker.internet.url(),
    githubLink: faker.internet.url()
  };
  return { ...defaultProps, ...props };
};

const projectTeamFactory = async (props = {}) => {
  return models.ProjectTeam.create(data(props));
};

module.exports = projectTeamFactory;
