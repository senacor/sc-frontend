import React from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import withLoading from '../hoc/Loading';
import * as actions from '../../actions/index';
import PrState from './PrState';
import PrSalary from './PrSalary';
import PrSheet from './PrSheet';
import PrEmployment from './PrEmployment';
import Hidden from 'material-ui/Hidden';

import Card from 'material-ui/Card';

const styles = theme => ({
  avatar: {
    marginLeft: '30px',
    marginTop: '15px',
    marginBottom: '15px',
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
    marginTop: '30px',
    fontSize: '15px'
  },
  tabsColor: {
    color: theme.palette.contrastText
  },
  detailPanel: {
    width: '100%',
    backgroundColor: theme.palette.primary['100'],
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
    height: '500px',
    width: '100%',
    justifyContent: 'space-around'
  },

  cardColumnSheet: {
    width: '65%',
    alignSelf: 'center',
    height: '100%',
    marginLeft: '1.5%',
    marginRight: '1.5%'
  },

  cardColumn: {
    width: '35%',
    alignSelf: 'center',
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
  }
});

export class Pr extends React.Component {
  constructor(props) {
    super(props);
    let shouldExpand = this.returnExpandState(props.prById.status);

    this.state = {
      prById: props.prById,
      value: 0,
      expanded: shouldExpand
    };
  }

  translateAnlass = occasion => {
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
              <div>PERFORMANCE REVIEW</div>
              {prById.length === 0 ? (
                <div>nicht vorhanden</div>
              ) : (
                <div>{this.translateAnlass(prById.occasion)}</div>
              )}
            </Typography>
          </div>
          <Hidden smUp>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="#FFA07A"
              className={classes.tabsColor}
              scrollable
              scrollButtons="auto"
            >
              <Tab className={classes.label} label="STATUS" />
              <Tab className={classes.label} label="ANSTELLUNG" />
              <Tab className={classes.label} label="GEHALT" />
              <Tab className={classes.label} label="SHEET" />
            </Tabs>
          </Hidden>
        </div>
        <Hidden smUp>
          {value === 0 && <PrState expanded={this.state.expanded} />}
          {value === 1 && <PrEmployment />}
          {value === 2 && <PrSalary prById={this.state.prById} />}
          {value === 3 && <PrSheet />}
        </Hidden>
        <Hidden smDown>
          <div className={classes.cardContainerRow}>
            <Card className={classes.cardColumnSheet}>
              <Typography variant="body2" className={classes.title}>
                SHEET
              </Typography>
              <PrSheet />
            </Card>

            <Card className={classes.cardColumn}>
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
    prById: state.prById.prDetail,
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
