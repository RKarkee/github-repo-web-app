export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  default_branch: string;
  created_at: string;
  language: string | null;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

export interface GitHubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepository[];
}

export interface SearchParams {
  query: string;
  sort?: "stars" | "forks" | "updated";
  order?: "asc" | "desc";
  per_page?: 10 | 25 | 50;
  page?: number;
}

export interface GitHubReadme {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content: string;
  encoding: string;
}
