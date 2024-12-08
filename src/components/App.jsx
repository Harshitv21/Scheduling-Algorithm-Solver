// import { useState } from 'react';
import "../styles/App.css";
import { Header } from "./Header";
import { Input } from "./Input";
import Footer from "./Footer";

function App() {
  return (
    <>
      <div className="headingContainer">
        <Header />
      </div>
      <div>
        <Input />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;
