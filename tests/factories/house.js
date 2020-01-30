const models = require("../../api/models");
const faker = require("faker");

const data = (props = {}) => {
  const defaultProps = {
    name: faker.company.companyName(),
    color: faker.internet.color()
  };
  return { ...defaultProps, ...props };
};

const houseFactory = (props = {}) => {
  console.log("Creating House", props);
  return models.House.create(data(props));
};

module.exports = houseFactory;
