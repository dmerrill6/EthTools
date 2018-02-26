import React from 'react';
import PropTypes from 'prop-types';

const Home = (props) => {
  return (
    <div>
      <h1>Hello World</h1>
      {props.children}
    </div>
  );
};

Home.propTypes = {
  children: PropTypes.node
};

export default Home;
