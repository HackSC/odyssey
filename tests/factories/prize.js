const faker = require("faker");

const models = require("../../api/models");

const data = async (props = {}) => {
  const defaultProps = {
    title: faker.commerce.productName(),
    description: faker.company.catchPhrase()
  };
  return { ...defaultProps, ...props };
};

const prizeFactory = async (props = {}) => {
  return models.Prize.create(await data(props));
};

module.exports = prizeFactory;
