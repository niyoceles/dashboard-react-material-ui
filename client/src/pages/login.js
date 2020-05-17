import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//Mui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions';

//styling with material UI
const styles = theme => ({
  ...theme.spreadAuth,
});

class login extends Component {
  state = {
    email: '',
    password: '',
    error: {},
  };

  static getDerivedStateFromProps(props) {
    if (props.UI.error) {
      return { error: props.UI.error };
    }
  }

  handleSignin = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    //from action
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const error = this.state.error;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant='h3' className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSignin} autoComplete='off'>
            <TextField
              id='email'
              name='email'
              type='email'
              label='Email'
              variant='outlined'
              className={classes.textField}
              helperText={error.email}
              error={error.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id='password'
              name='password'
              type='password'
              label='Password'
              variant='outlined'
              className={classes.textField}
              helperText={error.password}
              error={error.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {error.incorrect && (
              <Typography variant='body2' className={classes.customError}>
                {error.incorrect}
              </Typography>
            )}

            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI,
});

const mapActionToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(login));
