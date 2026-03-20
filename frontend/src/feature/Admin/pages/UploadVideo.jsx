import React from 'react';
import { useParams } from 'react-router';
import UploadForm from '../components/UploadForm';

const UploadVideo = () => {
  const { problemId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Upload Video Solution</h1>
          <p className="text-gray-600">
            Upload a video solution for the problem
          </p>
        </div>
        
        <UploadForm problemId={problemId} />
      </div>
    </div>
  );
};

export default UploadVideo;