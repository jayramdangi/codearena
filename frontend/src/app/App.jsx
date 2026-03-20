import React from 'react';
import { useSelector } from 'react-redux';
import { useAuthCheck } from './hooks/useAuthCheck';
import { useSocketSetup } from './hooks/useSocketSetup';
import AppRoutes from './routes/AppRoutes';

function App() {
  const { loading } = useSelector((state) => state.auth);
  
  // Custom hooks for authentication and socket setup
  useAuthCheck();
  useSocketSetup();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <span className="loading loading-spinner loading-lg text-amber-400"></span>
      </div>
    );
  }

  return <AppRoutes />;
}

export default App;