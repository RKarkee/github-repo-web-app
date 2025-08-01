import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useRepository, useRepositoryReadme } from "../../../hooks/useQueryHooks";
import LoadingSpinner from "../../../common/loadingSpinner";
import ErrorMessage from "../../../common/errorMessage";
import RepositoryHeader from "../repositoryHeader";
import RepositoryStats from "../../../components/repoStats";
import ReadmeRenderer from "../../../components/readme/ReadmeRenderer";

const RepositoryDetail: React.FC = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();

  const {
    data: repository,
    isLoading: isLoadingRepo,
    error: repoError,
  } = useRepository(owner!, repo!, !!(owner && repo));
  const {
    data: readme,
    isLoading: isLoadingReadme,
    error: readmeError,
  } = useRepositoryReadme(owner!, repo!, !!(owner && repo));

  if (isLoadingRepo) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 p-6">
        <div className="max-w-6xl mx-auto">
          <LoadingSpinner message="Loading repository details..." />
        </div>
      </div>
    );
  }

  if (repoError || !repository) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Search
            </Link>
          </div>
          <ErrorMessage
            message={repoError?.message || "Repository not found"}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back Button */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Link>
        </div>

        {/* Repository Header */}
        <RepositoryHeader repository={repository} />

        {/* Repository Stats */}
        <RepositoryStats repository={repository} />

        {/* README Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              README.md
            </h2>
          </div>
          <div className="p-6">
            <ReadmeRenderer
              readme={readme}
              isLoading={isLoadingReadme}
              error={readmeError}
              repositoryUrl={repository.html_url}
              username={repository.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryDetail;
