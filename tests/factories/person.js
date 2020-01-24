const models = require("../../api/models");

const data = async (props = {}) => {
  const defaultProps = {
    identityId: "",
    isBattlepassComplete: false
  };
  return { ...defaultProps, ...props };
};

const personFactory = async (props = {}) => {
  return models.Person.create(await data(props));
};

module.exports = personFactory;
