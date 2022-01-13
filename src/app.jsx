import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

function App() {
  return (
    <div>
      <h1 className="esbuild">Hello啊啊啊, Esbuild!!!</h1>
      <h1 className="react">Hello,这是 一个文案React!!!!</h1>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.querySelector('#root'),
);
