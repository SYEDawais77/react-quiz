import React from "react";
import logo from '../images/reactlogo.png'

export default function Header() {
  return (
    <header className="app-header">
      <img src={logo} alt="React Logo" />
      <h1>The React Quiz</h1>
    </header>
  );
}
