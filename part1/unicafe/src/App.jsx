import { useState } from 'react';
import Button from './components/Button';
import Statistics from './components/Statistics';

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={ (() => setGood(good + 1)) } name="good" />
      <Button onClick={ (() => setNeutral(neutral + 1)) } name="neutral" />
      <Button onClick={ (() => setBad(bad + 1)) } name="bad" />
      <h2>statistics</h2>
      <Statistics data={ { good, neutral, bad } } />
    </div>
  );
};

export default App;
