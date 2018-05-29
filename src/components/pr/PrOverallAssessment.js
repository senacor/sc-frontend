import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import * as actions from '../../actions';
import { debounce } from '../../helper/debounce';

const styles = theme => ({
  nestedText: {
    paddingLeft: '20px',
    paddingRight: '27px'
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
  description: {
    paddingLeft: '0',
    paddingRight: '30px'
  },
  nestedListItem: {
    paddingLeft: '20px',
    width: '80%'
  },
  nestedListItemFTF: {
    maxWidth: '80%'
  },
  icon: {
    color: theme.palette.primary['400']
  },
  iconWhite: {
    color: theme.palette.common.white
  },
  nestedNumber: {
    minWidth: '44%',
    justifyContent: 'flex-end'
  },
  nestedNumberTargetRole: {
    width: '95%'
  },
  formControl: {
    paddingRight: '0px',
    minWidth: '95%'
  }
});

class PrOverallAssessment extends React.Component {
  constructor(props) {
    super(props);
    const categoryFulfillment = 'FULFILLMENT_OF_REQUIREMENT';
    const categoryTargetRole = 'TARGET_ROLE';

    this.state = {
      ratingFulfillment: this.props.prById.prRatingSet.find(
        prRating => prRating.prRatingDescription === categoryFulfillment
      ).rating,
      ratingTargetRole: this.props.prById.prRatingSet.find(
        prRating => prRating.prRatingDescription === categoryTargetRole
      ).rating,
      comment: this.props.prById.prRatingSet.find(
        prRating => prRating.prRatingDescription === categoryFulfillment
      ).comment,
      prById: this.props.prById,
      categoryFulfillment: categoryFulfillment,
      categoryTargetRole: categoryTargetRole,
      is_expanded: false
    };
  }

  handleChangeRating = prById => event => {
    this.setState({ [event.target.name]: event.target.value });
    let category = (event.target.name = 'ratingFulfillment'
      ? this.state.categoryFulfillment
      : this.state.categoryTargetRole);
    let prRating = prById.prRatingSet.find(
      prRating => prRating.prRatingDescription === category
    );
    this.props.addRating(
      prById,
      category,
      this.state.comment,
      event.target.value,
      prRating.id
    );
  };

  handleChangeComment = prById => event => {
    this.setState({ [event.target.name]: event.target.value });
    let prRating = prById.prRatingSet.find(
      prRating =>
        prRating.prRatingDescription === this.state.categoryFulfillment
    );

    this.sendComment(
      prById,
      this.state.categoryFulfillment,
      event.target.value,
      this.state.ratingFulfillment,
      prRating.id
    );
  };

  sendComment = debounce(this.props.addRating, 500);

  translateRatingDescription = ratingDescription => {
    switch (ratingDescription) {
      case 'FULFILLMENT_OF_REQUIREMENT':
        return 'Gesamteinschätzung; Erfüllung der Anforderungen für aktuelle Stufe';
      case 'TARGET_ROLE':
        return 'Zielrolle (ab Senior Level ausfüllen)';
      default:
        return 'default';
    }
  };

  categoryText = {
    text:
      'In welchem Umfang erfüllt die Mitarbeiterin/der Mitarbeiter die Anforderungen an seine aktuelle Laufbahnstufe vor dem Hintergrund der aktuellen Einstufung? Welche Stärken gilt es auszubauen, welche Lücken sollten geschlossen werden?'
  };

  render() {
    const { prById, classes } = this.props;

    return (
      <div>
        <div className={classes.containerListItem}>
          <ListItem>
            <ListItemText
              secondary={this.translateRatingDescription(
                this.state.categoryFulfillment
              )}
            />

            {this.state.comment ? (
              <Icon className={classes.icon}>comment</Icon>
            ) : (
              <Icon className={classes.iconWhite}>comment</Icon>
            )}
          </ListItem>

          <ListItem className={classes.nestedNumber}>
            <FormControl className={classes.formControl}>
              <Select
                value={
                  this.state.ratingFulfillment
                    ? this.state.ratingFulfillment
                    : 3
                }
                onChange={this.handleChangeRating(prById)}
                displayEmpty
                name="ratingFulfillment"
              >
                <MenuItem value={1}>nicht erfüllt</MenuItem>,
                <MenuItem value={2}>zT. n. erfüllt</MenuItem>,
                <MenuItem value={3}>erfüllt</MenuItem>,
                <MenuItem value={4}>zT. übererfüllt</MenuItem>,
                <MenuItem value={5}>übererfüllt</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
        </div>
        <List component="div" disablePadding className={classes.nestedText}>
          <ListItem>
            <ListItemText
              secondary={this.translateRatingDescription(
                this.state.categoryTargetRole
              )}
            />
            <FormControl className={classes.nestedNumberTargetRole}>
              <Select
                value={
                  this.state.ratingTargetRole ? this.state.ratingTargetRole : 1
                }
                onChange={this.handleChangeRating(prById)}
                displayEmpty
                name="ratingTargetRole"
              >
                <MenuItem value={1}>keine Auswahl</MenuItem>,
                <MenuItem value={2}>Platformgestalter</MenuItem>,
                <MenuItem value={3}>Business IT Solution Leader</MenuItem>,
                <MenuItem value={4}>Transformation Manager</MenuItem>,
                <MenuItem value={5}>IT-Liefersteuerer</MenuItem>,
                <MenuItem value={6}>Architect</MenuItem>,
                <MenuItem value={7}>Technical Expert</MenuItem>,
                <MenuItem value={8}>Lead Developer</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <ListItem>
            <TextField
              id={this.state.categoryFulfillment}
              label="Freitextfeld (bitte ausfüllen)"
              multiline
              fullWidth
              rowsMax="4"
              value={this.state.comment ? this.state.comment : ''}
              onChange={this.handleChangeComment(prById)}
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
              className={classes.description}
              primary="Beschreibung"
              secondary={this.categoryText.text}
            />
          </ListItem>
        </List>
      </div>
    );
  }
}

export const StyledComponentOA = withStyles(styles)(PrOverallAssessment);
export default connect(
  state => ({
    prRating: state.prRatings.prRating
  }),
  {
    addRating: actions.addRating
  }
)(StyledComponentOA);
