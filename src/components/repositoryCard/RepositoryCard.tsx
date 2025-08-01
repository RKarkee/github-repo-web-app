import React from "react";
import { Link } from "react-router-dom";
import { Star, GitFork, Eye, Calendar } from "lucide-react";
import { GitHubRepository } from "../../types";

interface RepositoryCardProps {
  repository: GitHubRepository;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200">
      {/* Repository Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={repository.owner.avatar_url}
            alt={repository.owner.login}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <Link
              to={`/repository/${repository.owner.login}/${repository.name}`}
              className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              {repository.name}
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              by {repository.owner.login}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      {repository.description && (
        <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
          {repository.description}
        </p>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4" />
            <span>{formatNumber(repository.stargazers_count)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <GitFork className="h-4 w-4" />
            <span>{formatNumber(repository.forks_count)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>{formatNumber(repository.watchers_count)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4" />
          <span>Updated {formatDate(repository.updated_at)}</span>
        </div>
      </div>
    </div>
  );
};

export default RepositoryCard;
