import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import withLoading from '../hoc/Loading';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Hidden from '@material-ui/core/Hidden';
import AddIcon from '@material-ui/icons/Add';
import PrState from './PrState';
import PrSalary from './PrSalary';
import PrEmployment from './PrEmployment';
import PrSheet from './PrSheet';
import Card from '@material-ui/core/Card';
import moment from 'moment';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './MyPRListStyle';
import { default as MyPRListItem } from './MyPRListItem';

export class MyPRList extends React.Component {
  constructor(props) {
    super(props);
    let prOpen = props.prs.length !== 0 ? props.prs[0] : null;
    this.state = {
      prs: props.prs,
      prOpen: prOpen,
      filters: props.filters
        ? props.filters
        : {
            reviewer: 'ALL',
            occasion: 'ALL'
          },
      sortOrder: 'asc'
    };
  }

  translateStatus = status => {
    switch (status) {
      case 'PREPARATION':
        return 'In Vorbereitung';
      case 'EXECUTION':
        return 'In Durchführung';
      case 'POST_PROCESSING':
        return 'Nachbearbeitung';
      case 'DONE':
        return 'Fertig';
      default:
        return 'In Vorbereitung';
    }
  };

  translateOccasion = occasion => {
    switch (occasion) {
      case 'ON_DEMAND':
        return 'Auf Nachfrage';
      case 'YEARLY':
        return 'jährlich';
      case 'QUARTERLY':
        return 'vierteljährlich';
      case 'END_PROBATION':
        return 'Ende der Probezeit';
      default:
        return 'Auf Nachfrage';
    }
  };

  handleClick = () => {
    this.props.addPr();
  };

  openAnotherSheet = pr => {
    this.setState({
      prOpen: pr
    });
  };

  switchDateOrder = () => {
    this.setState({
      sortOrder: this.state.sortOrder === 'asc' ? 'desc' : 'asc'
    });
    this.props.ChangePrSortOrderToProvidedDirection(this.state.sortOrder);
  };

  filterPR = pr => {
    const { filters } = this.state;
    return (
      //pr.employee.firstName === 'Lionel' &&
      (filters.reviewer === 'ALL' || pr.supervisor === filters.reviewer) &&
      (filters.occasion === 'ALL' || pr.occasion === filters.occasion)
    );
  };

  handleFilter = event => {
    const oldfilter = this.state.filters;
    switch (event.target.name) {
      case 'Reviewer':
        this.setState({
          filters: {
            ...oldfilter,
            reviewer: event.target.value
          }
        });
        break;
      case 'Occasion':
        this.setState({
          filters: {
            ...oldfilter,
            occasion: event.target.value
          }
        });
        break;
      default:
        break;
    }
  };

  componentDidMount() {
    this.props.ChangePrSortOrderToProvidedDirection(this.state.sortOrder);
  }

