import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setTimedNotification } from '../reducers/notificationReducer';

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

  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content && filter
      ? anecdote.content.toLowerCase().includes(filter.toLowerCase())
      : true,
  );

  const handleVote = anecdote => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(setTimedNotification(`you voted '${anecdote.content}'`, 5));
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
