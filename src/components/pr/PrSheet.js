import React from 'react';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles/index';

const styles = () => ({
  containerVertical: {
    flex: 1,
    flexDirection: 'column',
    width: '100%'
  },
  nested: {
    paddingLeft: '30px'
  },
  rightAlignText: {
    textAlign: 'right'
  }
});

class PrSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prById: this.props.prById
    };
  }

  render() {
    const { prById, classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.containerVertical}>
          <List>
            <ListItem>
              <ListItemText primary="Leistungen im Projekt" />
            </ListItem>
            <List disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText secondary="Problemanalyse und -lösung" />
                <ListItemText
                  className={classes.rightAlignText}
                  primary="4 / 5"
                />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText secondary="Arbeitsergebnisse" />
                <ListItemText
                  className={classes.rightAlignText}
                  primary="3 / 5"
                />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText secondary="Arbeitsweise" />
                <ListItemText
                  className={classes.rightAlignText}
                  primary="1 / 5"
                />
              </ListItem>
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
                <ListItemText secondary="Effektived Arbeiten im Team und Teamführung" />
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
