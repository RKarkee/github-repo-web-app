import React from "react";
import { FileText } from "lucide-react";
import { GitHubReadme } from "@/types";
import LoadingSpinner from "@/common/loadingSpinner";

interface ReadmeRendererProps {
  readme: GitHubReadme | undefined;
  isLoading: boolean;
  error: Error | null;
  repositoryUrl: string;
}

const ReadmeRenderer: React.FC<ReadmeRendererProps> = ({
  readme,
  isLoading,
  error,
  repositoryUrl,
}) => {
  const decodeBase64 = (encoded: string): string => {
    try {
      return atob(encoded.replace(/\s/g, ""));
    } catch {
      return "Error decoding README content";
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading README..." />;
  }

  if (error || !readme) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <div className="text-gray-600 dark:text-gray-400">
          {error ? "Failed to load README" : "No README found"}
        </div>
        <a
          href={`${repositoryUrl}#readme`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          View on GitHub
        </a>
      </div>
    );
  }

  const content =
    readme.encoding === "base64"
      ? decodeBase64(readme.content)
      : readme.content;

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      {/* Simple markdown-like rendering */}
      <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-auto max-h-96">
        {content}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <a
          href={`${repositoryUrl}#readme`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors text-sm"
        >
          View formatted README on GitHub
        </a>
      </div>
    </div>
  );
};

export default ReadmeRenderer;
