import React from 'react';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Avatar from '@material-ui/core/Avatar/Avatar';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import getDisplayName from '../../helper/getDisplayName';
import Divider from '@material-ui/core/Divider/Divider';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { LoadingEvents } from '../../helper/loadingEvents';
import { connect } from 'react-redux';
import withLoadingAction from '../hoc/LoadingWithAction';
import Highlighter from 'react-highlight-words';
import { injectIntl } from 'react-intl';

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

const PlotEmployeeSearchList = props => {
  const plotSearchEntry = employee => {
    return (
      <div key={employee.id}>
        <ListItem
          button
          className={props.classes.listItem}
          onClick={props.selectEmployee(employee)}
        >
          <Avatar className={props.classes.avatar}>
            {employee.firstName.charAt(0)}
            {employee.lastName.charAt(0)}
          </Avatar>
          <ListItemText
            primary={
              <Highlighter
                highlightStyle={{ fontWeight: 'bold', background: 'none' }}
                searchWords={
                  props.searchValue ? props.searchValue.split(' ') : []
                }
                autoEscape={true}
                textToHighlight={getDisplayName(employee)}
              />
            }
          />
        </ListItem>
        <Divider />
      </div>
    );
  };

  let searchResultsWithoutExclude = props.searchResults.filter(
    employee => !props.excludeList.includes(employee.id)
  );

  return searchResultsWithoutExclude.length > 0 ? (
    searchResultsWithoutExclude.map(employee => {
      return plotSearchEntry(employee);
    })
  ) : (
    <p>
      {props.intl.formatMessage({
        id: 'plotemployeesearchList.noresults'
      })}
    </p>
  );
};

PlotEmployeeSearchList.propTypes = {
  excludeList: PropTypes.array,
  selectEmployee: PropTypes.func,
  searchValue: PropTypes.string
};

export const StyledComponent = withStyles(styles)(PlotEmployeeSearchList);
export default injectIntl(
  connect(
    state => ({
      searchResults: state.employeeSearchResults
    }),
    {}
  )(withLoadingAction()([LoadingEvents.FETCH_EMPLOYEES])(StyledComponent))
);
