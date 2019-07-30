import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>todos</h1>
      </header>
      <section>
        <form id="todoForm">
          <label id="firstLabel"></label>
          <input id="firstInput" placeholder="What needs to be done?"></input>
        </form>
      </section>
      <footer id="footerPage">
        <p className="footerPageText">Double-click to edit a todo</p>
        <p className="footerPageText">Created by petehunt</p>
      </footer>
    </div>
  );
}

export default App;
