import React from 'react';
import { ExternalLink } from 'lucide-react';
import { GitHubRepository } from '../../../types';


interface RepositoryHeaderProps {
  repository: GitHubRepository;
}

const RepositoryHeader: React.FC<RepositoryHeaderProps> = ({ repository }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start space-x-4">
        {/* Owner Avatar */}
        <img
          src={repository.owner.avatar_url}
          alt={repository.owner.login}
          className="w-16 h-16 rounded-full"
        />

        {/* Repository Info */}
        <div className="flex-1 min-w-0">
          {/* Owner Name with Link */}
          <div className="mb-2">
            <a
              href={repository.owner.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-lg font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              {repository.owner.login}
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>

          {/* Repository Name with Link */}
          <div className="mb-3">
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {repository.name}
              <ExternalLink className="h-5 w-5 ml-2" />
            </a>
          </div>

          {/* Description */}
          {repository.description && (
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
              {repository.description}
            </p>
          )}

          {/* Full Name */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">Full name:</span> {repository.full_name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryHeader;