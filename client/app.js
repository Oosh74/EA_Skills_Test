import React from 'react';
import {Dashboard} from './components';
import Routes from './routes';
console.log('API KEY', process.env.REACT_APP_API_KEY);

const App = () => {
  return (
    <div>
      <Dashboard />
      <Routes />
    </div>
  );
};

export default App;
