import React from 'react';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Avatar from '@material-ui/core/Avatar/Avatar';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import getDisplayName from '../../helper/getDisplayName';
import Divider from '@material-ui/core/Divider/Divider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { isLoadingAction } from '../../reducers/selector';
import { LoadingEvents } from '../../helper/loadingEvents';
import withLoading from '../hoc/Loading';
import { connect } from 'react-redux';

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.primary['500']
  },
  listItem: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '5px',
      paddingRight: '0'
    },
    textAlign: 'left'
  }
});
export class PlotEmployeeSearchList extends React.Component {
  plotSearchEntry = employee => {
    const { classes } = this.props;
    return (
      <div key={employee.id}>
        <ListItem
          button
          className={classes.listItem}
          onClick={this.props.selectEmployee(employee)}
        >
          <Avatar className={classes.avatar}>
            {employee.firstName.charAt(0)}
            {employee.lastName.charAt(0)}
          </Avatar>
          <ListItemText primary={getDisplayName(employee)} />
        </ListItem>
        <Divider />
      </div>
    );
  };

  render() {
    const { searchResults, excludeList } = this.props;
    let searchResultsWithoutExclude = searchResults.filter(
      employee => !excludeList.includes(employee.id)
    );

    return searchResultsWithoutExclude.length > 0 ? (
      searchResultsWithoutExclude.map(employee => {
        return this.plotSearchEntry(employee);
      })
    ) : (
      <p>Keine Suchtreffer</p>
    );
  }
}

PlotEmployeeSearchList.propTypes = {
  excludeList: PropTypes.array,
  selectEmployee: PropTypes.func
};

export const StyledComponent = withStyles(styles)(PlotEmployeeSearchList);
export default connect(
  state => ({
    searchResults: state.employeeSearchResults,
    isLoading: isLoadingAction(state, LoadingEvents.FETCH_EMPLOYEES)
  }),
  {}
)(withLoading()(StyledComponent));
