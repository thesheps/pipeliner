export interface Job {
  id: string;
  environment: string;
  name: string;
  awsRegion: string;
  repoUrl: string;
  repoUsernameKey: string;
  repoPasswordKey: string;
  workspaceDir: string;
  configFilename: string;
}
