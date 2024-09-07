import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdoteAsync } from '../reducers/anecdoteReducer';
import { setNotificationAsync } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state.anecdotes);
  const filter = useSelector(state => state.filter);

  const filteredAnecdotes = anecdotes
    .filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase()),
    )
    .sort((a, b) => b.votes - a.votes);

  const handleVote = anecdote => {
    dispatch(voteAnecdoteAsync(anecdote));
    dispatch(
      setNotificationAsync({
        message: `you voted '${anecdote.content}'`,
        duration: 5,
      }),
    );
  };

  return (
    <div>
      {filteredAnecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote)}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
