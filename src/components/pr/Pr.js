import React from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import withLoading from '../hoc/Loading';
import * as actions from '../../actions/index';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';

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

  containerVertical: {
    flex: 1,
    flexDirection: 'column',
    width: '100%'
  },

  greyBox: {
    backgroundColor: '#DDD',
    width: '100%'
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
  expansionPanel: {
    padding: 0
  },
  tabsColor: {
    color: theme.palette.contrastText
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
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
    this.state = {
      prById: props.prById,
      value: 0,
      expanded: null
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

  translateStatus = status => {
    switch (status) {
      case 'PREPARATION':
        return 'Vorbereitung';
      case 'EXECUTION':
        return ' In Durchführung';
      case 'POST_PROCESSING':
        return 'Nachbereitung';
      case 'DONE':
        return 'Fertig';
      default:
        return 'Vorbereitung';
    }
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handlePanel = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes, prById } = this.props;
    const { value } = this.state;
    const { expanded } = this.state;

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

        {value === 0 && (
          <div className={classes.root}>
            <ExpansionPanel
              expanded={expanded === 'panel1'}
              onChange={this.handlePanel('panel1')}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Vorbereitung{' '}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  1/3 erledigt
                </Typography>
              </ExpansionPanelSummary>
              <Divider />
              <ExpansionPanelDetails className={classes.expansionPanel}>
                <div className={classes.containerVertical}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Bogen ausfüllen" />
                    </ListItem>
                  </List>
                  <List className={classes.greyBox}>
                    <ListItem button disabled>
                      <ListItemText primary="Mitarbeiter" />
                    </ListItem>
                    <ListItem button disabled>
                      <ListItemText secondary="Terminierung" />
                    </ListItem>
                    <ListItem button disabled>
                      <ListItemText secondary="Bogen ausfüllen" />
                    </ListItem>
                  </List>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel
              expanded={expanded === 'panel2'}
              onChange={this.handlePanel('panel2')}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  In Durchführung
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  0/1 erledigt{' '}
                </Typography>
              </ExpansionPanelSummary>
              <Divider />
              <ExpansionPanelDetails>
                <Typography>Panel 2</Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === 'panel3'}
              onChange={this.handlePanel('panel3')}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  Nachbereitung
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  0/2 erledigt{' '}
                </Typography>
              </ExpansionPanelSummary>
              <Divider />

              <ExpansionPanelDetails>
                <Typography>Panel 3</Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        )}
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
