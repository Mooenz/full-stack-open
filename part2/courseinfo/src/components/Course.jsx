import PropTypes from 'prop-types'
import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({ course }) => {
  return (
    <>
      <Header course={ course.name } />

      <Content info={ course.parts } />

      <Total total={ course.parts } />
    </>
  )
}

Course.propTypes = {
  course: PropTypes.object.isRequired
}

export default Course