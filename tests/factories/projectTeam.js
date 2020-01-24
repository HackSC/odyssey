const faker = require("faker");

const models = require("../../api/models");

const data = async (props = {}) => {
  const defaultProps = {
    name: faker.hacker.noun(),
    devpostLink: faker.internet.url(),
    githubLink: faker.internet.url()
  };
  return { ...defaultProps, ...props };
};

const projectTeamFactory = async (props = {}) => {
  return models.ProjectTeam.create(await data(props));
};

module.exports = projectTeamFactory;
