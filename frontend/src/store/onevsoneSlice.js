import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../services/api/axiosClient';

export const fetchOneVsOneInitial = createAsyncThunk(
  'onevsone/fetchInitial',
  async (_, { rejectWithValue }) => {
    try {
      const [givenRes, incomingRes, activeRes] = await Promise.all([
        axiosClient.get('/onevsone/challenges/sent'),
        axiosClient.get('/onevsone/challenges/received'),
        axiosClient.get('/onevsone/battles/active')
      ]);

      return {
        given: givenRes.data || [],
        incoming: incomingRes.data || [],
        active: activeRes.data || null
      };
    } catch (err) {
      if (err.response?.status === 404) {
        return {
          given: [],
          incoming: [],
          active: null
        };
      }
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

const initialState = {
  socketConnected: false,
  socketId: null,
  challengesGiven: [],
  challengesIncoming: [],
  activeBattle: null,
  player1Solved: [],
  player2Solved: [],
  problems: [],
  connectionStatus: {},
  notification: null,
  loading: false,
  error: null,
  battleCancelled: false,
  winner: null,
  battleHistory: []
};

const onevsoneSlice = createSlice({
  name: 'onevsone',
  initialState,
  reducers: {
    setSocketConnected(state, action) {
      state.socketConnected = !!action.payload;
    },
    setSocketId(state, action) {
      state.socketId = action.payload;
    },
    setChallengesGiven(state, action) {
      state.challengesGiven = action.payload || [];
    },
    addChallengeGiven(state, action) {
      const existing = state.challengesGiven.find(c => c._id === action.payload._id);
      if (!existing) {
        state.challengesGiven = [action.payload, ...state.challengesGiven];
      }
    },
    removeChallengeGiven(state, action) {
      state.challengesGiven = state.challengesGiven.filter(c => c._id !== action.payload);
    },
    updateChallengeGiven(state, action) {
      const { challengeId, updates } = action.payload;
      state.challengesGiven = state.challengesGiven.map(c => 
        c._id === challengeId ? { ...c, ...updates } : c
      );
    },
    setChallengesIncoming(state, action) {
      state.challengesIncoming = action.payload || [];
    },
    addChallengeIncoming(state, action) {
      const newChallenge = action.payload;
      
      if (!newChallenge || !newChallenge._id) {
        console.error('Invalid challenge payload:', newChallenge);
        return;
      }
      
      const currentIncoming = state.challengesIncoming || [];
      const isDuplicate = currentIncoming.some(existing => {
        if (existing._id === newChallenge._id) return true;
        if (existing.challenger?._id === newChallenge.challenger?._id &&
            existing.challengedUser?._id === newChallenge.challengedUser?._id &&
            existing.status === 'pending' && newChallenge.status === 'pending') {
          return true;
        }
        return false;
      });
      
      if (!isDuplicate) {
        state.challengesIncoming = [newChallenge, ...currentIncoming];
      }
    },
    removeChallengeIncoming(state, action) {
      state.challengesIncoming = state.challengesIncoming.filter(c => c._id !== action.payload);
    },
    updateChallengeIncoming(state, action) {
      const { challengeId, updates } = action.payload;
      state.challengesIncoming = state.challengesIncoming.map(c => 
        c._id === challengeId ? { ...c, ...updates } : c
      );
    },
    setActiveBattle(state, action) {
      state.activeBattle = action.payload;
      if (action.payload) {
        state.problems = action.payload.problems || [];
        state.player1Solved = action.payload.player1Solved || [];
        state.player2Solved = action.payload.player2Solved || [];
        state.winner = action.payload.winner || null;
        state.battleCancelled = false;
      } else {
        state.problems = [];
        state.player1Solved = [];
        state.player2Solved = [];
      }
    },
    setBattleProgress(state, action) {
      const { player1Solved = null, player2Solved = null } = action.payload || {};
      if (player1Solved) state.player1Solved = player1Solved;
      if (player2Solved) state.player2Solved = player2Solved;
      
      if (state.activeBattle) {
        if (player1Solved) state.activeBattle.player1Solved = player1Solved;
        if (player2Solved) state.activeBattle.player2Solved = player2Solved;
      }
    },
    setConnectionStatus(state, action) {
      const { userId, connected } = action.payload;
      state.connectionStatus = { ...state.connectionStatus, [userId]: connected };
      
      if (state.activeBattle && state.activeBattle.opponent && 
          String(state.activeBattle.opponent._id) === userId) {
        state.activeBattle.opponent.isConnected = connected;
      }
    },
    setNotification(state, action) {
      state.notification = action.payload;
    },
    clearNotification(state) {
      state.notification = null;
    },
    setBattleCancelled(state, action) {
      state.battleCancelled = !!action.payload;
      if (action.payload) {
        const currentWinner = state.winner;
        state.activeBattle = null;
        state.problems = [];
        state.player1Solved = [];
        state.player2Solved = [];
        state.winner = currentWinner;
      }
    },
    setWinner(state, action) {
      state.winner = action.payload;
      if (action.payload) {
        state.activeBattle = null;
        state.battleCancelled = false;
      }
    },
    setBattleHistory(state, action) {
      state.battleHistory = action.payload || [];
    },
    addBattleToHistory(state, action) {
      const battle = action.payload;
      const existingIndex = state.battleHistory.findIndex(b => b.roomId === battle.roomId);
      
      if (existingIndex >= 0) {
        state.battleHistory[existingIndex] = battle;
      } else {
        state.battleHistory = [battle, ...state.battleHistory].slice(0, 50);
      }
    },
    resetOneVsOneState(state) {
      Object.assign(state, initialState);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOneVsOneInitial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneVsOneInitial.fulfilled, (state, action) => {
        state.loading = false;
        state.challengesGiven = action.payload.given;
        state.challengesIncoming = action.payload.incoming;
        state.activeBattle = action.payload.active;
        if (action.payload.active) {
          state.problems = action.payload.active.problems || [];
          state.player1Solved = action.payload.active.player1Solved || [];
          state.player2Solved = action.payload.active.player2Solved || [];
          state.winner = action.payload.active.winner || null;
        } else {
          state.problems = [];
          state.player1Solved = [];
          state.player2Solved = [];
        }
      })
      .addCase(fetchOneVsOneInitial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Failed to load one-vs-one data' };
      });
  }
});

export const {
  setSocketConnected,
  setSocketId,
  setChallengesGiven,
  addChallengeGiven,
  removeChallengeGiven,
  updateChallengeGiven,
  setChallengesIncoming,
  addChallengeIncoming,
  removeChallengeIncoming,
  updateChallengeIncoming,
  setActiveBattle,
  setBattleProgress,
  setConnectionStatus,
  setNotification,
  clearNotification,
  setBattleCancelled,
  setWinner,
  setBattleHistory,
  addBattleToHistory,
  resetOneVsOneState
} = onevsoneSlice.actions;

export default onevsoneSlice.reducer;