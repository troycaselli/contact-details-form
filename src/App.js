import React from "react";
import Form from "./pages/Form";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="app-wrapper">
        <Header />
        <Form />
        <Footer />
      </div>
    </div>
  );
}

export default App;
