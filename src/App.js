import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Tree from './Tree';
import reducers from './reducers';
import './App.css';

const store = createStore(reducers);

export default function () {
  return (
    <Provider store={store}>
      <Tree />
    </Provider>
  );
}
