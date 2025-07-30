import { githubService } from '@/services/GitHubService';
import { SearchParams } from '@/types';
import { useQuery } from '@tanstack/react-query';


export const useRepositorySearch = (params: SearchParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['repositories', 'search', params],
    queryFn: () => githubService.searchRepositories(params),
    enabled: enabled && !!params.query,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useRepository = (owner: string, repo: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['repository', owner, repo],
    queryFn: () => githubService.getRepository(owner, repo),
    enabled: enabled && !!owner && !!repo,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useRepositoryReadme = (owner: string, repo: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['repository', 'readme', owner, repo],
    queryFn: () => githubService.getReadme(owner, repo),
    enabled: enabled && !!owner && !!repo,
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: false, // Some repos don't have README
  });
};