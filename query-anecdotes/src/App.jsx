import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, updateAnecdote } from './requests';

import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useNotification } from './NotificationContext';

const App = () => {
  const queryClient = useQueryClient();

  const [_, dispatch] = useNotification();

  const {
    isLoading,
    isError,
    data: anecdotes,
    error,
  } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  });

  const voteMutation = useMutation({
    mutationFn: anecdote => {
      return updateAnecdote(anecdote.id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      });
    },
    onSuccess: updatedAnecdote => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });

      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `Anecdote '${updatedAnecdote.content}' voted!`,
      });

      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    },
  });

  const handleVote = anecdote => {
    voteMutation.mutate(anecdote);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
