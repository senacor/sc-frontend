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
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  container: {
    display: 'flex',
    flexFlow: 'row wrap',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  root: {
    width: '25%',
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper
  },
  buttonMobile: {
    position: 'fixed',
    left: '80%',
    bottom: '10%'
  },
  icon: {
    position: 'fixed',
    left: '84%',
    bottom: '13%'
  },
  buttonDesktop: {
    position: 'relative',
    marginRight: '1%',
    marginLeft: '80%',
    backgroundColor: theme.palette.primary['400'],
    color: '#FFF',
    marginBottom: '2%'
  },
  list: {
    backgroundColor: theme.palette.primary['400'],
    marginBottom: '5px'
  },
  openList: {
    backgroundColor: theme.palette.primary['200'],
    marginBottom: '5px'
  },
  typography: {
    color: theme.palette.primary['50'],
    marginLeft: '25px',
    marginTop: '10px',
    marginBottom: '10px'
  },
  typographyDone: {
    color: theme.palette.primary['50'],
    marginLeft: '25px',
    marginTop: '10px',
    marginBottom: '10px'
  },
  typographyGreen: {
    color: '#40bf40',
    marginLeft: '25px',
    marginTop: '10px',
    marginBottom: '10px'
  },
  listItem: {
    textAlign: 'center',
    padding: '0'
  },
  divItemText: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  cardColumn: {
    alignSelf: 'top',
    boxShadow:
      '0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px 0px rgba(0, 0, 0, 0)',
    backgroundColor: 'inherit',
    marginBottom: '20px'
  },
  title: {
    backgroundColor: theme.palette.primary['200'],
    color: '#FFF',
    height: '40px',
    textAlign: 'center',
    paddingTop: '15px'
  },
  cardContainerRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '74%',
    justifyContent: 'space-around'
  },
  cardColumnSheet: {
    width: '40%',
    alignSelf: 'top',
    backgroundColor: 'inherit',
    boxShadow:
      '0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px 0px rgba(0, 0, 0, 0)'
  },

  cardContainerColumn: {
    display: 'flex',
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  buttonList: {
    fontSize: '0.675rem',
    textTransform: 'none',
    padding: '0'
  }
});

export class MyPRList extends React.Component {
  constructor(props) {
    super(props);
    let prOpen = props.prs.length !== 0 ? props.prs[0] : null;
    this.state = {
      prs: props.prs,
      prOpen: prOpen
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

  render() {
    const { classes, prs } = this.props;
    const { prOpen } = this.state;

    return (
      <div>
        <Typography variant="display1" paragraph>
          Performance Reviews
        </Typography>
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
              {prs.filter(pr => pr.employee.firstName === 'Lionel').map(pr => {
                return (
                  <Button
                    key={pr.id}
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
                      <ListItem className={classes.listItem}>
                        <ListItemText>
                          <div className={classes.divItemText}>
                            <Typography className={classes.typography}>
                              Beurteiler: {pr.supervisor}
                            </Typography>
                            {pr.deadline ? (
                              <Typography className={classes.typography}>
                                Datum: {moment(pr.deadline).format('DD.MM.YY')}
                              </Typography>
                            ) : (
                              ''
                            )}

                            <Typography className={classes.typography}>
                              {this.translateOccasion(pr.occasion)}
                            </Typography>
                            <Typography
                              className={
                                pr.status === 'DONE'
                                  ? classes.typographyDone
                                  : classes.typographyGreen
                              }
                            >
                              {this.translateStatus(pr.status)}
                            </Typography>
                          </div>
                        </ListItemText>
                      </ListItem>
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
                  <PrSheet />
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
          {prs.filter(pr => pr.employee.firstName === 'Lionel').map(pr => {
            return (
              <Link
                key={pr.id}
                to={`/prs/${pr.id}`}
                style={{ textDecoration: 'none' }}
              >
                <List className={classes.list}>
                  <ListItem className={classes.listItem}>
                    <ListItemText>
                      <div className={classes.divItemText}>
                        <Typography className={classes.typography}>
                          Beurteiler: {pr.supervisor}
                        </Typography>
                        <Typography className={classes.typography}>
                          Datum: {moment(pr.deadline).format('DD.MM.YY')}
                        </Typography>
                        <Typography className={classes.typography}>
                          {this.translateOccasion(pr.occasion)}
                        </Typography>
                        <Typography
                          className={
                            pr.status === 'DONE'
                              ? classes.typographyDone
                              : classes.typographyGreen
                          }
                        >
                          {this.translateStatus(pr.status)}
                        </Typography>
                      </div>
                    </ListItemText>
                  </ListItem>
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
    addSupervisor: actions.addSupervisor
  }
)(withLoading(props => props.fetchPrs())(StyledComponent));
