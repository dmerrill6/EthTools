import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Home from './containers/home/index';
import ContractUI from './containers/contract-ui';
import About from './containers/about';
import Layout from './containers/layout';



const App = ({ store }) => (
  <div>
    <Provider store={store}>
      <Router>
        <Layout>
          <Route exact path="/" component={Home}/>
          <Route path="/contracts" component={ContractUI} />
          <Route path="/about" component={About}/>
        </Layout>
      </Router>
    </Provider>
  </div>
)
export default App;
