import React from 'react';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import classNames from 'classnames';
import Collapse from 'material-ui/transitions/Collapse';
import Icon from 'material-ui/Icon';
import { withStyles } from 'material-ui/styles/index';

const styles = theme => ({
  containerVertical: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    boxShadow:
      '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
  },
  nested: {
    paddingLeft: '30px'
  },
  nestedText: {
    paddingLeft: '30px',
    paddingRight: '30px'
  },
  rightAlignText: {
    textAlign: 'right'
  },
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3
    }
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
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
      <div className={classes.root}>
        <div className={classes.containerVertical}>
          <List>
            <ListItem>
              <ListItemText primary="Leistungen im Projekt" />
            </ListItem>
            <List disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={() => this.handleClick('openProblemanalyse')}
              >
                <ListItemText secondary="Problemanalyse und -lösung" />
                {this.state.openProblemanalyse ? (
                  <Icon>expand_less</Icon>
                ) : (
                  <Icon>expand_more</Icon>
                )}

                <TextField
                  select
                  className={classNames(classes.margin, classes.textField)}
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
              <Collapse
                in={this.state.openProblemanalyse}
                timeout="auto"
                unmountOnExit
              >
                <List
                  component="div"
                  disablePadding
                  className={classes.nestedText}
                >
                  <ListItem>
                    <TextField
                      id="multiline-flexible"
                      label="Kommentar"
                      multiline
                      fullWidth
                      rowsMax="4"
                      value={this.state.multiline}
                      onChange={this.handleChange('multiline')}
                      InputProps={{
                        disableUnderline: true,
                        classes: {
                          root: classes.bootstrapRoot,
                          input: classes.bootstrapInput
                        }
                      }}
                      InputLabelProps={{
                        shrink: true,
                        className: classes.bootstrapFormLabel
                      }}
                    />
                  </ListItem>
                  <ListItem />
                  <ListItem button>
                    <ListItemText
                      disabled
                      secondary="Beschreibung: Problemanalyse !"
                    />
                  </ListItem>
                </List>
                <Divider />
              </Collapse>

              <ListItem
                button
                className={classes.nested}
                onClick={() => this.handleClick('openArbeitsergebnisse')}
              >
                <ListItemText secondary="Arbeitsergebnisse" />
                {this.state.openArbeitsergebnisse ? (
                  <Icon>expand_less</Icon>
                ) : (
                  <Icon>expand_more</Icon>
                )}
                <TextField
                  select
                  className={classNames(classes.margin, classes.textField)}
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
              <Collapse
                in={this.state.openArbeitsergebnisse}
                timeout="auto"
                unmountOnExit
              >
                <List
                  component="div"
                  disablePadding
                  className={classes.nestedText}
                >
                  <ListItem>
                    <TextField
                      id="multiline-flexible"
                      label="Kommentar"
                      multiline
                      fullWidth
                      rowsMax="4"
                      value={this.state.multiline}
                      onChange={this.handleChange('multiline')}
                      InputProps={{
                        disableUnderline: true,
                        classes: {
                          root: classes.bootstrapRoot,
                          input: classes.bootstrapInput
                        }
                      }}
                      InputLabelProps={{
                        shrink: true,
                        className: classes.bootstrapFormLabel
                      }}
                    />
                  </ListItem>
                  <ListItem />
                  <ListItem button>
                    <ListItemText
                      disabled
                      secondary="Beschreibung:  Arbeitsergebnisse
 !"
                    />
                  </ListItem>
                </List>
                <Divider />
              </Collapse>
              <ListItem
                button
                className={classes.nested}
                onClick={() => this.handleClick('openArbeitsweise')}
              >
                <ListItemText secondary="Arbeitsweise" />
                {this.state.openArbeitsweise ? (
                  <Icon>expand_less</Icon>
                ) : (
                  <Icon>expand_more</Icon>
                )}
                <TextField
                  select
                  className={classNames(classes.margin, classes.textField)}
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

              <Collapse
                in={this.state.openArbeitsweise}
                timeout="auto"
                unmountOnExit
              >
                <List
                  component="div"
                  disablePadding
                  className={classes.nestedText}
                >
                  <ListItem>
                    <TextField
                      id="multiline-flexible"
                      label="Kommentar"
                      multiline
                      fullWidth
                      rowsMax="4"
                      value={this.state.multiline}
                      onChange={this.handleChange('multiline')}
                      InputProps={{
                        disableUnderline: true,
                        classes: {
                          root: classes.bootstrapRoot,
                          input: classes.bootstrapInput
                        }
                      }}
                      InputLabelProps={{
                        shrink: true,
                        className: classes.bootstrapFormLabel
                      }}
                    />
                  </ListItem>
                  <ListItem />
                  <ListItem button>
                    <ListItemText
                      disabled
                      secondary="Beschreibung: Arbeitsweise !"
                    />
                  </ListItem>
                </List>
                <Divider />
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
      </div>
    );
  }
}

export default withStyles(styles)(PrSheet);
