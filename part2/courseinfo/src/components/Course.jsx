const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ sum }) => {
  const total = sum.reduce((prevValue, currentValue) => {
    return prevValue + currentValue.exercises;
  }, 0);

  return <h3>Total of exercises {total}</h3>;
};

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => (
  parts.map(({ name, exercises, id }) => <Part key={id} name={name} exercises={exercises} />)
)

const Course = ({ course, parts }) => {
  return (
    <div>
      <h1>Web development Curriculum</h1>
      <Header course={course} />
      <Content parts={parts} />
      <Total sum={parts} />
    </div>
  );
};

export default Course;
