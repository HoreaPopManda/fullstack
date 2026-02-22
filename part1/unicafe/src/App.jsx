import { useState } from "react";

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }
  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

// This is the right place to define a component
const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

// Do not define components inside another component

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <table>
      <StatisticsLine text="good" value={props.good} />
      <StatisticsLine text="neutral" value={props.neutral} />
      <StatisticsLine text="bad" value={props.bad} />
      <StatisticsLine
        text="all"
        value={props.good + props.neutral + props.bad}
      />
      <StatisticsLine
        text="average"
        value={
          (props.good - props.bad) / (props.good + props.neutral + props.bad)
        }
      />
      <StatisticsLine
        text="positive"
        value={
          (props.good / (props.good + props.neutral + props.bad)) * 100 + " %"
        }
      />
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <p>Give feedback </p>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <p>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </p>
    </div>
  );
};
export default App;
