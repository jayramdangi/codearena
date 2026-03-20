import { useState } from 'react';
import axios from 'axios';
import axiosClient from '../../../services/api/axiosClient.js';

export const useVideoUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);

  const uploadVideo = async (problemId, file) => {
    setUploading(true);
    setUploadProgress(0);
    setError(null);
    setUploadedVideo(null);

    try {
      // Step 1: Get upload signature from backend
      const signatureResponse = await axiosClient.get(`/video/create/${problemId}`);
      const { signature, timestamp, public_id, api_key, upload_url } = signatureResponse.data;

      // Step 2: Create FormData for Cloudinary upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('public_id', public_id);
      formData.append('api_key', api_key);

      // Step 3: Upload directly to Cloudinary
      const uploadResponse = await axios.post(upload_url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });

      const cloudinaryResult = uploadResponse.data;

      // Step 4: Save video metadata to backend
      const metadataResponse = await axiosClient.post('/video/save', {
        problemId: problemId,
        cloudinaryPublicId: cloudinaryResult.public_id,
        secureUrl: cloudinaryResult.secure_url,
        duration: cloudinaryResult.duration,
      });

      setUploadedVideo(metadataResponse.data.videoSolution);
      return metadataResponse.data.videoSolution;

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Upload failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const deleteVideo = async (videoId) => {
    try {
      setLoading(true);
      await axiosClient.delete(`/video/delete/${videoId}`);
      setUploadedVideo(null);
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to delete video';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetUpload = () => {
    setUploading(false);
    setUploadProgress(0);
    setError(null);
    setUploadedVideo(null);
  };

  return {
    uploading,
    uploadProgress,
    error,
    uploadedVideo,
    uploadVideo,
    deleteVideo,
    resetUpload
  };
};