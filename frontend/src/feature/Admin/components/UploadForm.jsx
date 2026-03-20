import React from 'react';
import { useForm } from 'react-hook-form';
import { useVideoUpload } from '../hooks/useVideoUpload';

const UploadForm = ({ problemId }) => {
  const {
    uploading,
    uploadProgress,
    error,
    uploadedVideo,
    uploadVideo,
    resetUpload
  } = useVideoUpload();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset: resetForm
  } = useForm();

  const selectedFile = watch('videoFile')?.[0];

  const onSubmit = async (data) => {
    const file = data.videoFile[0];
    
    try {
      await uploadVideo(problemId, file);
      resetForm(); // Reset the form on success
    } catch (err) {
      // Error is already set by the hook
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Video Solution</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* File Input */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Choose video file
          </label>
          <input
            type="file"
            accept="video/*"
            {...register('videoFile', {
              required: 'Please select a video file',
              validate: {
                isVideo: (files) => {
                  if (!files || !files[0]) return 'Please select a video file';
                  const file = files[0];
                  return file.type.startsWith('video/') || 'Please select a valid video file';
                },
                fileSize: (files) => {
                  if (!files || !files[0]) return true;
                  const file = files[0];
                  const maxSize = 100 * 1024 * 1024; // 100MB
                  return file.size <= maxSize || 'File size must be less than 100MB';
                }
              }
            })}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 ${
              errors.videoFile ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={uploading}
          />
          {errors.videoFile && (
            <p className="text-red-500 text-sm mt-1">{errors.videoFile.message}</p>
          )}
        </div>

        {/* Selected File Info */}
        {selectedFile && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 mb-2">Selected File:</h3>
            <p className="text-sm text-blue-700">{selectedFile.name}</p>
            <p className="text-sm text-blue-700">Size: {formatFileSize(selectedFile.size)}</p>
          </div>
        )}

        {/* Upload Progress */}
        {uploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Uploading...</span>
              <span className="font-medium text-gray-800">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {uploadedVideo && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-medium text-green-800 mb-2">Upload Successful!</h3>
            <p className="text-sm text-green-700">
              Duration: {formatDuration(uploadedVideo.duration)}
            </p>
            <p className="text-sm text-green-700">
              Uploaded: {new Date(uploadedVideo.uploadedAt).toLocaleString()}
            </p>
            <button
              type="button"
              onClick={resetUpload}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              Upload Another Video
            </button>
          </div>
        )}

        {/* Upload Button */}
        <div className="flex justify-end space-x-3">
          {uploadedVideo && (
            <button
              type="button"
              onClick={resetUpload}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Clear
            </button>
          )}
          <button
            type="submit"
            disabled={uploading}
            className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md ${
              uploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;