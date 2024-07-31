import React from 'react';
import ReactDOM from 'react-dom/client';
import TodoApp from './app';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TodoApp />
  </React.StrictMode>
);
