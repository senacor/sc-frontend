import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Collapse from '@material-ui/core/Collapse';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import * as actions from '../../actions';
import PrSwipePositionDescription from './PrSwipePositionDescription';
import { debounce } from '../../helper/debounce';

const styles = theme => ({
  nestedText: {
    paddingLeft: '20px',
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
    paddingLeft: '20px',
    width: '80%'
  },
  nestedListItemFTF: {
    maxWidth: '80%'
  },
  icon: {
    color: theme.palette.primary['400']
  },
  nestedNumber: {
    width: '20%'
  },
  nestedNumberFTF: {
    width: '48%',
    justifyContent: 'flex-end'
  },
  nestedNumberTargetRole: {
    width: '95%'
  },
  formControlFTF: {
    minWidth: '100%'
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
      is_expanded: false
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

    this.sendComment(
      prById,
      category,
      event.target.value,
      this.state.rating,
      ratings.id
    );
  };

  sendComment = debounce(this.props.addRating, 500);

  translateRatingDescription = ratingDescription => {
    switch (ratingDescription) {
      case 'PROBLEM_ANALYSIS':
        return 'Problemanalyse und -lösung';
      case 'WORK_RESULTS':
        return 'Arbeitsergebnisse';
      case 'WORKING_MANNER':
        return 'Arbeitsweise';
      case 'TEAMWORK':
        return 'Effektives Arbeiten im Team und Teamführung';
      case 'LEADERSHIP':
        return 'Coaching, Leadership und Personalführung';
      case 'CUSTOMER_INTERACTION':
        return 'Kundeninteraktion und -veränderung';
      case 'CUSTOMER_RETENTION':
        return 'Kundenbindung und Mandatsgenerierung';
      case 'FULFILLMENT_OF_REQUIREMENT':
        return 'Gesamteinschätzung; Erfüllung der Anforderungen für aktuelle Stufe';
      case 'TARGET_ROLE':
        return 'Zielrolle (ab Senior Level ausfüllen)';
      default:
        return 'default';
    }
  };

  handleClick = () => {
    this.setState({
      is_expanded: !this.state.is_expanded
    });
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
              className={
                category === 'FULFILLMENT_OF_REQUIREMENT'
                  ? classes.nestedListItemFTF
                  : {}
              }
              secondary={this.translateRatingDescription(category)}
            />

            {this.state.comment ? (
              <Icon className={classes.icon}>comment</Icon>
            ) : (
              ''
            )}
          </ListItem>

          <ListItem
            className={
              category === 'FULFILLMENT_OF_REQUIREMENT'
                ? classes.nestedNumberFTF
                : classes.nestedNumber
            }
          >
            <FormControl className={classes.formControlFTF}>
              <Select
                value={this.state.rating ? this.state.rating : 3}
                onChange={this.handleChangeRating(prById, category)}
                displayEmpty
                name="rating"
              >
                {category === 'FULFILLMENT_OF_REQUIREMENT'
                  ? [
                      <MenuItem value={1}>nicht erfüllt</MenuItem>,
                      <MenuItem value={2}>zT. nicht erfüllt</MenuItem>,
                      <MenuItem value={3}>erfüllt</MenuItem>,
                      <MenuItem value={4}>zT. übererfüllt</MenuItem>,
                      <MenuItem value={5}>übererfüllt</MenuItem>
                    ]
                  : [
                      <MenuItem value={1}>1</MenuItem>,
                      <MenuItem value={2}>2</MenuItem>,
                      <MenuItem value={3}>3</MenuItem>,
                      <MenuItem value={4}>4</MenuItem>,
                      <MenuItem value={5}>5</MenuItem>
                    ]}
              </Select>
            </FormControl>
          </ListItem>
        </div>
        <Collapse in={this.state.is_expanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className={classes.nestedText}>
            {category === 'FULFILLMENT_OF_REQUIREMENT'
              ? [
                  <ListItem>
                    <ListItemText
                      secondary={this.translateRatingDescription('TARGET_ROLE')}
                    />
                    <FormControl className={classes.nestedNumberTargetRole}>
                      <Select
                        value={this.state.rating ? this.state.rating : 1}
                        onChange={this.handleChangeRating(
                          prById,
                          'TARGET_ROLE'
                        )}
                        displayEmpty
                        name="rating"
                      >
                        <MenuItem value={1}>keine Auswahl</MenuItem>,
                        <MenuItem value={2}>Platformgestalter</MenuItem>,
                        <MenuItem value={3}>
                          Business IT Solution Leader
                        </MenuItem>,
                        <MenuItem value={4}>Transformation Manager</MenuItem>,
                        <MenuItem value={5}>IT-Liefersteuerer</MenuItem>,
                        <MenuItem value={6}>Architect</MenuItem>,
                        <MenuItem value={7}>Technical Expert</MenuItem>,
                        <MenuItem value={8}>Lead Developer</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItem>
                ]
              : []}
            <ListItem>
              <TextField
                id={category}
                label={
                  category === 'FULFILLMENT_OF_REQUIREMENT'
                    ? 'Freitextfeld (bitte ausfüllen)'
                    : 'Kommentar'
                }
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
            <PrSwipePositionDescription category={category} />
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
