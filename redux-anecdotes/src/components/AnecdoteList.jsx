import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';

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

  const filteredAnecdotes = [...anecdotes]
    .filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase()),
    )
    .sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {filteredAnecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(voteAnecdote(anecdote.id))}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
