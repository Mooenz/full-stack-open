import { useState } from 'react';
import Button from './components/Button';

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.',
];

const App = () => {
  const anecdotesLength = anecdotes.length;
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  const maxVotes = Object.keys(points).reduce((a, b) => points[a] > points[b] ? a : b);

  const handleNext = () => {
    const random = Math.floor(Math.random() * anecdotesLength);
    setSelected(random);

  };

  const handleVote = () => {
    if (!points[selected]) {
      setPoints({ ...points, [selected]: 1 });
      return;
    }

    setPoints({ ...points, [selected]: points[selected] + 1 });
  };

  return (
    <>
      <h1>Anecdotes of day</h1>
      <p> { anecdotes[selected] } <br /> has { points[selected] ? points[selected] : 0 }</p>
      <Button onClick={ handleVote } name="vote" />
      <Button onClick={ handleNext } name="next anecdote" />

      <div>
        <h2>Anecdotes with most votes</h2>
        <p>{ anecdotes[maxVotes] }. <br /> has { points[maxVotes] } </p>
      </div>
    </>
  );
};

export default App;
