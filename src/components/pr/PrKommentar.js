import React from 'react';
import { withStyles } from 'material-ui/styles/index';
import List, { ListItem, ListItemText } from 'material-ui/List';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  nestedText: {
    paddingLeft: '30px',
    paddingRight: '30px'
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
});

class PrKommentar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  categoryText = category => {
    switch (category) {
      case 'problemanalyse':
        return {
          categoryDescription:
            'Problemverständnis und Analysestruktur | Relevanz und Korrektheit Analyseergebnisse | korrekte Ableitung von Implikationen',
          positionDescription:
            'Scoping Problem- und Analysekontext; Entwicklung Analysevorgehen, Durchführung von Analysen inkl. Anleitung von Teammitgliedern; Ableitung Implikationen'
        };
      case 'arbeitsweise':
        return {
          categoryDescription:
            'Pro-aktive Verantwortungsübernahme | pragmatische Herangehensweise | Qualitätsanspruch (Drive for Excellence)',
          positionDescription:
            'Übernahme von Verantwortung für eigene Endprodukte; Kalibrierung von Vorgehen und Aufwand gegen Lieferzusagen und Machbarkeit; Absicherung der Qualität der verantworteten Endprodukte'
        };

      case 'arbeitsergebnisse':
        return {
          categoryDescription:
            'Geeignete und fehlerfreie Ergebnisse | Einhaltung eigener Lieferzusagen | innovative Lösungen',
          positionDescription:
            'Scoping, Strukturierung und termingerechte Erstellung komplexerer Endprodukte in hoher Qualität inkl. Integration von Zulieferungen Dritter; Vorstellung Ergebnisse bei Kunden-Mitarbeitern/Projektleitern'
        };

      default:
        return;
    }
  };

  render() {
    const { category, classes } = this.props;

    return (
      <List component="div" disablePadding className={classes.nestedText}>
        <ListItem>
          <TextField
            id="multiline-flexible"
            label="Kommentar"
            multiline
            fullWidth
            rowsMax="4"
            value={this.state.category}
            onChange={this.handleChange('category')}
            InputProps={{
              disableUnderline: true,
              classes: {
                input: classes.bootstrapInput
              }
            }}
            InputLabelProps={{
              shrink: true
            }}
          />
        </ListItem>
        <ListItem />
        <ListItem>
          <ListItemText
            disabled
            secondary={this.categoryText(category).categoryDescription}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            disabled
            secondary={this.categoryText(category).positionDescription}
          />
        </ListItem>
      </List>
    );
  }
}

export default withStyles(styles)(PrKommentar);
