import { useState } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../../../services/api/axiosClient";

function Search({ onSendChallenge }) {
  const { user } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sendingChallenge, setSendingChallenge] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    if (searchTerm.trim().length < 2) {
      setError("Search term must be at least 2 characters");
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.get(
        `/onevsone/search?firstName=${encodeURIComponent(searchTerm.trim())}`
      );

      console.log("Search response:", response.data);

      const results = Array.isArray(response.data) 
        ? response.data.filter((u) => u._id !== user._id)
        : [];

      setSearchResults(results);

      if (results.length === 0) {
        setError("No players found matching your search");
      }
    } catch (err) {
      console.error("Search failed:", err);
      console.error("Error details:", err.response?.data);
      
      if (err.response?.status === 400) {
        setError(
          err.response.data.message || "Search term must be at least 2 characters"
        );
      } else if (err.response?.status === 401) {
        setError("Please log in to search for players");
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else {
        setError("Failed to search. Please check your connection and try again.");
      }
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChallengeClick = async (opponent) => {
    setSendingChallenge(opponent._id);
    setError(null);

    setSearchResults((prev) => prev.filter((u) => u._id !== opponent._id));

    try {
      await onSendChallenge(opponent);
    } catch (err) {
      setError("Failed to send challenge. Please try again.");
      setSearchResults((prev) => [...prev, opponent]);
    } finally {
      setSendingChallenge(null);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setError(null);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value === "") {
                setSearchResults([]);
                setError(null);
              }
            }}
            placeholder="Search by name or email (minimum 2 characters)..."
            className="w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-100 placeholder-gray-400 transition-colors"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400 transition-colors"
            >
              ✕
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={
            !searchTerm.trim() || loading || searchTerm.trim().length < 2
          }
          className="px-6 py-3 bg-amber-500 text-gray-900 font-semibold rounded-lg hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <span className="flex items-center">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></span>
              Searching...
            </span>
          ) : (
            "Search"
          )}
        </button>
      </form>

      {error && (
        <div
          className={`mb-6 p-4 rounded-lg border-2 text-center ${
            error.includes("No players found") || error.includes("Please log in")
              ? "bg-yellow-900/30 border-yellow-700 text-yellow-400"
              : "bg-red-900/30 border-red-700 text-red-400"
          }`}
        >
          <div className="flex items-center justify-center">
            {error.includes("No players found") ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {error}
          </div>
        </div>
      )}

      <div className="space-y-4">
        {searchResults.length > 0 ? (
          <>
            <div className="text-sm text-gray-400">
              Found {searchResults.length} player
              {searchResults.length !== 1 ? "s" : ""}
            </div>
            {searchResults.map((result) => (
              <div
                key={result._id}
                className="flex items-center p-4 bg-gray-800 border-2 border-gray-700 rounded-lg shadow-sm hover:shadow-md hover:border-amber-500/50 transition-all"
              >
                <div className="text-2xl flex justify-center items-center text-amber-400 bg-gray-900 border-2 border-amber-500/30 rounded-xl w-16 h-16">
                  {result.firstName?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="font-bold text-gray-100 text-lg">
                    {result.firstName} {result?.lastName || ''}
                  </h3>
                  <p className="text-sm text-gray-400">{result.emailId}</p>
                </div>
                <button
                  onClick={() => handleChallengeClick(result)}
                  disabled={sendingChallenge === result._id}
                  className="ml-auto px-6 py-3 bg-amber-500 text-gray-900 font-semibold rounded-lg hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {sendingChallenge === result._id ? (
                    <span className="flex items-center">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></span>
                      Sending...
                    </span>
                  ) : (
                    "Challenge"
                  )}
                </button>
              </div>
            ))}
          </>
        ) : (
          !loading &&
          searchTerm && (
            <div className="text-center py-10">
              <div className="mx-auto bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl w-16 h-16 flex items-center justify-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-100">
                No players found
              </h3>
              <p className="mt-1 text-gray-400">
                Try searching with a different name or email
              </p>
            </div>
          )
        )}

        {!searchTerm && !loading && (
          <div className="text-center py-10">
            <div className="mx-auto bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl w-16 h-16 flex items-center justify-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-100">
              Search for Players
            </h3>
            <p className="mt-1 text-gray-400">
              Enter a name or email to find opponents (minimum 2 characters)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;