export interface CreateJob {
  name: string;
  repoUrl: string;
  repoUsername: string;
  repoPassword: string;
  workspaceDir: string;
  configFilename: string;
}
