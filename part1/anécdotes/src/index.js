import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const Button = ({ onClick, body }) => <button onClick={onClick}>{body}</button>;

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  const [maxVote, setMaxVote] = useState(0);

  const calcMajorAnecdotesVotes = () => {
    let max = 0;

    for (const point in points) {
      if (points[point] > max) {
        max = points[point];
        setMaxVote(point);
      }
    }
  };

  const handleRandom = () => {
    const random = Math.round(Math.random() * 5 - 0);
    setSelected(random);
  };

  const handleVote = () => {
    setPoints({ ...points, [selected]: points[selected] + 1 });
    calcMajorAnecdotesVotes();
  };

  return (
    <>
      <div>
        <h2>Anecdote of the day</h2>
        <div>{anecdotes[selected]}</div>
        <div>has {points[selected]} votes</div>
        <div>
          <Button onClick={handleVote} body={'vote'} />
          <Button onClick={handleRandom} body={'next anecdote'} />
        </div>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        <div>{anecdotes[maxVote]}</div>
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>
);
