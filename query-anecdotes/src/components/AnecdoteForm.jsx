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
    onError: (error, variables, context) => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `Failed to create anecdote: ${error.message}`,
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
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: 'Too short anecdote, must have length 5 or more.',
      });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
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
