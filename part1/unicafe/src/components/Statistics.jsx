import PropTypes from 'prop-types';

const Statistics = ({ data }) => {
  const { good, neutral, bad } = data;
  const all = good + neutral + bad;

  return (
    <>
      { all > 0 ? (
        <>
          <table>
            <tbody>
              <tr>
                <td>good</td>
                <td>{ good }</td>
              </tr>
              <tr>
                <td>neutral</td>
                <td>{ neutral }</td>
              </tr>
              <tr>
                <td>bad</td>
                <td>{ bad }</td>
              </tr>
              <tr>
                <td>all</td>
                <td>{ all }</td>
              </tr>
              <tr>
                <td>average</td>
                <td>{ (good - bad) / all }</td>
              </tr>
              <tr>
                <td>positive</td>
                <td>{ (good / all) * 100 } %</td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <p>No feedback given</p>
      ) }
    </>
  );
};

Statistics.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Statistics;
