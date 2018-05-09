import React from 'react';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Collapse from 'material-ui/transitions/Collapse';
import PrKommentar from './PrKommentar';
import { withStyles } from 'material-ui/styles/index';

const styles = () => ({
  containerVertical: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    boxShadow:
      '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
  },
  containerListItem: {
    display: 'flex'
  },

  nested: {
    paddingLeft: '30px'
  },

  nestedListItem: {
    paddingLeft: '30px',
    width: '80%'
  },

  nestedNumber: {
    width: '20%'
  },

  nestedText: {
    paddingLeft: '30px',
    paddingRight: '30px'
  },
  rightAlignText: {
    textAlign: 'right'
  }
});

const gradingValues = [
  {
    value: '1',
    label: '1'
  },
  {
    value: '2',
    label: '2'
  },
  {
    value: '3',
    label: '3'
  },
  {
    value: '4',
    label: '4'
  },
  {
    value: '5',
    label: '5'
  }
];

class PrSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prById: this.props.prById,
      arbeitsweise: '1',
      arbeitsergebnisse: '1',
      problemanalyse: '1',
      openProblemanalyse: false,
      openArbeitsergebnisse: false,
      openArbeitsweise: false
    };
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClick = value => {
    switch (value) {
      case 'openArbeitsweise':
        this.setState({
          openArbeitsweise: !this.state.openArbeitsweise,
          openProblemanalyse: false,
          openArbeitsergebnisse: false
        });
        break;
      case 'openArbeitsergebnisse':
        this.setState({
          openArbeitsergebnisse: !this.state.openArbeitsergebnisse,
          openProblemanalyse: false,
          openArbeitsweise: false
        });
        break;
      case 'openProblemanalyse':
        this.setState({
          openProblemanalyse: !this.state.openProblemanalyse,
          openArbeitsergebnisse: false,
          openArbeitsweise: false
        });
        break;
      default:
        return;
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.containerVertical}>
        <List>
          <ListItem>
            <ListItemText primary="Leistungen im Projekt" />
          </ListItem>
          <List disablePadding>
            <div className={classes.containerListItem}>
              <ListItem
                button
                className={classes.nestedListItem}
                onClick={() => this.handleClick('openProblemanalyse')}
              >
                <ListItemText secondary="Problemanalyse und -lösung" />
              </ListItem>
              <ListItem className={classes.nestedNumber}>
                <TextField
                  select
                  value={this.state.problemanalyse}
                  onChange={this.handleChange('problemanalyse')}
                >
                  {gradingValues.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </ListItem>
            </div>
            <Collapse
              in={this.state.openProblemanalyse}
              timeout="auto"
              unmountOnExit
            >
              <PrKommentar category="problemanalyse" />
            </Collapse>
            <div className={classes.containerListItem}>
              <ListItem
                button
                className={classes.nestedListItem}
                onClick={() => this.handleClick('openArbeitsergebnisse')}
              >
                <ListItemText secondary="Arbeitsergebnisse" />
              </ListItem>
              <ListItem className={classes.nestedNumber}>
                <TextField
                  select
                  value={this.state.arbeitsergebnisse}
                  onChange={this.handleChange('arbeitsergebnisse')}
                >
                  {gradingValues.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </ListItem>
            </div>

            <Collapse
              in={this.state.openArbeitsergebnisse}
              timeout="auto"
              unmountOnExit
            >
              <PrKommentar category="arbeitsergebnisse" />
            </Collapse>

            <div className={classes.containerListItem}>
              <ListItem
                button
                className={classes.nestedListItem}
                onClick={() => this.handleClick('openArbeitsweise')}
              >
                <ListItemText secondary="Arbeitsweise" />
              </ListItem>
              <ListItem className={classes.nestedNumber}>
                <TextField
                  select
                  value={this.state.arbeitsweise}
                  onChange={this.handleChange('arbeitsweise')}
                >
                  {gradingValues.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </ListItem>
            </div>
            <Collapse
              in={this.state.openArbeitsweise}
              timeout="auto"
              unmountOnExit
            >
              <PrKommentar category="arbeitsweise" />
            </Collapse>
          </List>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="Wirkung beim Kunden" />
          </ListItem>
          <List disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText secondary="Kundeninteraktion und -veränderung" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText secondary="Kundenbindung und Mandatsgenerierung" />
            </ListItem>
          </List>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="Wirkung im Team" />
          </ListItem>
          <List disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText secondary="Effektives Arbeiten im Team und Teamführung" />
            </ListItem>
            <ListItem button className={classes.nested}>
              <ListItemText secondary="Coaching, Leadership und Personalführung" />
            </ListItem>
          </List>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="Wirkung im Unternehmen" />
          </ListItem>
          <List disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText secondary="Beitrag zur Unternehmensentwicklung" />
            </ListItem>
          </List>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="Gesamtschätzung und Entwicklungsbedarfe" />
          </ListItem>
          <List disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemText secondary="Freitextfeld" />
            </ListItem>
          </List>
        </List>
        <Divider />
      </div>
    );
  }
}

export default withStyles(styles)(PrSheet);
