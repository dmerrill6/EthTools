import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import Home from './views/home/index';
import ContractUI from './containers/contract-ui';
import Deploy from './containers/deploy';
import About from './containers/about';
import Layout from './containers/layout';



const App = ({ store }) => (
  <div>
    <Provider store={store}>
      <Router>
        <Layout>
          <Route exact path="/" component={Home}/>
          <Route path="/contracts" component={ContractUI}/>
          <Route path="/deploy" component={Deploy} />
          <Route path="/about" component={About}/>
        </Layout>
      </Router>
    </Provider>
  </div>
)
export default App;
