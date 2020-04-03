import { SecretsManager } from "aws-sdk";
import { clone } from "isomorphic-git";

import { Job } from "../Job";
import { Runner } from "../runner";
import { execute } from "../execute";
import { parse } from "../parse";

const existingFilename = "pipeliner.json";
const testConfig = {
  pipeline: "myTestPipeline",
  workingDirectory: "myWorkingDirectory"
};

jest.mock("fs", () => {});
jest.mock("aws-sdk");
jest.mock("isomorphic-git");
jest.mock("../execute");
jest.mock("../parse");

const parseMock = parse as jest.Mock;
parseMock.mockReturnValue(testConfig);

describe("Runner", () => {
  const mockGetSecretValue = jest.fn();
  const mockPromise = jest.fn();

  const job: Job = {
    id: "job-1",
    name: "My lovely Horse",
    environment: "dev",
    awsRegion: "eu-west-1",
    repoUsernameKey: "My Username",
    repoPasswordKey: "My Password",
    workspaceDir: "workspace",
    repoUrl: "repoUrl",
    configFilename: existingFilename
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockPromise
      .mockResolvedValueOnce({ SecretString: "JoeBloggs" })
      .mockResolvedValueOnce({ SecretString: "DeadStrongPassword" });

    SecretsManager.prototype.getSecretValue = mockGetSecretValue;
    mockGetSecretValue.mockReturnValue({
      promise: mockPromise
    });
  });

  describe("Credentials management", () => {
    it("obtains credentials from AWS Params Store", async () => {
      const runner = new Runner();
      await runner.execute(job);

      expect(mockGetSecretValue).toHaveBeenNthCalledWith(1, {
        SecretId: `grunt/${job.environment}/${job.repoUsernameKey}`
      });

      expect(mockGetSecretValue).toHaveBeenNthCalledWith(2, {
        SecretId: `grunt/${job.environment}/${job.repoPasswordKey}`
      });
    });

    it("clones the named repository using the provided creds", async () => {
      const runner = new Runner();
      await runner.execute(job);

      expect(clone).toHaveBeenCalledWith(
        expect.objectContaining({
          fs: expect.any(Object),
          http: expect.any(Object),
          url: job.repoUrl,
          dir: job.workspaceDir,
          onAuth: expect.any(Function)
        })
      );
    });

    it("parses and executes the specified job details", async () => {
      const runner = new Runner();
      await runner.execute(job);

      expect(parseMock).toHaveBeenCalledWith(job.configFilename);
      expect(execute).toHaveBeenCalledWith(testConfig);
    });
  });
});
