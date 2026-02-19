import { useState } from "react";

const Display = ({ prefix, counter }) => {
  return (
    <div>
      {prefix}
      {counter}
    </div>
  );
};

const Button = (props) => {
  console.log(props);
  const { onClick, text } = props;
  return <button onClick={onClick}>{text}</button>;
};

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }
  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const App = () => {
  const [value, setValue] = useState(10);

  return (
    <div>
      {value}
      <button onClick={() => setValue(0)}>reset to zero</button>
      <button onClick={console.log("clicked the button")}>el buttone</button>
    </div>
  );
};

export default App;
