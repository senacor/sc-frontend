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

class AvailabilityView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      availabilityViewValue: ''
    };
  }

  handleChange = () => event => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.value) {
      this.executeSearch(event.target.value);
    }
  };

  selectedEmployee = employee => () => {
    this.props.selectEmployee(employee);
  };

  executeSearch = debounce(this.props.prSearch, 500);

  render() {
    const { classes, prSearchResults } = this.props;

    return (
      <div className={classes.box}>
        <TextField
          label="Name, Email, ..."
          value={
            this.state.availabilityViewValue
              ? this.state.availabilityViewValue
              : ''
          }
          onChange={this.handleChange()}
          InputProps={{
            name: 'availabilityViewValue'
          }}
        />
        {this.state.availabilityViewValue ? (
          <List
            id="availabilityViewResultList"
            component="nav"
            className={classes.employeeList}
          >
            {prSearchResults.map(employee => {
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
                    <ListItemText
                      primary={`${employee.firstName} ${employee.lastName}`}
                    />
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>
        ) : (
          <p>Keine Suchtreffer</p>
        )}
      </div>
    );
  }
}

export const StyledComponent = withStyles(styles)(AvailabilityView);
export default connect(
  state => ({
    prSearchResults: state.search.prSearchResults
  }),
  {
    prSearch: actions.prSearch
  }
)(StyledComponent);
