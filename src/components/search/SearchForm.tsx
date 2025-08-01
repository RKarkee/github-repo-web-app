import React, { useState } from "react";
import { Search } from "lucide-react";
import { SearchParams } from "../../types";
import { DEFAULT_PER_PAGE, DEFAULT_SORT } from "../../constants";

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  isLoading = false,
}) => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"stars" | "forks" | "updated">(DEFAULT_SORT);
  const [perPage, setPerPage] = useState<10 | 25 | 50>(DEFAULT_PER_PAGE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch({
        query: query.trim(),
        sort,
        order: "desc",
        per_page: perPage,
        page: 1,
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Search
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or jump to..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            disabled={isLoading}
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort by
            </label>
            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value as "stars" | "forks" | "updated")
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            >
              <option value="stars">Stars</option>
              <option value="forks">Forks</option>
              <option value="updated">Recently Updated</option>
            </select>
          </div>

          {/* Results Per Page */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Results per page
            </label>
            <select
              value={perPage}
              onChange={(e) =>
                setPerPage(Number(e.target.value) as 10 | 25 | 50)
              }
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? "Searching..." : "Search Repositories"}
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
