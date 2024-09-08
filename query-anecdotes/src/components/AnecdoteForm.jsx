import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import { useNotification } from '../NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [_, dispatch] = useNotification();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: newAnecdote => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });

      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `Anecdote '${newAnecdote.content}' created!`,
      });

      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    },
  });

  const onCreate = event => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    if (content.length < 5) {
      alert('Anecdote must be at least 5 characters long.');
      return;
    }

    const newAnecdote = {
      content,
      votes: 0,
    };

    newAnecdoteMutation.mutate(newAnecdote);
    event.target.anecdote.value = '';
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
