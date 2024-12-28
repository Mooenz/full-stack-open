import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const Button = ({ onClick, body }) => <button onClick={onClick}>{body}</button>;

const Statistics = ({ good, neutral, bad }) => (
  <>
    <div>good {good}</div>
    <div>neutral {neutral}</div>
    <div>bad {bad}</div>
  </>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const HandleButton = (button) => () => {
    console.log(button);
    if (button === 'good') {
      setGood(good + 1);
    } else if (button === 'bad') {
      setBad(bad + 1);
    } else if (button === 'neutral') {
      setNeutral(neutral + 1);
    }
  };

  return (
    <>
      <h1>give feedback</h1>
      <div>
        <Button onClick={HandleButton('good')} body={'good'} />
        <Button onClick={HandleButton('neutral')} body={'neutral'} />
        <Button onClick={HandleButton('bad')} body={'bad'} />
      </div>
      <h2>statistics</h2>
      <div>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
