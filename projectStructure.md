Project
├── backend
│   ├── .env
│   ├── .git
│   ├── .gitignore
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   └── src
│       ├── Socket.io
│       │   └── oneVsOne.js
│       ├── config
│       │   ├── db.js
│       │   ├── oneVsOneData.js
│       │   ├── redis.js
│       │   └── websocket.js
│       ├── controllers
│       │   ├── contestControl.js
│       │   ├── contestSubmission.js
│       │   ├── oneVsOneController.js
│       │   ├── solveDoubt.js
│       │   ├── userAuthent.js
│       │   ├── userProblem.js
│       │   ├── userSubmission.js
│       │   └── videoSection.js
│       ├── index.js
│       ├── middleware
│       │   ├── adminMiddleware.js
│       │   └── userMiddleware.js
│       ├── models
│       │   ├── contest.js
│       │   ├── contestSubmission.js
│       │   ├── problem.js
│       │   ├── solutionVideo.js
│       │   ├── submission.js
│       │   └── user.js
│       ├── routes
│       │   ├── aiChatting.js
│       │   ├── contestRoutes.js
│       │   ├── onevsoneRoute.js
│       │   ├── problemCreator.js
│       │   ├── submit.js
│       │   ├── userAuth.js
│       │   └── videoCreator.js
│       └── utils
│           ├── problemUtility.js
│           └── validator.js
└── frontend
    ├── .env
    ├── .gitignore
    ├── README.md
    ├── dist
    ├── eslint.config.js
    ├── index.html
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── public
    │   └── vite.svg
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── Shared
    │   │   ├── Components
    │   │   │   ├── ai-help
    │   │   │   │   ├── ChatAi.jsx
    │   │   │   │   ├── Editorial.jsx
    │   │   │   │   └── SubmissionHistory.jsx
    │   │   │   └── problem-solving
    │   │   │       ├── CodeEditor.jsx
    │   │   │       ├── EditorToolbar.jsx
    │   │   │       ├── LanguageSelector.jsx
    │   │   │       ├── ProblemDescription.jsx
    │   │   │       ├── ProblemTabs.jsx
    │   │   │       ├── ResizablePanels.jsx
    │   │   │       ├── SubmissionResults.jsx
    │   │   │       └── TestResults.jsx
    │   │   ├── hooks
    │   │   │   ├── useCodeExecution.js
    │   │   │   ├── useEditorConfig.js
    │   │   │   └── useProblemSolving.js
    │   │   ├── index.js
    │   │   └── utils
    │   │       └── constants.js
    │   ├── app
    │   │   ├── App.jsx
    │   │   ├── hooks
    │   │   │   ├── useAuthCheck.js
    │   │   │   └── useSocketSetup.js
    │   │   └── routes
    │   │       ├── AppRoutes.jsx
    │   │       ├── RouteGuards.jsx
    │   │       └── index.jsx
    │   ├── assets
    │   ├── context
    │   │   └── SocketContext.jsx
    │   ├── feature
    │   │   ├── Admin
    │   │   │   ├── components
    │   │   │   │   ├── ContestForm.jsx
    │   │   │   │   ├── ProblemForm.jsx
    │   │   │   │   ├── ProblemTable.jsx
    │   │   │   │   ├── UploadForm.jsx
    │   │   │   │   └── VideoTable.jsx
    │   │   │   ├── hooks
    │   │   │   │   ├── useContests.js
    │   │   │   │   ├── useProblems.js
    │   │   │   │   └── useVideoUpload.js
    │   │   │   ├── index.js
    │   │   │   └── pages
    │   │   │       ├── Admin.jsx
    │   │   │       ├── CreateContest.jsx
    │   │   │       ├── CreateProblem.jsx
    │   │   │       ├── ManageProblems.jsx
    │   │   │       ├── ManageVideos.jsx
    │   │   │       └── UploadVideo.jsx
    │   │   ├── Auth
    │   │   │   ├── components
    │   │   │   │   └── PasswordInput.jsx
    │   │   │   ├── index.js
    │   │   │   └── pages
    │   │   │       ├── Login.jsx
    │   │   │       └── Signup.jsx
    │   │   ├── Contest
    │   │   │   ├── components
    │   │   │   │   ├── ContestCard.jsx
    │   │   │   │   ├── ContestFilters.jsx
    │   │   │   │   ├── ContestInstructions.jsx
    │   │   │   │   ├── LeaderboardPanel.jsx
    │   │   │   │   ├── ProblemsPanel.jsx
    │   │   │   │   ├── Timer.jsx
    │   │   │   │   └── UpcomingPanel.jsx
    │   │   │   ├── hooks
    │   │   │   │   ├── useContest.js
    │   │   │   │   ├── useContests.js
    │   │   │   │   └── useTimer.js
    │   │   │   ├── index.js
    │   │   │   └── pages
    │   │   │       ├── ContestProblem.jsx
    │   │   │       ├── Leaderboard.jsx
    │   │   │       ├── SolveContestProblemPage.jsx
    │   │   │       └── index.jsx
    │   │   ├── Home
    │   │   │   ├── components
    │   │   │   │   ├── CTASection.jsx
    │   │   │   │   ├── FeatureCard.jsx
    │   │   │   │   ├── FeaturesSection.jsx
    │   │   │   │   ├── HeroSection.jsx
    │   │   │   │   ├── StatsSection.jsx
    │   │   │   │   ├── TestimonialCard.jsx
    │   │   │   │   └── TestimonialsSection.jsx
    │   │   │   ├── index.js
    │   │   │   └── pages
    │   │   │       └── Homepage.jsx
    │   │   ├── Layout
    │   │   │   ├── components
    │   │   │   │   ├── DesktopNavLinks.jsx
    │   │   │   │   ├── MobileMenu.jsx
    │   │   │   │   ├── NavLinkItem.jsx
    │   │   │   │   ├── Navbar.jsx
    │   │   │   │   └── ProfileDropdown.jsx
    │   │   │   ├── index.js
    │   │   │   └── pages
    │   │   │       └── NavbarLayout.jsx
    │   │   ├── ProblemSolve
    │   │   │   ├── components
    │   │   │   │   ├── ActiveFilters.jsx
    │   │   │   │   ├── DifficultyFilter.jsx
    │   │   │   │   ├── EmptyState.jsx
    │   │   │   │   ├── Pagination.jsx
    │   │   │   │   ├── ProblemRow.jsx
    │   │   │   │   ├── ProblemsTable.jsx
    │   │   │   │   ├── SearchBar.jsx
    │   │   │   │   ├── StatusFilter.jsx
    │   │   │   │   └── TagFilter.jsx
    │   │   │   ├── hooks
    │   │   │   │   ├── useProblemsData.js
    │   │   │   │   └── useProblemsFilter.js
    │   │   │   ├── index.js
    │   │   │   └── pages
    │   │   │       ├── ProblemsPage.jsx
    │   │   │       └── SolveProblemPage.jsx
    │   │   ├── User
    │   │   │   ├── components
    │   │   │   │   ├── ContestCard.jsx
    │   │   │   │   ├── ContestSection.jsx
    │   │   │   │   ├── OverallProgressCard.jsx
    │   │   │   │   ├── RadialProgress.jsx
    │   │   │   │   ├── SolvedProblemsTable.jsx
    │   │   │   │   ├── StatsSummary.jsx
    │   │   │   │   └── UserProfileCard.jsx
    │   │   │   ├── hooks
    │   │   │   │   └── useProfileData.js
    │   │   │   ├── index.js
    │   │   │   └── pages
    │   │   │       └── ProfilePage.jsx
    │   │   └── oneVsOne
    │   │       ├── components
    │   │       │   ├── BattleCancelled.jsx
    │   │       │   ├── BattleError.jsx
    │   │       │   ├── BattleHeader.jsx
    │   │       │   ├── BattleLoading.jsx
    │   │       │   ├── BattleWinner.jsx
    │   │       │   ├── ChallengeCard.jsx
    │   │       │   ├── ChallengeInfoModal.jsx
    │   │       │   ├── ChallengesPanel.jsx
    │   │       │   ├── HeaderSection.jsx
    │   │       │   ├── PlayerCard.jsx
    │   │       │   ├── ProblemItem.jsx
    │   │       │   ├── ProblemList.jsx
    │   │       │   ├── Search.jsx
    │   │       │   └── SettingsPanel.jsx
    │   │       ├── hooks
    │   │       │   ├── useBattleHandlers.js
    │   │       │   ├── useBattleSocket.js
    │   │       │   ├── useChallengeHandlers.js
    │   │       │   ├── useOneVsOneEffects.js
    │   │       │   └── useOneVsOneState.js
    │   │       ├── index.js
    │   │       └── pages
    │   │           ├── BattlePage.jsx
    │   │           ├── Main.jsx
    │   │           └── SolveOneVsOneProblemPage.jsx
    │   ├── index.css
    │   ├── main.jsx
    │   ├── services
    │   │   ├── api
    │   │   │   └── axiosClient.js
    │   │   └── socketService.js
    │   └── store
    │       ├── authSlice.js
    │       ├── index.js
    │       ├── onevsoneSlice.js
    │       └── rootReducer.js
    ├── vite.config.js
    └── x.md