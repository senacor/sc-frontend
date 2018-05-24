import React from 'react';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';

import { withStyles } from '@material-ui/core/styles/index';

const styles = theme => ({
  containerVertical: {
    flex: 1,
    flexDirection: 'column',
    width: '100%'
  },

  greyBox: {
    backgroundColor: theme.palette.primary['50'],
    width: '100%'
  },
  typography: {
    color: '#FFF',
    marginLeft: '30px',
    marginTop: '20px',
    fontSize: '15px'
  },

  expansionPanel: {
    padding: 0
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '40%',
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

class PrState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: this.props.expanded
    };
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel
          expanded={expanded === 'panel1'}
          onChange={this.handleChange('panel1')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Vorbereitung</Typography>
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
          onChange={this.handleChange('panel2')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>In Durchführung</Typography>
            <Typography className={classes.secondaryHeading}>
              0/1 erledigt
            </Typography>
          </ExpansionPanelSummary>
          <Divider />
          <ExpansionPanelDetails>
            <Typography>Panel 2</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === 'panel3'}
          onChange={this.handleChange('panel3')}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Nachbereitung</Typography>
            <Typography className={classes.secondaryHeading}>
              0/2 erledigt
            </Typography>
          </ExpansionPanelSummary>
          <Divider />

          <ExpansionPanelDetails>
            <Typography>Panel 3</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(PrState);