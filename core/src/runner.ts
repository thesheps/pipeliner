import * as fs from "fs";
import http from "isomorphic-git/http/node";
import { SecretsManager } from "aws-sdk";
import { clone } from "isomorphic-git";

import { Job } from "./Job";
import { execute } from "./execute";
import { parse } from "./parse";

const getKeyPath = (env: string, key: string) => {
  return `grunt/${env}/${key}`;
};

export class Runner {
  async execute(job: Job) {
    const secretsManager = new SecretsManager({ region: "eu-west-1" });
    const repoUsernameKey = getKeyPath(job.environment, job.repoUsernameKey);
    const repoPasswordKey = getKeyPath(job.environment, job.repoPasswordKey);

    const username = await secretsManager
      .getSecretValue({ SecretId: repoUsernameKey })
      .promise();

    const password = await secretsManager
      .getSecretValue({ SecretId: repoPasswordKey })
      .promise();

    await clone({
      http,
      fs,
      url: job.repoUrl,
      dir: job.workspaceDir,
      onAuth: () => ({
        username: username.SecretString,
        password: password.SecretString
      })
    });

    const config = parse(job.configFilename);
    execute(config);
  }
}
