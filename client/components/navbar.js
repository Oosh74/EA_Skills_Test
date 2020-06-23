import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout, schoolData} from '../store';

const Navbar = (props) => {
  /*
  react hook, useEffect, allows functional components to have similiar functionality
  to componentDidMount(). [] on line 15 prevents constant updates/infinite loop.
  */

  useEffect(() => {
    props.getSchoolData();
  }, []);

  console.log('THE PROPS --->', props);
  return (
    <div>
      <h1>Education Analytics</h1>
      <nav>
        {props.isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={props.handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

//Redux Logic

const mapState = (state) => ({
  isLoggedIn: !!state.user.id,
  data: state.school,
});

const mapDispatch = (dispatch) => ({
  handleClick() {
    dispatch(logout());
  },
  getSchoolData: () => dispatch(schoolData()),
});

export default connect(mapState, mapDispatch)(Navbar);

//PROP TYPES
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
