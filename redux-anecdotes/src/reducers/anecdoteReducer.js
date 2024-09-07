import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      return state.map(anecdote =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote,
      );
    },
  },
});

export const createAnecdoteAsync = content => {
  return async dispatch => {
    try {
      const newAnecdote = await anecdoteService.createAnecdote(content);
      dispatch(createAnecdote(newAnecdote));
    } catch (error) {
      console.error('Failed to create anecdote:', error);
    }
  };
};

export const voteAnecdoteAsync = anecdote => {
  return async dispatch => {
    try {
      const updatedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
      };
      const response = await anecdoteService.updateAnecdote(
        anecdote.id,
        updatedAnecdote,
      );
      dispatch(voteAnecdote(response));
    } catch (error) {
      console.error('Failed to vote for anecdote:', error);
    }
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    try {
      const anecdotes = await anecdoteService.getAllAnecdotes();
      dispatch(setAnecdotes(anecdotes));
    } catch (error) {
      console.error('Failed to fetch anecdotes:', error);
    }
  };
};

export const { setAnecdotes, createAnecdote, voteAnecdote } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
