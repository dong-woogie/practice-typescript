import React from "react";
import GithubProfileLoader from "./containers/GithubProfileLoader";
// import CounterContainer from "./containers/CounterContainer";
// import TodoApp from "./containers/TodoApp";
import Logo from "./static/logo.png";

function App() {
  return (
    <div>
      <GithubProfileLoader />
      <img src={Logo} alt={"logo"} />
    </div>
  );
}

export default App;
