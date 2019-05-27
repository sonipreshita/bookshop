import React from 'react';
import './app.scss';
import PropTypes from 'prop-types';

const App = (props) => {
  return (
    <div className="container">
      {/* <NavContent /> */}
      {props.children}
    </div>
  );
};
App.propTypes = {
  children: PropTypes.object
};

export default App;
