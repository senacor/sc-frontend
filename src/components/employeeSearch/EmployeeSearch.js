import React from 'react';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles/index';
import { debounce } from '../../helper/debounce';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import PlotEmployeeSearchList from './PlotEmployeeSearchList';

const styles = {
  box: {
    display: 'flex',
    padding: '20px',
    flexDirection: 'column',
    width: '200px'
  },
  employeeList: {
    width: '100%',
    height: '300px'
  }
};

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
            <PlotEmployeeSearchList
              searchResults={employeeSearchResults}
              excludeList={excludeList}
              selectEmployee={this.selectedEmployee}
            />
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
