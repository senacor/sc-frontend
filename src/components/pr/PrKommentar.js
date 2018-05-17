import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Collapse from '@material-ui/core/Collapse';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import * as actions from '../../actions';
import ReactSwipe from 'react-swipe';

const styles = theme => ({
  nestedText: {
    paddingLeft: '30px',
    paddingRight: '50px'
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
  },
  containerListItem: {
    display: 'flex'
  },
  nestedListItem: {
    paddingLeft: '30px',
    width: '80%'
  },

  nestedNumber: {
    width: '20%'
  },
  swipe: {
    overflow: 'hidden',
    visibility: 'hidden',
    position: 'relative',
    width: '300px'
  },
  swipeWrapInside: {
    float: 'left',
    position: 'relative'
  }
});

class PrKommentar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: this.props.prById.prRatingSet.find(
        rating => rating.prRatingDescription === this.props.category
      ).rating,
      comment: this.props.prById.prRatingSet.find(
        rating => rating.prRatingDescription === this.props.category
      ).comment,
      prById: this.props.prById,
      category: this.props.category,
      PROBLEM_ANALYSIS: false,
      WORK_RESULTS: false,
      WORKING_MANNER: false
    };
  }

  handleChangeRating = (prById, category) => event => {
    this.setState({ [event.target.name]: event.target.value });
    let ratings = prById.prRatingSet.find(
      rating => rating.prRatingDescription === category
    );
    this.props.addRating(
      prById,
      category,
      this.state.comment,
      event.target.value,
      ratings.id
    );
  };

  handleChangeComment = (prById, category) => event => {
    this.setState({ [event.target.name]: event.target.value });
    let ratings = prById.prRatingSet.find(
      rating => rating.prRatingDescription === category
    );
    this.props.addRating(
      prById,
      category,
      event.target.value,
      this.state.rating,
      ratings.id
    );
  };
  translateRatingDescription = ratingDescription => {
    switch (ratingDescription) {
      case 'PROBLEM_ANALYSIS':
        return 'Problemanalyse und -lösung';
      case 'WORK_RESULTS':
        return 'Arbeitsergebnisse';
      case 'WORKING_MANNER':
        return 'Arbeitsweise';
      default:
        return 'Arbeitsweise';
    }
  };

  handleClick = value => {
    switch (value) {
      case 'WORKING_MANNER':
        this.setState({
          WORKING_MANNER: !this.state.WORKING_MANNER,
          PROBLEM_ANALYSIS: false,
          WORK_RESULTS: false
        });
        break;
      case 'WORK_RESULTS':
        this.setState({
          WORK_RESULTS: !this.state.WORK_RESULTS,
          PROBLEM_ANALYSIS: false,
          WORKING_MANNER: false
        });
        break;
      case 'PROBLEM_ANALYSIS':
        this.setState({
          PROBLEM_ANALYSIS: !this.state.PROBLEM_ANALYSIS,
          WORK_RESULTS: false,
          WORKING_MANNER: false
        });
        break;
      default:
        return;
    }
  };

  positionText = position => {
    switch (position) {
      case 'PROBLEM_ANALYSIS':
        return 'Problemverständnis und Analysestruktur | Relevanz und Korrektheit Analyseergebnisse | korrekte Ableitung von Implikationen';

      case 'WORK_RESULTS':
        return 'Geeignete und fehlerfreie Ergebnisse | Einhaltung eigener Lieferzusagen | innovative Lösungen';

      case 'WORKING_MANNER':
        return 'Pro-aktive Verantwortungsübernahme | pragmatische Herangehensweise | Qualitätsanspruch (Drive for Excellence)';

      default:
        return;
    }
  };

  categoryText = category => {
    switch (category) {
      case 'PROBLEM_ANALYSIS':
        return {
          junior:
            ' Junior: Einarbeitung in definierte, abgegrenzte Aufgabenstellung; Durchführung strukturierter Analysen; Entwicklung von Hypothesen zu Implikationen',
          senior:
            'Senior: Scoping Problem- und Analysekontext; Entwicklung Analysevorgehen, Durchführung von Analysen inkl. Anleitung von Teammitgliedern; Ableitung Implikationen',

          expert:
            'Expert: Scoping Problem- und Analysekontext; Entwicklung Analysevorgehen, Durchführung von Analysen inkl. Anleitung von Teammitgliedern; Ableitung Implikationen',
          lead:
            'Lead: Scoping Problem- und Analysekontext; Entwicklung Analysevorgehen, Durchführung von Analysen inkl. Anleitung von Teammitgliedern; Ableitung Implikationen'
        };
      case 'WORK_RESULTS':
        return {
          junior:
            'Junior: Termingerechte Erstellung qualitativ hochwertiger Beiträge zu Endprodukten',

          senior:
            'Senior: Scoping, Strukturierung und termingerechte Erstellung komplexerer Endprodukte in hoher Qualität inkl. Integration von Zulieferungen Dritter; Vorstellung Ergebnisse bei Kunden-Mitarbeitern/Projektleitern',

          expert:
            'Expert: Scoping und Strukturierung erforderlicher Endprodukte zur Absicherung des Projekterfolgs; Absicherung der termingerechten Bereitstellung in hoher Qualität; Vorstellung Ergebnisse bei Kunden-Mitarbeitern/Projektleitern',

          lead:
            'Lead: Scoping und Strukturierung erforderlicher Endprodukte zur Absicherung des Projekterfolgs; Absicherung der termingerechten Bereitstellung in hoher Qualität; Vorstellung Ergebnisse bei Entscheidern'
        };

      case 'WORKING_MANNER':
        return {
          junior:
            'Junior: Eigenständige Bearbeitung klar umrissener Aufgabenstellungen; Pragmatismus; hoher Anspruch an die Qualität der eigenen Arbeit',

          senior:
            'Senior: Übernahme von Verantwortung für eigene Endprodukte; Kalibrierung von Vorgehen und Aufwand gegen Lieferzusagen und Machbarkeit; Absicherung der Qualität der verantworteten Endprodukte',

          expert:
            'Expert: Übernahme von Verantwortung für Teilprojekte; Kalibrierung von Vorgehen und Aufwand gegen Lieferzusagen und Machbarkeit; Absicherung der Gesamtqualität aller Endprodukte',

          lead:
            'Lead: Übernahme von Verantwortung für größere Projekte und Teilprojekte; Priorisierung und Strukturierung gegen Projektziele; Absicherung der Gesamtqualität aller Endprodukte'
        };

      default:
        return;
    }
  };

  render() {
    const { prById, category, classes } = this.props;
    return (
      <div>
        <div className={classes.containerListItem}>
          <ListItem
            button
            className={classes.nestedListItem}
            onClick={() => this.handleClick(category)}
          >
            <ListItemText
              secondary={this.translateRatingDescription(category)}
            />
          </ListItem>
          <ListItem className={classes.nestedNumber}>
            <FormControl>
              <Select
                value={this.state.rating ? this.state.rating : 3}
                onChange={this.handleChangeRating(prById, category)}
                displayEmpty
                name="rating"
              >
                <MenuItem>value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
        </div>
        <Collapse in={this.state[category]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className={classes.nestedText}>
            <ListItem>
              <TextField
                id="multiline-flexible"
                label="Kommentar"
                multiline
                fullWidth
                rowsMax="4"
                value={this.state.comment ? this.state.comment : ''}
                onChange={this.handleChangeComment(prById, category)}
                InputProps={{
                  disableUnderline: true,
                  name: 'comment',
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
              <ReactSwipe
                className={classes.swipe}
                swipeOptions={{ continuous: false }}
              >
                <div className={classes.swipeWrapInside}>
                  <ListItemText
                    className={classes.categoryText}
                    secondary={this.categoryText(category).junior}
                  />
                </div>
                <div className={classes.swipeWrapInside}>
                  <ListItemText
                    className={classes.categoryText}
                    secondary={this.categoryText(category).senior}
                  />
                </div>
                <div className={classes.swipeWrapInside}>
                  <ListItemText
                    className={classes.categoryText}
                    secondary={this.categoryText(category).expert}
                  />
                </div>
                <div className={classes.swipeWrapInside}>
                  <ListItemText
                    className={classes.categoryText}
                    secondary={this.categoryText(category).lead}
                  />
                </div>
              </ReactSwipe>
            </ListItem>
            <ListItem>
              <ListItemText secondary={this.positionText(category)} />
            </ListItem>
          </List>
        </Collapse>
      </div>
    );
  }
}

export const StyledComponent = withStyles(styles)(PrKommentar);
export default connect(
  state => ({
    prRating: state.prRatings.prRating
  }),
  {
    addRating: actions.addRating
  }
)(StyledComponent);
