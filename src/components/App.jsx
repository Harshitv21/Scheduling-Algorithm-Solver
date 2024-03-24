// import { useState } from 'react';
import "../styles/App.css";
import { Header } from "./Header";
import { Input } from "./Input";

function App() {
  return (
    <>
      <div className="headingContainer">
        <Header />
      </div>
      <div>
        <Input />
      </div>
    </>
  );
}

export default App;
