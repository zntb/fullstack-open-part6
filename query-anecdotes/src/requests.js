import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = () =>
  axios
    .get(baseUrl)
    .then(res => res.data)
    .catch(err => {
      throw new Error(
        'Anecdote service not available due to problems in server.',
      );
    });

export const createAnecdote = newAnecdote =>
  axios.post(baseUrl, newAnecdote).then(res => res.data);

export const updateAnecdote = (id, updatedAnecdote) =>
  axios.put(`${baseUrl}/${id}`, updatedAnecdote).then(res => res.data);
