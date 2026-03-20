import { useState, useEffect } from 'react';
import axiosClient from '../../../services/api/axiosClient';

const SubmissionHistory = ({ problemId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/problem/submittedProblem/${problemId}`);
        setSubmissions(response.data || []);
      } catch (err) {
        console.error('Error fetching submissions:', err);
        setError('Failed to fetch submission history');
      } finally {
        setLoading(false);
      }
    };

    if (problemId) {
      fetchSubmissions();
    }
  }, [problemId]);

  const getStatusDisplay = (status) => {
    const statusMap = {
      accepted: { text: 'Accepted', color: 'text-green-400', bg: 'bg-green-800/30' },
      wrong: { text: 'Wrong Answer', color: 'text-red-400', bg: 'bg-red-800/30' },
      error: { text: 'Error', color: 'text-red-400', bg: 'bg-red-800/30' },
      pending: { text: 'Pending', color: 'text-yellow-400', bg: 'bg-yellow-800/30' },
      timeout: { text: 'Time Limit Exceeded', color: 'text-red-400', bg: 'bg-red-800/30' },
      default: { text: status || 'Unknown', color: 'text-gray-400', bg: 'bg-gray-800/30' }
    };
    return statusMap[status] || statusMap.default;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-3 text-gray-400 text-sm">Loading submissions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 my-4">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-5 w-5 text-red-400 mr-2" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-red-400 text-sm">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-amber-300 mb-4">Submission History</h2>
      
      {submissions.length === 0 ? (
        <div className="bg-gray-800 border border-amber-500/30 rounded-lg p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
          <p className="text-gray-400 text-sm">No submissions found for this problem</p>
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map((sub, index) => {
            const statusInfo = getStatusDisplay(sub.status);
            return (
              <div 
                key={sub._id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-amber-500/50 transition-colors cursor-pointer"
                onClick={() => setSelectedSubmission(sub)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-gray-400 text-sm font-mono">
                      #{index + 1}
                    </div>
                    <div className="font-mono text-sm text-gray-300 bg-gray-700 px-2 py-1 rounded">
                      {sub.language}
                    </div>
                    <div className={`text-sm font-medium ${statusInfo.color}`}>
                      {statusInfo.text}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-gray-400 text-sm">
                      {formatDate(sub.createdAt)}
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}

          <p className="text-gray-500 text-sm text-center mt-6">
            Showing {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Code View Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border-2 border-amber-500/30 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h3 className="font-bold text-lg text-amber-300">
                Submission Code
              </h3>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setSelectedSubmission(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-8rem)]">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className="font-mono text-sm text-gray-300 bg-gray-800 px-3 py-1 rounded border border-gray-700">
                  {selectedSubmission.language}
                </div>
                <div className={`text-sm font-medium ${getStatusDisplay(selectedSubmission.status).color}`}>
                  {getStatusDisplay(selectedSubmission.status).text}
                </div>
                <div className="text-gray-400 text-sm">
                  {formatDate(selectedSubmission.createdAt)}
                </div>
              </div>
              
              {selectedSubmission.errorMessage && (
                <div className="bg-red-900/20 border border-red-500/50 rounded p-3 mb-4">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-4 w-4 text-red-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="text-red-400 text-sm">{selectedSubmission.errorMessage}</span>
                  </div>
                </div>
              )}
              
              <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                <pre className="p-4 text-gray-100 text-sm overflow-x-auto">
                  <code>{selectedSubmission.code}</code>
                </pre>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-800">
              <button 
                className="btn bg-amber-500 text-gray-900 border-none hover:bg-amber-400 w-full"
                onClick={() => setSelectedSubmission(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionHistory;