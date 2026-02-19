import ReactDOM from "react-dom/client";

import App from "./App";
import App2 from "./App2";

let counter = 1;

const root = ReactDOM.createRoot(document.getElementById("root"));

const refresh = () => {
  root.render(
    <div>
      <App counter={counter} />
    </div>,
  );
  console.log("rendering " + counter);
};

refresh();
