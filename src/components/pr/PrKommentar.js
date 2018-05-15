import React from 'react';
import { withStyles } from 'material-ui/styles/index';
import List, { ListItem, ListItemText } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import Collapse from 'material-ui/transitions/Collapse';
import MenuItem from 'material-ui/Menu/MenuItem';
import Select from 'material-ui/Select';
import FormControl from 'material-ui/Form/FormControl';
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

  handleChange = (prById, category) => event => {
    this.setState({ [event.target.name]: event.target.value });
    let ratings = prById.prRatingSet.find(
      rating => rating.prRatingDescription === category
    );
    event.target.name === 'rating'
      ? this.props.addRating(
          prById,
          category,
          this.state.comment,
          event.target.value,
          ratings.id
        )
      : this.props.addRating(
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

  categoryText = category => {
    switch (category) {
      case 'PROBLEM_ANALYSIS':
        return {
          categoryDescription:
            'Problemverständnis und Analysestruktur | Relevanz und Korrektheit Analyseergebnisse | korrekte Ableitung von Implikationen',
          positionDescription:
            'Scoping Problem- und Analysekontext; Entwicklung Analysevorgehen, Durchführung von Analysen inkl. Anleitung von Teammitgliedern; Ableitung Implikationen'
        };
      case 'WORKING_MANNER':
        return {
          categoryDescription:
            'Pro-aktive Verantwortungsübernahme | pragmatische Herangehensweise | Qualitätsanspruch (Drive for Excellence)',
          positionDescription:
            'Übernahme von Verantwortung für eigene Endprodukte; Kalibrierung von Vorgehen und Aufwand gegen Lieferzusagen und Machbarkeit; Absicherung der Qualität der verantworteten Endprodukte'
        };

      case 'WORK_RESULTS':
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
                value={this.state.rating}
                onChange={this.handleChange(prById, category)}
                displayEmpty
                name="rating"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
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
                label="comment"
                multiline
                fullWidth
                rowsMax="4"
                value={this.state.comment ? this.state.comment : ''}
                onChange={this.handleChange(prById, category)}
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
