import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import withLoading from '../hoc/Loading';
import { withStyles } from '@material-ui/core/styles';
import PrState from './PrState';
import PrSalary from './PrSalary';
import PrEmployment from './PrEmployment';
import PrSheet from './PrSheet';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styles from './MyPRListStyle';
import MyPRListFilterDialog from './MyPRListFilterDialog';
import { default as MyPRListItem } from './MyPRListItem';
import List from '@material-ui/core/List';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Hidden from '@material-ui/core/Hidden';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

export class MyPRList extends React.Component {
  constructor(props) {
    super(props);
    let prOpen = props.prs.length !== 0 ? props.prs[0] : null;
    this.state = {
      prs: props.prs,
      prOpen: prOpen,
      filterDialogOpen: false,
      filters: props.filters
        ? props.filters
        : {
            reviewer: 'ALL',
            occasion: 'ALL'
          },
      dateInAscendingOrder: true
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
        return 'Jährlich';
      case 'QUARTERLY':
        return 'Vierteljährlich';
      case 'END_PROBATION':
        return 'Ende der Probezeit';
      default:
        return 'Auf Nachfrage';
    }
  };

  handleClick = () => {
    this.props.addPr();
  };

  handleClickOpenFilterDialog = () => {
    this.setState({ filterDialogOpen: true });
  };

  handleClickCloseFilterDialog = () => {
    this.setState({ filterDialogOpen: false });
  };

  openAnotherSheet = pr => {
    this.setState({
      prOpen: pr
    });
  };

  switchDateOrder = () => {
    this.setState(prevState => ({
      dateInAscendingOrder: !prevState.dateInAscendingOrder,
      prs: this.state.prs.sort(this.dateSort(!prevState.dateInAscendingOrder))
    }));
  };

  dateSort = dateInAscendingOrder => {
    return (firstPR, secondPR) => {
      let comparison = 0;
      if (moment(firstPR.deadline).isBefore(moment(secondPR.deadline))) {
        comparison = 1;
      } else if (moment(firstPR.deadline).isAfter(moment(secondPR.deadline))) {
        comparison = -1;
      }
      return dateInAscendingOrder ? comparison * -1 : comparison;
    };
  };

  filterPR = pr => {
    const { filters } = this.state;
    return (
      pr.employee.firstName === 'Lionel' &&
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
    this.setState({
      prs: this.state.prs.sort(this.dateSort(this.state.dateInAscendingOrder))
    });
  }

  render() {
    const { classes, prs } = this.props;
    const { prOpen, dateInAscendingOrder } = this.state;
    return (
      <div>
        <Typography variant="display1" paragraph>
          Performance Reviews
        </Typography>

        <Hidden smDown>
          <div className={classes.buttonWrapper}>
            <Button
              className={classes.buttonDesktop}
              variant="raised"
              onClick={this.handleClick}
            >
              <Icon className={classes.leftIcon}>add</Icon>
              Beantrage PR
            </Button>
          </div>
        </Hidden>
        <div className={classes.prControls}>
          <Button id="sortButton" onClick={this.switchDateOrder}>
            <Icon className={classes.leftIcon}>
              {dateInAscendingOrder ? 'arrow_upward' : 'arrow_downward'}
            </Icon>
            Datum
          </Button>
          <Hidden smDown>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="reviewer">Beurteiler</InputLabel>
              <Select
                id="_SelectIdFilter"
                value={this.state.filters.reviewer}
                onChange={this.handleFilter}
                displayEmpty
                inputProps={{
                  name: 'Reviewer',
                  id: '_SelectIdFilter'
                }}
              >
                <MenuItem value="ALL">
                  <div className={classes.filterDesktop}>Alle</div>
                </MenuItem>
                {Array.from(new Set(prs.map(pr => pr.supervisor))).map(
                  reviewer => {
                    return (
                      <MenuItem key={reviewer} value={reviewer}>
                        <div className={classes.filterDesktop}>{reviewer}</div>
                      </MenuItem>
                    );
                  }
                )}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="occasion">Anlass</InputLabel>
              <Select
                id="_SelectIdFilter"
                value={this.state.filters.occasion}
                onChange={this.handleFilter}
                displayEmpty
                name="Occasion"
                inputProps={{
                  name: 'Occasion',
                  id: '_SelectIdFilter'
                }}
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
            </FormControl>
          </Hidden>
          <Hidden smUp>
            <Button
              id="openFilterDialog"
              onClick={this.handleClickOpenFilterDialog}
            >
              <Icon className={classes.leftIcon}>filter_list</Icon>Filter
            </Button>
            <MyPRListFilterDialog
              open={this.state.filterDialogOpen}
              handleClose={this.handleClickCloseFilterDialog}
            >
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="reviewer">Beurteiler</InputLabel>
                <Select
                  value={this.state.filters.reviewer}
                  onChange={this.handleFilter}
                  displayEmpty
                  inputProps={{
                    name: 'Reviewer',
                    id: '_SelectIdFilter'
                  }}
                >
                  <MenuItem value="ALL">
                    <div className={classes.filterDesktop}>Alle</div>
                  </MenuItem>
                  {Array.from(new Set(prs.map(pr => pr.supervisor))).map(
                    reviewer => {
                      return (
                        <MenuItem key={reviewer} value={reviewer}>
                          <div className={classes.filterDesktop}>
                            {reviewer}
                          </div>
                        </MenuItem>
                      );
                    }
                  )}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="occasion">Anlass</InputLabel>
                <Select
                  value={this.state.filters.occasion}
                  onChange={this.handleFilter}
                  displayEmpty
                  inputProps={{
                    name: 'Occasion',
                    id: '_SelectIdFilter'
                  }}
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
              </FormControl>
            </MyPRListFilterDialog>
          </Hidden>
        </div>
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
            <AddIcon />
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
    addSupervisor: actions.addSupervisor
  }
)(withLoading(props => props.fetchPrs())(StyledComponent));
