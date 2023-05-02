import React from "react";
import TextEditor from "./components/TextEditor";
import UserCounter from "./components/UserCounter";
import "./index.css";

function App() {
  return (
    <div className="container">
      <div className="card">
        <h1 className="card-title">Real-time Collaborative Text Editor</h1>
        <div className="editor-container">
          <TextEditor />
        </div>
        <UserCounter />
      </div>
    </div>
  );
}

export default App;
