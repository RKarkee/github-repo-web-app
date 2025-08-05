import React from "react";
import {
  Star,
  GitFork,
  Eye,
  AlertCircle,
  GitBranch,
  Calendar,
} from "lucide-react";
import { GitHubRepository } from "../../types";

interface RepositoryStatsProps {
  repository: GitHubRepository;
}

const RepositoryStats: React.FC<RepositoryStatsProps> = ({ repository }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const stats = [
    {
      icon: Star,
      label: "Stars",
      value: formatNumber(repository.stargazers_count),
      color: "text-yellow-600 dark:text-yellow-400",
    },
    {
      icon: GitFork,
      label: "Forks",
      value: formatNumber(repository.forks_count),
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Eye,
      label: "Watchers",
      value: formatNumber(repository.watchers_count),
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: AlertCircle,
      label: "Open Issues",
      value: formatNumber(repository.open_issues_count),
      color: "text-red-600 dark:text-red-400",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Repository Statistics
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div key={stat.label} className="text-center">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 mb-2 ${stat.color}`}
              >
                <IconComponent className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

   
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <GitBranch className="h-5 w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Default Branch
            </div>
            <div className="font-medium text-gray-900 dark:text-white break-all">
              {repository.default_branch}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 md:justify-end">
          <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Last Updated
            </div>
            <div className="font-medium text-gray-900 dark:text-white break-all">
              {formatDate(repository.updated_at)}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RepositoryStats;