  render() {
    const { classes, prs } = this.props;
    const { prOpen, sortOrder } = this.state;
    return (
      <div>
        <Typography variant="display1" paragraph>
          Performance Reviews
        </Typography>
        <Button
          id="sortButton"
          className={classes.button}
          variant="outlined"
          onClick={this.switchDateOrder}
        >
          Datum
          <Icon className={classes.rightIcon}>
            {sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward'}
          </Icon>
        </Button>

        <Select
          id="_SelectIdFilter"
          value={this.state.filters.reviewer}
          onChange={this.handleFilter}
          displayEmpty
          name="Reviewer"
          className={classes.buttonDesktop}
        >
          <MenuItem value="ALL">
            <div className={classes.filterDesktop}>Alle</div>
          </MenuItem>
          {Array.from(new Set(prs.map(pr => pr.supervisor))).map(reviewer => {
            return (
              <MenuItem key={reviewer} value={reviewer}>
                <div className={classes.filterDesktop}>{reviewer}</div>
              </MenuItem>
            );
          })}
        </Select>
        <Select
          id="_SelectIdFilter"
          value={this.state.filters.occasion}
          onChange={this.handleFilter}
          displayEmpty
          name="Occasion"
          className={classes.buttonDesktop}
        >
          <MenuItem value="ALL">
            <div className={classes.filterDesktop}>Alle</div>
          </MenuItem>
          {['ON_DEMAND', 'YEARLY', 'QUARTERLY', 'END_PROBATION'].map(
            occasion => {
              return (
                <MenuItem key={occasion} value={occasion}>
                  <div className={classes.filterDesktop}>
                    {this.translateOccasion(occasion)}
                  </div>
                </MenuItem>
              );
            }
          )}
        </Select>

        <Hidden smDown>
          <Button
            className={classes.buttonDesktop}
            variant="raised"
            onClick={this.handleClick}
          >
            PR beantragen
            <Icon className={classes.rightIcon}>add</Icon>
          </Button>
        </Hidden>

        <Hidden smDown>
          <div className={classes.container}>
            <div className={classes.root}>
              {prs.filter(this.filterPR).map(pr => {
                return (
                  <Button
                    key={pr.id}
                    id={pr.id}
                    className={classes.buttonList}
                    onClick={() => {
                      this.openAnotherSheet(pr);
                    }}
                  >
                    <List
                      className={
                        prOpen === pr ? classes.openList : classes.list
                      }
                    >
                      <MyPRListItem
                        reviewer={pr.supervisor}
                        deadline={pr.deadline}
                        occasion={this.translateOccasion(pr.occasion)}
                        status={this.translateStatus(pr.status)}
                      />
                    </List>
                  </Button>
                );
              })}
            </div>
            {prs.length === 0 ? (
              ''
            ) : (
              <div className={classes.cardContainerRow}>
                <Card className={classes.cardColumnSheet}>
                  <Typography variant="body2" className={classes.title}>
                    SHEET
                  </Typography>
                  <PrSheet prById={prs[0]} />
                </Card>
                <div className={classes.cardContainerColumn}>
                  <Card className={classes.cardColumn}>
                    <Typography variant="body2" className={classes.title}>
                      GEHALT UND ANSTELLUNG
                    </Typography>
                    <PrSalary prById={prs[0]} />
                    <PrEmployment prById={prs[0]} />
                  </Card>

                  <Card className={classes.cardColumn}>
                    <Typography variant="body2" className={classes.title}>
                      STATUS
                    </Typography>
                    <PrState expanded={this.state.expanded} />
                  </Card>
                </div>
              </div>
            )}
          </div>
        </Hidden>
        <Hidden smUp>
          {prs.filter(this.filterPR).map(pr => {
            return (
              <Link
                key={pr.id}
                to={`/prs/${pr.id}`}
                style={{ textDecoration: 'none' }}
              >
                <List className={classes.list}>
                  <MyPRListItem
                    reviewer={pr.supervisor}
                    deadline={pr.deadline}
                    occasion={this.translateOccasion(pr.occasion)}
                    status={this.translateStatus(pr.status)}
                  />
                </List>
              </Link>
            );
          })}
        </Hidden>
        <Hidden smUp>
          <Button
            variant="fab"
            color="primary"
            aria-label="add"
            className={classes.buttonMobile}
            onClick={this.handleClick}
          >
            <AddIcon className={classes.icon} />
          </Button>
        </Hidden>
      </div>
    );
  }
}

export const StyledComponent = withStyles(styles)(MyPRList);
export default connect(
  state => ({
    prs: state.prs.prsList,
    isLoading: state.isLoading
  }),
  {
    fetchPrs: actions.fetchPrs,
    addPr: actions.addPr,
    addSupervisor: actions.addSupervisor,
    ChangePrSortOrderToProvidedDirection:
      actions.ChangePrSortOrderToProvidedDirection
  }
)(withLoading(props => props.fetchPrs())(StyledComponent));
