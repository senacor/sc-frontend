import React from 'react';
import { withStyles } from 'material-ui/styles/index';
import List, { ListItem, ListItemText } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import * as actions from '../../actions';

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
    this.state = {
      prById: this.props.prById,
      category: this.props.category
    };
  }

  handleChange = (prById, category) => event => {
    this.props.addComment(prById.id, category, event.target.value);
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
    const { prById, category, classes } = this.props;

    return (
      <List component="div" disablePadding className={classes.nestedText}>
        <ListItem>
          {prById[category] ? (
            <TextField
              id="multiline-flexible"
              label="Kommentar"
              multiline
              fullWidth
              rowsMax="4"
              value={prById[category].comment}
              onChange={this.handleChange(prById, category)}
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
          ) : (
            <TextField
              id="multiline-flexible"
              label="Kommentar"
              multiline
              fullWidth
              rowsMax="4"
              value=""
              onChange={this.handleChange(prById, category)}
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
          )}
        </ListItem>
        <ListItem />
        <ListItem>
          <ListItemText
            secondary={this.categoryText(category).categoryDescription}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            secondary={this.categoryText(category).positionDescription}
          />
        </ListItem>
      </List>
    );
  }
}

export const StyledComponent = withStyles(styles)(PrKommentar);
export default connect(
  state => ({
    prs: state.prs.prsList
  }),
  {
    addComment: actions.addComment
  }
)(StyledComponent);
