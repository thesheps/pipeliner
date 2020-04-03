export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Users", ["emailAddress"], {
      type: "unique",
      name: "unique_emailAddress"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Users", "unique_emailAddress");
  }
};
