import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles/index';
import { debounce } from '../../helper/debounce';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import getDisplayName from '../../helper/getDisplayName';

const styles = theme => ({
  box: {
    display: 'flex',
    padding: '20px',
    flexDirection: 'column',
    width: '200px'
  },
  listItem: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '5px',
      paddingRight: '0'
    },
    textAlign: 'center'
  },
  employeeList: {
    width: '100%'
  },

  avatar: {
    backgroundColor: theme.palette.primary['500']
  },
  menu: {
    height: '400px',
    align: 'stretch'
  }
});

export class EmployeeSearch extends React.Component {
  constructor(props) {
    super(props);
    this.props.employeeSearchClear();

    this.state = {
      employeeSearchValue: this.props.employeeSearchValue
        ? this.props.employeeSearchValue
        : ''
    };
  }

  handleChange = event => {
    this.setState({
      employeeSearchValue: event.target.value
    });
    if (event.target.value) {
      this.executeSearch(event.target.value);
    }
  };

  selectedEmployee = employee => () => {
    let employeeName = `${employee.firstName} ${employee.lastName}`;
    this.setState({ employeeSearchValue: employeeName });
    this.props.selectEmployee(employee);
    this.props.employeeSearchClear();
  };

  executeSearch = debounce(this.props.employeeSearch, 500);

  plotSearchEntry = (employee, classes) => {
    return (
      <div key={employee.id}>
        <ListItem
          button
          className={classes.listItem}
          onClick={this.selectedEmployee(employee)}
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
    const {
      classes,
      extClasses,
      employeeSearchResults,
      excludeList
    } = this.props;
    const { employeeSearchValue } = this.state;

    return (
      <div className={extClasses.root ? extClasses.root : classes.box}>
        {this.props.inputElement(employeeSearchValue, this.handleChange)}
        {employeeSearchValue !== '' ? (
          <List
            dense
            id="employeeSearchResultList"
            component="nav"
            className={classes.employeeList}
          >
            <ListItem />
            {employeeSearchResults.length > 0 ? (
              employeeSearchResults.map(employee => {
                return excludeList.includes(employee.id)
                  ? null
                  : this.plotSearchEntry(employee, classes);
              })
            ) : (
              <p>Keine Suchtreffer</p>
            )}
          </List>
        ) : null}
      </div>
    );
  }
}

EmployeeSearch.defaultProps = {
  inputElement: (value, onChange) => (
    <TextField
      label="Name, Email, ..."
      value={value}
      InputProps={{
        name: 'employeeSearchValue'
      }}
      onChange={onChange}
    />
  ),
  extClasses: {},
  excludeList: []
};

export const StyledComponent = withStyles(styles)(EmployeeSearch);
export default connect(
  state => ({
    employeeSearchResults: state.employeeSearchResults
  }),
  {
    employeeSearch: actions.employeeSearch,
    employeeSearchClear: actions.employeeSearchClear
  }
)(StyledComponent);
