import ReactDOM from "react-dom/client";

import App from "./App";

let counter = 1;

const root = ReactDOM.createRoot(document.getElementById("root"));

const refresh = () => {
  root.render(
    <div>
      <App/>
    </div>,
  );
};

refresh();
