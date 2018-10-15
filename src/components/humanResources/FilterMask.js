import React from 'react';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import TextField from '@material-ui/core/TextField/TextField';
import ListItem from '@material-ui/core/ListItem/ListItem';
import List from '@material-ui/core/List/List';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import EmployeeSearchDialog from '../employeeSearch/EmployeeSearchDialog';
import ExcelLikeSearchMenue from './ExcelLikeSearchMenue';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  }
});

class FilterMask extends React.Component {
  state = {
    open: false,
    filter: {
      employeeId: null
    }
  };

  changeFilter = name => event => {
    console.log('Test: ' + event.target.value);
    this.setState({ [name]: event.target.value });
  };

  sendFilter = filter => {
    this.props.fetchFilteredPrsForHumanResource(filter);
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  selectEmployee = employee => {
    this.handleClose();
    console.log('employeeId: ' + employee.id);
    let filter = this.state.filter;
    filter.employeeId = employee.id;
    this.setState({ filter });
    this.sendFilter(filter);
  };

  render() {
    return (
      <List>
        <ListItem>
          <Button disabled={false} onClick={this.handleClickOpen}>
            Mitarbeiter Suche
          </Button>
          <EmployeeSearchDialog
            open={this.state.open}
            handleClose={this.handleClose}
            selectEmployee={this.selectEmployee}
            title={'Suchen nach'}
          />
          <ExcelLikeSearchMenue
            content={
              <List>
                <ListItem>
                  <TextField
                    id="date"
                    label="Fälligkeit von"
                    type="date"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  <TextField
                    id="date"
                    label="Fälligkeit bis"
                    type="date"
                    defaultValue="2017-05-24"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </ListItem>
              </List>
            }
          />
        </ListItem>
      </List>
    );
  }
}

FilterMask.propTypes = {};

export const StyledComponent = withStyles(styles)(FilterMask);
export default connect(
  state => ({}),
  {
    fetchFilteredPrsForHumanResource: actions.fetchFilteredPrsForHumanResource
  }
)(StyledComponent);
