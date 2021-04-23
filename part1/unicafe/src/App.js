import React, { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.name}</button>;
};

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  let all = props.good + props.bad + props.neutral;
  if (all === 0) {
    return <div>No Feedback given</div>;
  } else {
    return (
      <div>
        <Statistic name="good" value={props.good} />
        <Statistic name="neutral" value={props.neutral} />
        <Statistic name="bad" value={props.bad} />
        <Statistic name="all" value={all} />
        <Statistic name="average" value={(props.good - props.bad) / all} />
        <Statistic name="positive" value={(props.good / all) * 100 + " %"} />
      </div>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button name="good" handleClick={() => setGood(good + 1)} />
      <Button name="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button name="bad" handleClick={() => setBad(bad + 1)} />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
