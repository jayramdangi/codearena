import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosClient from '../../../services/api/axiosClient';
import { useNavigate } from 'react-router';

const problemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.enum(['array', 'linkedList', 'graph', 'dp']),
  visibleTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required'),
      explanation: z.string().min(1, 'Explanation is required')
    })
  ).min(1, 'At least one visible test case required'),
  hiddenTestCases: z.array(
    z.object({
      input: z.string().min(1, 'Input is required'),
      output: z.string().min(1, 'Output is required')
    })
  ).min(1, 'At least one hidden test case required'),
  startCode: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript']),
      initialCode: z.string().min(1, 'Initial code is required')
    })
  ).length(3, 'All three languages required'),
  referenceSolution: z.array(
    z.object({
      language: z.enum(['C++', 'Java', 'JavaScript']),
      completeCode: z.string().min(1, 'Complete code is required')
    })
  ).length(3, 'All three languages required')
});

const ProblemForm = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      startCode: [
        { language: 'C++', initialCode: '' },
        { language: 'Java', initialCode: '' },
        { language: 'JavaScript', initialCode: '' }
      ],
      referenceSolution: [
        { language: 'C++', completeCode: '' },
        { language: 'Java', completeCode: '' },
        { language: 'JavaScript', completeCode: '' }
      ]
    }
  });

  const {
    fields: visibleFields,
    append: appendVisible,
    remove: removeVisible
  } = useFieldArray({
    control,
    name: 'visibleTestCases'
  });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden
  } = useFieldArray({
    control,
    name: 'hiddenTestCases'
  });

  const onSubmit = async (data) => {
    try {
      await axiosClient.post('/problem/create', data);
      alert('Problem created successfully!');
      navigate('/admin');
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white rounded-xl shadow-md border border-gray-200 p-6">
      {/* Basic Information */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200">Basic Information</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              {...register('title')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && (
              <span className="text-red-500 text-sm mt-1">{errors.title.message}</span>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register('description')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 h-32 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && (
              <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Difficulty
              </label>
              <select
                {...register('difficulty')}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 ${
                  errors.difficulty ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Tag
              </label>
              <select
                {...register('tags')}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 ${
                  errors.tags ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="array">Array</option>
                <option value="linkedList">Linked List</option>
                <option value="graph">Graph</option>
                <option value="dp">DP</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Test Cases */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200">Test Cases</h2>
        
        {/* Visible Test Cases */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-700">Visible Test Cases</h3>
            <button
              type="button"
              onClick={() => appendVisible({ input: '', output: '', explanation: '' })}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Add Visible Case
            </button>
          </div>
          
          {visibleFields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 p-4 rounded-lg space-y-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-700">Visible Test Case {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeVisible(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  Remove
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Input</label>
                  <input
                    {...register(`visibleTestCases.${index}.input`)}
                    placeholder="Input"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Output</label>
                  <input
                    {...register(`visibleTestCases.${index}.output`)}
                    placeholder="Output"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Explanation</label>
                  <textarea
                    {...register(`visibleTestCases.${index}.explanation`)}
                    placeholder="Explanation"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hidden Test Cases */}
        <div className="space-y-6 mt-8">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-700">Hidden Test Cases</h3>
            <button
              type="button"
              onClick={() => appendHidden({ input: '', output: '' })}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm"
            >
              Add Hidden Case
            </button>
          </div>
          
          {hiddenFields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 p-4 rounded-lg space-y-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-700">Hidden Test Case {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeHidden(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  Remove
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Input</label>
                  <input
                    {...register(`hiddenTestCases.${index}.input`)}
                    placeholder="Input"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Output</label>
                  <input
                    {...register(`hiddenTestCases.${index}.output`)}
                    placeholder="Output"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code Templates */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 pb-2 border-b border-gray-200">Code Templates</h2>
        
        <div className="space-y-8">
          {[0, 1, 2].map((index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-medium text-gray-700">
                {index === 0 ? 'C++' : index === 1 ? 'Java' : 'JavaScript'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Initial Code</label>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <textarea
                      {...register(`startCode.${index}.initialCode`)}
                      className="w-full bg-transparent font-mono text-gray-800 focus:outline-none"
                      rows={8}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Reference Solution</label>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <textarea
                      {...register(`referenceSolution.${index}.completeCode`)}
                      className="w-full bg-transparent font-mono text-gray-800 focus:outline-none"
                      rows={8}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md disabled:opacity-50"
      >
        {isSubmitting ? 'Creating Problem...' : 'Create Problem'}
      </button>
    </form>
  );
};

export default ProblemForm;