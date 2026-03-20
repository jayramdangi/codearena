import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router'; 
import { loginUser } from "../../../store/authSlice";
import PasswordInput from '../components/PasswordInput';

const loginSchema = z.object({
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is too weak") 
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error: authError } = useSelector((state) => state.auth);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="h-screen overflow-y-scroll flex items-center justify-center p-4 bg-gray-50">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Leetcode</h2>
            <p className="text-gray-600 text-sm">Sign in to your account</p>
          </div>

          {authError && (
            <div className="alert alert-error mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className={`input input-bordered w-full ${errors.emailId ? 'input-error' : ''}`} 
                {...register('emailId')}
              />
              {errors.emailId && (
                <span className="text-error text-sm mt-1">{errors.emailId.message}</span>
              )}
            </div>

            <PasswordInput
              label="Password"
              placeholder="••••••••"
              error={errors.password}
              {...register('password')}
            />

            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Logging in...
                  </>
                ) : 'Login'}
              </button>
            </div>
          </form>

          <div className="text-center mt-6 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">
              Don't have an account?{' '}
              <NavLink to="/signup" className="link link-primary font-medium">
                Sign Up
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;