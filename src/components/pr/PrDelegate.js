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
import Popover from '@material-ui/core/Popover/Popover';
import PropTypes from 'prop-types';

const styles = theme => ({
  box: {
    display: 'flex',
    padding: '0px',
    flexDirection: 'column',
    width: '200px'
  },
  listItem: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '5px',
      paddingRight: '0'
    },
    textAlign: 'left',
    width: '200px'
  },
  avatar: {
    backgroundColor: theme.palette.primary['500']
  },
  menu: {
    height: '300px',
    align: 'stretch'
  },
  textField: {
    marginLeft: '0px',
    marginRight: theme.spacing.unit,
    '&:hover': {
      backgroundColor: '#dddddd',
      border: '1px solid #111111',
      borderRadius: '5px'
    }
  },
  input: {
    fontSize: 'small',
    cursor: 'pointer',
    color: '#9d9d9d',
    marginLeft: '5px'
  },
  delegatedInput: {
    fontSize: 'small',
    cursor: 'pointer',
    marginLeft: '5px'
  },
  focused: {
    backgroundColor: '#dddddd',
    border: '1px solid #111111',
    borderRadius: '5px',
    '&:hover': {
      border: '0px'
    }
  }
});

export class PrDelegate extends React.Component {
  constructor(props) {
    super(props);
    this.props.employeeSearchClear();
    this.state = {
      employeeSearchValue: this.props.startValue,
      anchorEl: null,
      currentPr: props.pr,
      showDefault: false
    };
  }

  onClick = event => {
    this.setState({ showDefault: true, anchorEl: event.currentTarget });
    event.target.select();
    this.props.employeeSearchClear();
    this.executeSearch(' ');
  };

  onKeyDown = event => {
    if (event.key === 'Enter') {
      if (this.state.employeeSearchValue === '') {
        this.resetToSupervisor();
      } else {
        this.handleClose();
      }
    }
  };

  handleChange = event => {
    this.setState({
      employeeSearchValue: event.target.value,
      anchorEl: event.currentTarget,
      showDefault: event.target.value === '' ? true : false
    });
    this.executeSearch(event.target.value === '' ? ' ' : event.target.value);
  };

  selectedEmployee = employee => () => {
    let employeeName = `${employee.firstName} ${employee.lastName}`;
    this.setState({ employeeSearchValue: employeeName });
    this.props.delegateReviewer(this.state.currentPr.prId, employee.id);
    this.props.employeeSearchClear();
    this.handleClose();
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

  handleClose = () => {
    const searchValue = this.props.startValue;
    this.setState({
      anchorEl: null,
      showDefault: false,
      employeeSearchValue: searchValue
    });
  };

  resetToSupervisor = () => {
    const { currentPr } = this.state;

    this.setState({
      anchorEl: null,
      showDefault: false
    });
    this.props.delegateReviewer(currentPr.prId, currentPr.supervisor.id);
  };

  componentDidUpdate(prevProps) {
    if (this.props.startValue !== prevProps.startValue) {
      this.setState({ employeeSearchValue: this.props.startValue });
    }
  }

  render() {
    const {
      classes,
      employeeSearchResults,
      defaultText,
      isDelegated
    } = this.props;
    const {
      employeeSearchValue,
      anchorEl,
      currentPr,
      showDefault
    } = this.state;
    const excludeList = [
      currentPr.employee.id,
      currentPr.reviewer.id,
      currentPr.supervisor.id
    ];

    return (
      <div className={classes.box}>
        <TextField
          value={employeeSearchValue}
          onChange={this.handleChange}
          onClick={this.onClick}
          placeholder={defaultText}
          className={classes.textField}
          onKeyDown={this.onKeyDown}
          InputProps={{
            classes: {
              input: isDelegated ? classes.delegatedInput : classes.input,
              focused: classes.focused
            },
            disableUnderline: true
          }}
        />
        {
          <Popover
            id="simple-popper"
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            className={classes.menu}
            disableAutoFocus={true}
          >
            <List
              dense
              id="employeeSearchResultList"
              component="nav"
              className={classes.list}
            >
              {showDefault ? (
                <ListItem
                  button
                  className={classes.listItem}
                  onClick={this.resetToSupervisor}
                >
                  <ListItemText primary={defaultText} />
                </ListItem>
              ) : null}
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
          </Popover>
        }
      </div>
    );
  }
}

PrDelegate.propTypes = {
  startValue: PropTypes.string.isRequired,
  defaultText: PropTypes.string.isRequired,
  pr: PropTypes.object.isRequired
};

export const StyledComponent = withStyles(styles)(PrDelegate);
export default connect(
  state => ({
    employeeSearchResults: state.employeeSearchResults
  }),
  {
    employeeSearch: actions.employeeSearch,
    employeeSearchClear: actions.employeeSearchClear,
    delegateReviewer: actions.delegateReviewer
  }
)(StyledComponent);
