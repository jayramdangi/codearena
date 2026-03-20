import React from 'react';
import VideoTable from '../components/VideoTable';
import { useProblems } from '../hooks/useProblems';

const ManageVideos = () => {
  const { problems, loading, error, deleteVideo } = useProblems();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Video Solutions</h1>
          <p className="text-gray-600">
            Upload or delete video solutions for problems
          </p>
        </div>
        
        <VideoTable 
          problems={problems}
          loading={loading}
          error={error}
          onDelete={deleteVideo}
        />
      </div>
    </div>
  );
};

export default ManageVideos;