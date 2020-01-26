const models = require("../../api/models");

const data = (props = {}) => {
  const defaultProps = {
    identityId: "",
    isBattlepassComplete: false
  };
  return { ...defaultProps, ...props };
};

const personFactory = (props = {}) => {
  console.log("Creating Person", props);
  return models.Person.create(data(props));
};

module.exports = personFactory;
