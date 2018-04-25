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

import Card, { CardHeader } from 'material-ui/Card';

const styles = theme => ({
  avatar: {
    marginLeft: '20px',
    marginTop: '20px',
    height: '50px',
    width: '50px'
  },
  container: {
    display: 'flex'
  },
  card: {
    width: '27%'
  },
  typographyTabs: {
    color: '#FFF',
    marginTop: '20px',
    fontSize: '15px',
    width: '33.3%',
    marginLeft: '15%'
  },

  typography: {
    color: theme.palette.primary['800'],
    marginLeft: '30px',
    marginTop: '20px',
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
    width: '33.3%'
  },

  cardContainerRow: {
    display: 'flex',
    paddingTop: '1.5%',
    justifyContent: 'space-around'
  },
  cardContainerColumn: {
    display: 'flex',
    paddingTop: '1.5%',
    flexDirection: 'column',
    height: '40%'
  },

  cardColumn: {
    width: '93.7%',
    alignSelf: 'center'
  },

  cardHeader: {
    backgroundColor: theme.palette.primary['100']
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
    const { classes, prById } = this.props;
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
              <div>Performance Review</div>
              <div> {prById.status}</div>

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
            <Card className={classes.card}>
              <CardHeader title="STATUS" className={classes.cardHeader} />
              <PrState expanded={this.state.expanded} />
            </Card>
            <Card className={classes.card}>
              <CardHeader title="ANSTELLUNG" className={classes.cardHeader} />
              <PrEmployment />
            </Card>
            <Card className={classes.card}>
              <CardHeader title="GEHALT" className={classes.cardHeader} />
              <PrSalary prById={this.state.prById} />
            </Card>
          </div>

          <div className={classes.cardContainerColumn}>
            <Card className={classes.cardColumn}>
              <CardHeader title="SHEET" className={classes.cardHeader} />
              <PrSheet />
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
