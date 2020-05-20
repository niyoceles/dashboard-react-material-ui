import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../utils/MyButton';
import AddStar from '../components/Modals/AddStar';
// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { logoutUser } from '../redux/actions';

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 2,
  },
  title: {
    flexGrow: 1,
  },
  button: {
    float: 'right',
    color: '#fff',
    fontSize: 14,
  },
};

class Navbar extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Company name
            </Typography>
            <AddStar />
            <MyButton
              tip='Logout'
              btnClassName={classes.button}
              onClick={this.handleLogout}
            >
              Logout
            </MyButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { logoutUser })(
  withStyles(styles)(Navbar)
);
