import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/MyButton';
// Redux stuff
import { connect } from 'react-redux';
import { updateStar, clearErrors } from '../../redux/actions';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import AddIcon from '@material-ui/icons/Add';

const styles = {
  // ...theme.spreadProfile,
  button: {
    float: 'right',
    color: '#fff',
    fontSize: 14,
    marginRight: 50,
  },
};

class AddStar extends Component {
  state = {
    plain_orders_star_name: '',
    plain_orders_hidden_coordinates: '',
    plain_orders_hidden_id_constellation: '',
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
    // this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = () => {
    const updatedData = {
      plain_orders_star_name: this.state.plain_orders_star_name,
      plain_orders_hidden_coordinates: this.state
        .plain_orders_hidden_coordinates,
      plain_orders_hidden_id_constellation: this.state
        .plain_orders_hidden_id_constellation,
    };
    this.props.updateStar(this.props.starId, updatedData);
    this.handleClose();
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip='Add Details'
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <AddIcon color='tertiary' />
          Add Star
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle>Add details star</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name='plain_orders_star_name'
                tpye='text'
                label='star name'
                placeholder='edit Plain order start name'
                className={classes.textField}
                value={this.state.plain_orders_star_name}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name='plain_orders_hidden_coordinates'
                tpye='text'
                label='coordinates'
                placeholder='plain orders hidden coordinates'
                className={classes.textField}
                value={this.state.plain_orders_hidden_coordinates}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name='plain_orders_hidden_id_constellation'
                tpye='text'
                label='Hidden Id constellation'
                placeholder='plain orders hidden id constellation'
                className={classes.textField}
                value={this.state.plain_orders_hidden_id_constellation}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color='primary'>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

AddStar.propTypes = {
  updateStar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { updateStar, clearErrors })(
  withStyles(styles)(AddStar)
);
