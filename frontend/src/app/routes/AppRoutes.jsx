import React from 'react';
import { Routes, Route , Navigate } from 'react-router';

// Layout
import { NavbarLayout } from '../../feature/Layout';

// Auth Pages
import { Login, Signup } from '../../feature/Auth';

// Feature Pages
import { Homepage } from '../../feature/Home';
import { ProfilePage as Profile } from '../../feature/User';
import { ProblemsPage, SolveProblemPage } from '../../feature/ProblemSolve';
import { ContestPage, ContestProblem as ContestProblems, Leaderboard, SolveContestProblemPage } from '../../feature/Contest';
import { OneVsOne, BattlePage, SolveOneVsOneProblemPage } from '../../feature/oneVsOne';

// Admin Pages
import { 
  Admin as AdminDashboard, 
  CreateProblem as AdminPanel, 
  CreateContest as AdminCreateContest, 
  ManageProblems as AdminDelete, 
  ManageVideos as AdminVideo,
  UploadVideo as AdminUpload 
} from '../../feature/Admin';

// Route Guards
import { ProtectedRoute, AdminRoute, PublicRoute } from './RouteGuards';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes - only accessible when not authenticated */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/signup" element={
        <PublicRoute>
          <Signup />
        </PublicRoute>
      } />

      {/* All protected routes with NavbarLayout */}
      <Route path="/" element={
        <ProtectedRoute>
          <NavbarLayout />
        </ProtectedRoute>
      }>
        {/* Main pages */}
        <Route index element={<Homepage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="problems" element={<ProblemsPage />} />
        <Route path="contest" element={<ContestPage />} />
        <Route path="onevsone" element={<OneVsOne />} />

        {/* Contest routes */}
        <Route path="contest/:id" element={<ContestProblems />} />
        <Route path="contest/leaderboard/:id" element={<Leaderboard />} />
        <Route path="contest/:contestId/problem/:problemId" element={<SolveContestProblemPage />} />

        {/* 1vs1 Battle routes */}
        <Route path="onevsone/battle/:roomId" element={<BattlePage />} />
        <Route path="onevsone/battle/:roomId/problem/:problemId" element={<SolveOneVsOneProblemPage />} />

        {/* Problem solving route */}
        <Route path="problem/:problemId" element={<SolveProblemPage />} />

        {/* ADMIN ROUTES */}
        <Route path="admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="admin/create" element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        } />
        <Route path="admin/delete" element={
          <AdminRoute>
            <AdminDelete />
          </AdminRoute>
        } />
        <Route path="admin/createContest" element={
          <AdminRoute>
            <AdminCreateContest />
          </AdminRoute>
        } />
        <Route path="admin/video" element={
          <AdminRoute>
            <AdminVideo />
          </AdminRoute>
        } />
        <Route path="admin/upload/:problemId" element={
          <AdminRoute>
            <AdminUpload />
          </AdminRoute>
        } />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={
        <ProtectedRoute>
          <Navigate to="/" replace />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;