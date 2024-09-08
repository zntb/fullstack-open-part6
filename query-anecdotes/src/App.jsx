import { useQuery } from '@tanstack/react-query';
import { getAnecdotes } from './requests';

import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

const App = () => {
  const handleVote = anecdote => {
    console.log('vote');
  };

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote => (
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
