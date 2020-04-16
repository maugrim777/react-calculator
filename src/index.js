import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const buttons = [
  {AC:'clear'},
  {'/':'divide'},
  {X:'multiply'},
  {7:'seven'},
  {8:'eight'},
  {9:'nine'},
  {'-':'subtract'},
  {4:'four'},
  {5:'five'},
  {6:'six'},
  {'+':'add'},
  {1:'one'},
  {2:'two'},
  {3:'three'},
  {'=':'equals'},  
  {0:'zero'},  
  {'.':'decimal'}
]


ReactDOM.render(<App buttons={buttons}/>, document.getElementById('root'))

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
