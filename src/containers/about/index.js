import React from 'react';
import PropTypes from 'prop-types';

const About = (props) => {
  return (
    <div>
      <h1>About</h1>
      {props.children}
    </div>
  );
};

About.propTypes = {
  children: PropTypes.node
};

export default About;
