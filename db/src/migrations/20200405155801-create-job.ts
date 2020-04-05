export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Jobs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED,
      },
      ownerId: {
        allowNull: false,
        type: Sequelize.BIGINT.UNSIGNED,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      name: {
        type: Sequelize.STRING,
      },
      repoUrl: {
        type: Sequelize.STRING,
      },
      repoUsername: {
        type: Sequelize.STRING,
      },
      repoPassword: {
        type: Sequelize.STRING,
      },
      workspaceDir: {
        type: Sequelize.STRING,
      },
      configFilename: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Jobs");
  },
};
