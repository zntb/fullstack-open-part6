import { useDispatch } from 'react-redux';
import { createAnecdoteAsync } from '../reducers/anecdoteReducer';
import { setNotificationAsync } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    await dispatch(createAnecdoteAsync(content));
    dispatch(
      setNotificationAsync({
        message: `you created '${content}'`,
        duration: 5,
      }),
    );
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
