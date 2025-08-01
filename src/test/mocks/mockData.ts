import { GitHubRepository, GitHubReadme } from "../../types";

export const mockRepository: GitHubRepository = {
  id: 1,
  name: "test-repo",
  full_name: "test-owner/test-repo",
  description: "A test repository for unit testing",
  html_url: "https://github.com/test-owner/test-repo",
  stargazers_count: 100,
  forks_count: 50,
  watchers_count: 25,
  open_issues_count: 5,
  language: "TypeScript",
  created_at: "2023-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
  default_branch: "main",
  owner: {
    login: "test-owner",
    avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
    html_url: "https://github.com/test-owner",
  },
};

export const mockSearchResponse = {
  total_count: 1,
  incomplete_results: false,
  items: [mockRepository],
};

export const mockRepositories: GitHubRepository[] = [
  mockRepository,
  {
    ...mockRepository,
    id: 2,
    name: "another-repo",
    full_name: "test-owner/another-repo",
    description: "Another test repository",
    stargazers_count: 200,
  },
];

export const mockReadme: GitHubReadme = {
  name: "README.md",
  path: "README.md",
  sha: "abc123",
  size: 1000,
  url: "https://api.github.com/repos/test-owner/test-repo/contents/README.md",
  html_url: "https://github.com/test-owner/test-repo/blob/main/README.md",
  git_url: "https://api.github.com/repos/test-owner/test-repo/git/blobs/abc123",
  download_url:
    "https://raw.githubusercontent.com/test-owner/test-repo/main/README.md",
  type: "file",
  content: btoa(
    '# Test Repository\n\nThis is a test README file with **markdown** content.\n\n## Features\n\n- Feature 1\n- Feature 2\n\n```javascript\nconsole.log("Hello, World!");\n```'
  ),
  encoding: "base64",
};
