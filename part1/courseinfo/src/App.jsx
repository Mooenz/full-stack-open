import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

const App = () => {
  const course = {
    name: 'Half Stack application development',
    content: [
      {
        title: 'Fundamentals of React',
        exercises: 10,
      },
      {
        title: 'Using props to pass data',
        exercises: 7,
      },
      {
        title: 'State of a component',
        exercises: 14,
      },
    ]
  };

  return (
    <div>
      <Header course={ course.name } />

      <Content info={ course.content } />

      <Total total={ course.content } />
    </div>
  );
};

export default App;
