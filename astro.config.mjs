import { defineConfig } from 'astro/config';

const owner = process.env.GITHUB_REPOSITORY_OWNER;
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const isUserPage =
  owner && repoName && repoName.toLowerCase() === `${owner.toLowerCase()}.github.io`;

const site = process.env.SITE_URL || (owner ? `https://${owner}.github.io` : 'https://example.com');
const base = isGithubActions && repoName && !isUserPage ? `/${repoName}` : '/';

export default defineConfig({
  site,
  base,
  output: 'static'
});
