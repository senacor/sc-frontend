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
import { isEmployee } from '../../helper/checkRole';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  nestedText: {
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
    paddingRight: '0px'
  },
  nestedTextSelect: {
    minWidth: '46%'
  },
  nestedTextDescr: {
    minWidth: '49%'
  },
  nestedTextInfo: {
    maxWidth: '147px',
    paddingBottom: '0px',
    marginBottom: '-30px'
  },
  icon: {
    color: theme.palette.primary['400']
  },
  iconError: {
    color: theme.palette.primary['400'],
    fontSize: 17,
    marginBottom: '-30px'
  },
  test: {
    fontSize: 12,
    color: theme.palette.text.secondary
  },
  comment: {
    paddingLeft: '24px',
    paddingRight: '24px',
    color: '#26646d',
    fontStyle: 'italic'
  }
});

class PrOverallAssessment extends React.Component {
  constructor(props) {
    super(props);
    const categoryFulfillment = 'FULFILLMENT_OF_REQUIREMENT';
    const categoryTargetRole = 'TARGET_ROLE';

    let ratingFulfillment = this.props.prById.prRatingSet.find(
      prRating => prRating.prRatingDescription === categoryFulfillment
    );

    let targetRole = this.props.prById.prRatingSet.find(
      prRating => prRating.prRatingDescription === categoryTargetRole
    );

    this.state = {
      ratingFulfillment: ratingFulfillment
        ? ratingFulfillment.rating
        : undefined,
      ratingTargetRole: targetRole ? targetRole.rating : undefined,
      comment: ratingFulfillment ? ratingFulfillment.comment : '',
      prById: this.props.prById,
      prVisible: this.props.prVisible,
      categoryFulfillment: categoryFulfillment,
      categoryTargetRole: categoryTargetRole,
      is_expanded: false
    };
  }

  handleChangeRating = prById => event => {
    this.setState({ [event.target.name]: event.target.value });
    let category =
      event.target.name === 'ratingFulfillment'
        ? this.state.categoryFulfillment
        : this.state.categoryTargetRole;
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

  mapRatingFullfilment = ratingFulfillemnt => {
    switch (ratingFulfillemnt) {
      case 1:
        return 'nicht erfüllt';
      case 2:
        return 'zT. nicht erfüllt';
      case 3:
        return 'erfüllt';
      case 4:
        return 'zT. übererfüllt';
      case 5:
        return 'übererfüllt';
      default:
        return 'keine Auswahl';
    }
  };

  mapRatingTargetRole = ratingTargetRole => {
    switch (ratingTargetRole) {
      case 1:
        return 'keine Auswahl';
      case 2:
        return 'Platformgestalter';
      case 3:
        return 'Business IT Solution Leader';
      case 4:
        return 'Transformation Manager';
      case 5:
        return 'IT-Liefersteuerer';
      case 6:
        return 'Architect';
      case 7:
        return 'Technical Expert';
      case 8:
        return 'Lead Developer';
      default:
        return 'keine Auswahl';
    }
  };

  render() {
    const { prById, classes } = this.props;

    return (
      <div>
        <div className={classes.containerListItem}>
          <ListItem>
            <ListItemText
              className={classes.nestedTextDescr}
              secondary={this.translateRatingDescription(
                this.state.categoryFulfillment
              )}
            />
            {isEmployee(this.props.userroles) ? (
              <Typography variant="body1">
                {this.state.prVisible
                  ? this.mapRatingFullfilment(this.state.ratingFulfillment)
                  : ''}
              </Typography>
            ) : (
              <FormControl className={classes.nestedTextSelect}>
                <Select
                  id="ratingFullfillmentId"
                  value={
                    this.state.ratingFulfillment
                      ? this.state.ratingFulfillment
                      : 3
                  }
                  onChange={this.handleChangeRating(prById)}
                  displayEmpty
                  name="ratingFulfillment"
                >
                  {[1, 2, 3, 4, 5].map(ratingValue => {
                    return (
                      <MenuItem
                        key={'_ratingFulfillment' + ratingValue}
                        id={'_ratingFulfillmentValue' + ratingValue}
                        value={ratingValue}
                      >
                        {this.mapRatingFullfilment(ratingValue)}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
          </ListItem>
        </div>
        <div className={classes.containerListItem}>
          <ListItem>
            <ListItemText
              className={classes.nestedTextDescr}
              secondary={this.translateRatingDescription(
                this.state.categoryTargetRole
              )}
            />

            {isEmployee(this.props.userroles) ? (
              <Typography variant="body1">
                {this.state.prVisible
                  ? this.mapRatingTargetRole(this.state.ratingTargetRole)
                  : ''}
              </Typography>
            ) : (
              <FormControl className={classes.nestedTextSelect}>
                <Select
                  id="ratingTargetRoleId"
                  value={
                    this.state.ratingTargetRole
                      ? this.state.ratingTargetRole
                      : 1
                  }
                  displayEmpty
                  name="ratingTargetRole"
                  onChange={this.handleChangeRating(prById)}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(ratingValue => {
                    return (
                      <MenuItem
                        key={'_ratingTargetRole' + ratingValue}
                        id={'_ratingTargetValueRole' + ratingValue}
                        value={ratingValue}
                      >
                        {this.mapRatingTargetRole(ratingValue)}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
          </ListItem>
        </div>
        {isEmployee(this.props.userroles) ? (
          this.state.comment && this.state.prVisible ? (
            <div className={classes.containerListItem}>
              <ListItem>
                <Icon className={classes.icon}>comment</Icon>
                <Typography className={classes.comment} variant="body1">
                  {this.state.comment}
                </Typography>
              </ListItem>
            </div>
          ) : (
            ''
          )
        ) : (
          <List component="div" disablePadding className={classes.nestedText}>
            <ListItem>
              <ListItemText
                className={classes.nestedTextInfo}
                disableTypography
                secondary={
                  <Typography className={classes.test}>
                    Freitextfeld (bitte ausfüllen)
                  </Typography>
                }
              />
              {this.state.comment ? (
                ''
              ) : (
                <Icon className={classes.iconError}>error</Icon>
              )}
            </ListItem>
            <ListItem>
              <TextField
                id={this.state.categoryFulfillment}
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
            <ListItem>
              <ListItemText
                className={classes.description}
                primary="Beschreibung"
                secondary={this.categoryText.text}
              />
            </ListItem>
          </List>
        )}
      </div>
    );
  }
}

export const StyledComponentOA = withStyles(styles)(PrOverallAssessment);
export default connect(
  state => ({
    userroles: state.userroles,
    prRating: state.prRatings.prRating
  }),
  {
    addRating: actions.addRating
  }
)(StyledComponentOA);
