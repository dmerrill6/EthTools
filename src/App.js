import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import Home from './views/home';
import ExploreContract from './views/explore-contract';
import DeployContract from './views/deploy-contract';
import About from './views/about';
import License from './views/license';
import Layout from './containers/layout';



const App = ({ store }) => (
  <div>
    <Provider store={store}>
      <Router>
        <Layout>
          <Route exact path="/" component={Home}/>
          <Route path="/contracts" component={ExploreContract}/>
          <Route path="/deploy" component={DeployContract} />
          <Route path="/about" component={About} />
          <Route path="/license" component={License}/>
        </Layout>
      </Router>
    </Provider>
  </div>
)
export default App;
