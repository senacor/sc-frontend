import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles/index';
import { debounce } from '../../helper/debounce';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import Popover from '@material-ui/core/Popover/Popover';
import PropTypes from 'prop-types';
import PlotEmployeeSearchList from '../employeeSearch/PlotEmployeeSearchList';

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
  popover: {
    height: '300px',
    align: 'stretch'
  },
  list: {
    width: '200px',
    maxHeight: '300px'
  },
  textField: {
    marginLeft: '0px',
    marginRight: theme.spacing.unit,
    '&:hover': {
      border: '1px solid rgba(0,0,0,0.235)',
      borderRadius: '4px'
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
    border: '2px solid rgba(0,73,83)',
    borderRadius: '4px',
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
    event.stopPropagation();
  };

  onKeyDown = event => {
    if (event.key === 'Enter') {
      if (this.state.employeeSearchValue === '') {
        this.resetToSupervisor();
      } else {
        this.handleClose(event);
      }
    }
  };

  handleChange = event => {
    this.setState({
      employeeSearchValue: event.target.value,
      anchorEl: event.currentTarget,
      showDefault: event.target.value === ''
    });
    this.executeSearch(event.target.value === '' ? ' ' : event.target.value);
  };

  selectedEmployee = employee => event => {
    let employeeName = `${employee.firstName} ${employee.lastName}`;
    this.setState({ employeeSearchValue: employeeName });
    this.props.delegateReviewer(this.state.currentPr.id, employee.id);
    this.props.employeeSearchClear();
    this.handleClose(event);
  };

  executeSearch = debounce(this.props.employeeSearch, 500);

  handleClose = event => {
    const searchValue = this.props.startValue;
    this.setState({
      anchorEl: null,
      showDefault: false,
      employeeSearchValue: searchValue
    });
    event.stopPropagation();
  };

  resetToSupervisor = () => {
    const { currentPr } = this.state;

    this.setState({
      anchorEl: null,
      showDefault: false
    });
    this.props.delegateReviewer(currentPr.id, currentPr.supervisor.id);
  };

  componentDidUpdate(prevProps) {
    if (this.props.startValue !== prevProps.startValue) {
      this.setState({ employeeSearchValue: this.props.startValue });
    }
  }

  render() {
    const { classes, defaultText, isDelegated } = this.props;
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
            className={classes.popover}
            disableAutoFocus={true}
          >
            <List dense id="employeeSearchResultList" className={classes.list}>
              {showDefault ? (
                <ListItem
                  button
                  className={classes.listItem}
                  onClick={this.resetToSupervisor}
                >
                  <ListItemText primary={defaultText} />
                </ListItem>
              ) : null}
              <PlotEmployeeSearchList
                excludeList={excludeList}
                selectEmployee={this.selectedEmployee}
              />
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
  state => ({}),
  {
    employeeSearch: actions.employeeSearch,
    employeeSearchClear: actions.employeeSearchClear,
    delegateReviewer: actions.delegateReviewer
  }
)(StyledComponent);
