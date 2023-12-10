import { Octokit } from "@octokit/rest"

// NOTE rate limit for authenticated user is 5000 req/hour
// https://docs.github.com/en/rest/overview/rate-limits-for-the-rest-api?apiVersion=2022-11-28#primary-rate-limit-for-authenticated-users

export const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
  userAgent: "tifandotme/website",
})
