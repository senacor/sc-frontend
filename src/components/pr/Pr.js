import React from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import withLoading from '../hoc/Loading';
import * as actions from '../../actions/index';
import PrState from './PrState';

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

  typography: {
    color: '#FFF',
    marginLeft: '30px',
    marginTop: '20px',
    fontSize: '15px'
  },

  detailPanel: {
    width: '100%',
    backgroundColor: theme.palette.primary['400'],
    marginTop: '0px'
  },

  tabsColor: {
    color: theme.palette.contrastText
  }
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class Pr extends React.Component {
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
              <div>{prById.employee}</div>

              {prById.length === 0 ? (
                <div>nicht vorhanden</div>
              ) : (
                <div>{this.translateAnlass(prById.occasion)}</div>
              )}
            </Typography>
          </div>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            fullWidth
            indicatorColor="#FFA07A"
            className={classes.tabsColor}
          >
            <Tab label="STATUS" />
            <Tab label="ANSTELLUNG" />
            <Tab label="GEHALT" />
          </Tabs>
        </div>

        {value === 0 && <PrState expanded={this.state.expanded} />}
        {value === 1 && (
          <TabContainer>
            Hier steht das Anstellungsverhältnis des Mitarbeiters
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            Hier steht die Gehaltshistorie des Mitarbeiters
          </TabContainer>
        )}
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
