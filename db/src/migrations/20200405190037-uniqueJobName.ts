export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Jobs", ["name"], {
      type: "unique",
      name: "unique_name",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Jobs", "unique_name");
  },
};
