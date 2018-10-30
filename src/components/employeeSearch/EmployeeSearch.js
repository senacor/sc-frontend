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
    flexDirection: 'column'
  },
  listItem: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '0',
      paddingRight: '0'
    },
    textAlign: 'center'
  },

  insideList: {
    textAlign: 'center'
  },
  employeeList: {
    width: '100%'
  },

  avatar: {
    backgroundColor: theme.palette.primary['500']
  }
});

export class EmployeeSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      employeeSearchValue: this.props.employeeSearchValue
        ? this.props.employeeSearchValue
        : '',
      searchReady: false
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      searchReady: false
    });
    if (event.target.value) {
      this.executeSearch(event.target.value);
    }
  };

  selectedEmployee = employee => () => {
    let employeeName = `${employee.firstName} ${employee.lastName}`;
    this.setState({ employeeSearchValue: employeeName, searchReady: true });
    this.props.selectEmployee(employee);
  };

  executeSearch = debounce(this.props.prSearch, 500);

  render() {
    const { classes, prSearchResults } = this.props;

    return (
      <div className={classes.box}>
        {this.props.inputElement(
          this.state.employeeSearchValue,
          this.handleChange
        )}
        {!this.state.searchReady ? (
          this.state.employeeSearchValue ? (
            <List
              id="employeeSearchResultList"
              component="nav"
              className={classes.employeeList}
            >
              {prSearchResults.length > 0 ? (
                prSearchResults.map(employee => {
                  return (
                    <div key={employee.id}>
                      <ListItem
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
                })
              ) : (
                <p>Keine Suchtreffer</p>
              )}
            </List>
          ) : (
            <p>Keine Suchtreffer</p>
          )
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
  )
};

export const StyledComponent = withStyles(styles)(EmployeeSearch);
export default connect(
  state => ({
    prSearchResults: state.search.prSearchResults
  }),
  {
    prSearch: actions.prSearch
  }
)(StyledComponent);
