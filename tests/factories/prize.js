const faker = require("faker");

const models = require("../../api/models");

const data = (props = {}) => {
  const defaultProps = {
    title: faker.commerce.productName(),
    description: faker.company.catchPhrase(),
  };
  return { ...defaultProps, ...props };
};

const prizeFactory = async (props = {}) => {
  console.log("Creating Prize", props);
  return models.Prize.create(data(props));
};

module.exports = prizeFactory;
