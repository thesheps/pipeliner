import { Dockest } from "dockest";
import { DockestService } from "dockest/dist/@types";

const dockest = new Dockest({});

const dockestServices: DockestService[] = [
  {
    serviceName: "db",
    commands: ["sequelize db:migrate"],
    readinessCheck: async ({
      defaultReadinessChecks: { postgres },
      dockerComposeFileService: {
        environment: { POSTGRES_DB, POSTGRES_USER }
      }
    }) =>
      Promise.all([
        (new Promise(resolve => {
          setTimeout(resolve, 50);
        }),
        postgres({ POSTGRES_DB, POSTGRES_USER }))
      ])
  }
];

dockest.run(dockestServices);
