import { GitHubReadme, GitHubRepository, GitHubSearchResponse, SearchParams } from "@/types";

const GITHUB_API_BASE = 'https://api.github.com';

class GitHubService {
  private async makeRequest<T>(url: string): Promise<T> {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }

  async searchRepositories(params: SearchParams): Promise<GitHubSearchResponse> {
    const { query, sort = 'stars', order = 'desc', per_page = 25, page = 1 } = params;
    
    const searchParams = new URLSearchParams({
      q: query,
      sort,
      order,
      per_page: per_page.toString(),
      page: page.toString(),
    });

    const url = `${GITHUB_API_BASE}/search/repositories?${searchParams}`;
    return this.makeRequest<GitHubSearchResponse>(url);
  }

  async getRepository(owner: string, repo: string): Promise<GitHubRepository> {
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}`;
    return this.makeRequest<GitHubRepository>(url);
  }

  async getReadme(owner: string, repo: string): Promise<GitHubReadme> {
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/readme`;
    return this.makeRequest<GitHubReadme>(url);
  }
}

export const githubService = new GitHubService();