import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const SimpleComponent = props => {
  return (
    <div dangerouslySetInnerHTML={{__html: `
      <style>
        .red:{
          color: red;
          font-size: 20px;
      </style>
      `}} />
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <SimpleComponent>
             <h2 className="red">Welcome to React</h2>
            </SimpleComponent> 
          
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
