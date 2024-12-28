import React from 'react';
import ReactDOM from 'react-dom/client';

const Header = ({ title }) => <h1>{title}</h1>;

const Part = ({ part }) => (
  <p>
    {part.title} {part.exercises}
  </p>
);

const Content = ({ content }) => (
  <div>
    <Part part={content.one} />
    <Part part={content.two} />
    <Part part={content.three} />
  </div>
);

const Total = ({ total }) => {
  const totals =
    total.one.exercises + total.two.exercises + total.three.exercises;

  return <p>Number of exercises: {totals}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
      <Header title={course.name} />
      <Content content={course.parts} />
      <Total total={course.parts} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
