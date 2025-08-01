import React, { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import SearchForm from "./SearchForm";
import RepositoryCard from "../repositoryCard";
import Pagination from "../pagination";
import { SearchParams } from "../../types";
import { useRepositorySearch } from "../../hooks/useQueryHooks";

const SearchContainer: React.FC = () => {
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  const { data, isLoading, error, isFetching } = useRepositorySearch(
    searchParams || { query: "" },
    !!searchParams
  );

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    if (searchParams) {
      setSearchParams({ ...searchParams, page });
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <SearchForm onSearch={handleSearch} isLoading={isLoading || isFetching} />

      {/* Loading State */}
      {(isLoading || isFetching) && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            Searching repositories...
          </span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-red-700 dark:text-red-300">
              Error: {error.message}
            </span>
          </div>
        </div>
      )}

      {/* Results */}
      {data && !isLoading && !isFetching && (
        <>
          {/* Results Summary */}
          <div className="text-gray-600 dark:text-gray-400">
            Found {data.total_count.toLocaleString()} repositories
          </div>

          {/* Repository List */}
          {data.items.length > 0 ? (
            <div className="space-y-4">
              {data.items.map((repository) => (
                <RepositoryCard key={repository.id} repository={repository} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No repositories found. Try adjusting your search terms.
              </p>
            </div>
          )}

          {/* Pagination */}
          {data.items.length > 0 && searchParams && (
            <Pagination
              currentPage={searchParams.page || 1}
              totalResults={data.total_count}
              resultsPerPage={searchParams.per_page || 25}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SearchContainer;
