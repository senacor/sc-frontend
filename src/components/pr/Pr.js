import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import withLoading from '../hoc/Loading';
import * as actions from '../../actions/index';
import PrState from './PrState';
import PrSalary from './PrSalary';
import PrSheet from './PrSheet';
import PrEmployment from './PrEmployment';
import Hidden from '@material-ui/core/Hidden';
import Card from '@material-ui/core/Card';
import moment from 'moment';
import { getPrDetail } from '../../reducers/selector';
import { translateContent } from '../translate/Translate';

const styles = theme => ({
  avatar: {
    marginLeft: '30px',
    marginTop: '25px',
    height: '70px',
    width: '70px'
  },
  container: {
    display: 'flex'
  },
  typographyTabs: {
    color: '#FFF',
    marginTop: '20px',
    fontSize: '15px',
    width: '33.3%',
    marginLeft: '15%'
  },
  typography: {
    color: '#FFF',
    marginLeft: '30px',
    textAlign: 'left',
    marginTop: '10px',
    marginBottom: '5px',
    fontSize: '15px'
  },
  tabsColor: {
    color: theme.palette.contrastText
  },
  detailPanel: {
    width: '100%',
    backgroundColor: theme.palette.primary['400'],
    marginTop: '0px'
  },

  label: {
    width: '37%'
  },

  cardContainerColumn: {
    display: 'flex',
    paddingLeft: '1.5%',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  cardContainerRow: {
    display: 'flex',
    paddingTop: '1.5%',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around'
  },

  cardColumnSheet: {
    width: '50%',
    alignSelf: 'center',
    height: '100%',
    marginLeft: '1.5%',
    marginRight: '1.5%'
  },

  cardColumn: {
    width: '50%',
    alignSelf: 'top',
    height: '100%',
    marginLeft: '1.5%',
    marginRight: '1.5%',
    boxShadow:
      '0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px 0px rgba(0, 0, 0, 0)',
    backgroundColor: 'inherit'
  },
  cardColumnStatus: {
    width: '30%',
    alignSelf: 'top',
    height: '100%',
    marginLeft: '1.5%',
    marginRight: '1.5%',
    boxShadow:
      '0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px 0px rgba(0, 0, 0, 0)',
    backgroundColor: 'inherit'
  },
  title: {
    backgroundColor: theme.palette.primary['300'],
    color: '#FFF',
    height: '40px',
    textAlign: 'center',
    paddingTop: '15px'
  },
  name: {
    fontSize: '18px',
    lineHeight: '2em'
  },
  deadline: {
    [theme.breakpoints.up('sm')]: {
      lineHeight: '2.4em'
    }
  }
});

export class Pr extends React.Component {
  constructor(props) {
    super(props);

    let shouldExpand = this.returnExpandState(
      props.prById ? props.prById.status : 'PREPARATION'
    );

    this.state = {
      prById: props.prById,
      value: 0,
      expanded: shouldExpand
    };
  }

  returnExpandState = status => {
    switch (status) {
      case 'PREPARATION':
        return 'panel1';
      case 'EXECUTION':
        return 'panel2';
      case 'POST_PROCESSING':
        return 'panel3';
      default:
        return false;
    }
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { prById, classes } = this.props;
    const { value } = this.state;

    if (!prById) {
      return null;
    }

    return (
      <div>
        <div className={classes.detailPanel}>
          <div className={classes.container}>
            <Avatar
              alt="Employee"
              className={classes.avatar}
              src="/supervisor.jpg"
            />
            <Typography className={classes.typography} component="div">
              {prById.length === 0 ? (
                <div>nicht vorhanden</div>
              ) : (
                <div>
                  <div className={classes.name}>
                    {`${prById.employee.firstName.toUpperCase()} ${prById.employee.lastName.toUpperCase()}`}
                  </div>
                  <div>{`PR ${translateContent(prById.occasion)}  `}</div>
                  <div>Junior Developer</div>
                  <div className={classes.deadline}>
                    {`Deadline: ${moment(prById.deadline).format('DD.MM.YY')}`}
                  </div>
                </div>
              )}
            </Typography>
          </div>
          <Hidden smUp>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="secondary"
              className={classes.tabsColor}
              scrollable
              scrollButtons="auto"
            >
              <Tab className={classes.label} label="SHEET" />
              <Tab className={classes.label} label="STATUS" />
              <Tab className={classes.label} label="ANSTELLUNG" />
              <Tab className={classes.label} label="GEHALT" />
            </Tabs>
          </Hidden>
        </div>
        <Hidden smUp>
          {value === 0 && <PrSheet prById={this.state.prById} />}
          {value === 1 && <PrState expanded={this.state.expanded} />}
          {value === 2 && <PrEmployment prById={this.state.prById} />}
          {value === 3 && <PrSalary prById={this.state.prById} />}
        </Hidden>
        <Hidden smDown>
          <div className={classes.cardContainerRow}>
            <Card className={classes.cardColumnSheet}>
              <Typography variant="body2" className={classes.title}>
                SHEET
              </Typography>
              <PrSheet prById={this.state.prById} />
            </Card>

            <Card className={classes.cardColumnStatus}>
              <Typography variant="body2" className={classes.title}>
                STATUS
              </Typography>
              <PrState expanded={this.state.expanded} />
            </Card>

            <Card className={classes.cardColumn}>
              <Typography variant="body2" className={classes.title}>
                GEHALT UND ANSTELLUNG
              </Typography>

              <PrSalary prById={this.state.prById} />
              <PrEmployment prById={this.state.prById} />
            </Card>
          </div>
        </Hidden>
      </div>
    );
  }
}
export const StyledComponent = withStyles(styles)(Pr);
export default connect(
  state => ({
    prById: getPrDetail()(state),
    isLoading: state.isLoading
  }),
  {
    fetchPrById: actions.fetchPrById
  }
)(
  withLoading(props => props.fetchPrById(props.match.params.id))(
    StyledComponent
  )
);
