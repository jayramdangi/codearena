import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../../../services/api/axiosClient';
import { useNavigate } from 'react-router';

const contestSchema = z.object({
  title: z.string().min(1, "Title is required"),
  startTime: z.string().min(1, "Start time is required"),
  duration: z.coerce
    .number()
    .min(1, "Duration must be at least 1 minute")
    .max(10080, "Duration cannot exceed 7 days (10080 minutes)"),
  contestProblems: z.array(
    z.object({
      problemId: z.string().min(1, "Problem selection is required")
    })
  ).min(1, "At least one problem is required")
});

const ContestForm = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(contestSchema),
    defaultValues: {
      title: "",
      startTime: "",
      duration: 120,
      contestProblems: [{ problemId: "" }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contestProblems"
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axiosClient.get('/problem/getAllProblem');
        setProblems(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load problems");
        setIsLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const onSubmit = async (data) => {
    try {
      const payload = {
        title: data.title,
        startTime: data.startTime,
        duration: data.duration,
        contestProblems: data.contestProblems.map(item => item.problemId)
      };

      await axiosClient.post('/contest/create', payload);
      alert('Contest created successfully!');
      navigate('/admin');
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">Contest Title</label>
        <input
          {...register('title')}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter contest title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="datetime-local"
            {...register('startTime')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 ${
              errors.startTime ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.startTime && (
            <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Duration (minutes)
          </label>
          <input
            type="number"
            {...register('duration')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 ${
              errors.duration ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.duration && (
            <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
          )}
        </div>
      </div>

      {/* Contest Problems */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Contest Problems
          </label>
          <button
            type="button"
            onClick={() => append({ problemId: "" })}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm"
          >
            Add Problem
          </button>
        </div>
        
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-4 mb-4">
            <select
              {...register(`contestProblems.${index}.problemId`)}
              className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 ${
                errors.contestProblems?.[index]?.problemId ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
            >
              <option value="">Select a problem</option>
              {problems.map(problem => (
                <option key={problem._id} value={problem._id}>
                  {problem.title} ({problem.difficulty})
                </option>
              ))}
            </select>
            
            <button
              type="button"
              onClick={() => remove(index)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}

        {errors.contestProblems?.root && (
          <p className="text-red-500 text-sm mt-1">
            {errors.contestProblems.root.message}
          </p>
        )}
      </div>

      {/* Error messages */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50"
      >
        {isSubmitting ? 'Creating Contest...' : 'Create Contest'}
      </button>
    </form>
  );
};

export default ContestForm;