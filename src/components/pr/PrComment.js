import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import * as actions from '../../actions';
import PrSwipePositionDescription from './PrSwipePositionDescription';
import { debounce } from '../../helper/debounce';
import { isEmployee } from '../../helper/checkRole';

const styles = theme => ({
  nestedText: { paddingRight: '27px' },
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
    width: '80%'
  },
  iconComment: {
    color: theme.palette.primary['400']
  },
  iconNoComment: {
    color: '#dddddd'
  },
  nestedNumber: {
    width: '20%'
  },
  nestedTextSelect: {
    width: '95%'
  },
  comment: {
    paddingRight: '24px',
    color: theme.palette.primary['400'],
    fontStyle: 'italic'
  },
  expanded: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)'
  },
  rating: {
    color: theme.palette.primary['400']
  }
});

class PrComment extends React.Component {
  constructor(props) {
    super(props);

    let prRating = this.props.prById.prRatingSet.find(
      prRating => prRating.prRatingDescription === this.props.category
    );

    this.state = {
      rating: prRating ? prRating.rating : {},
      comment: prRating ? prRating.comment : '',
      prById: this.props.prById,
      prVisible: this.props.prVisible,
      isExpanded: false
    };
  }

  handleChangeRating = (prById, category) => event => {
    this.setState({ [event.target.name]: event.target.value });
    let prRating = prById.prRatingSet.find(
      prRating => prRating.prRatingDescription === category
    );
    prRating.rating = event.target.value;

    this.props.addRating(
      prById,
      category,
      this.state.comment,
      event.target.value,
      prRating.id
    );
  };

  handleChangeComment = (prById, category) => event => {
    this.setState({ [event.target.name]: event.target.value });
    let prRating = prById.prRatingSet.find(
      prRating => prRating.prRatingDescription === category
    );
    prRating.comment = event.target.value;

    this.sendComment(
      prById,
      category,
      event.target.value,
      this.state.rating,
      prRating.id
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
      case 'CONTRIBUTION_TO_COMPANY_DEVELOPMENT':
        return 'Beitrag zur Unternehmensentwicklung';
      case 'TEAMWORK':
        return 'Effektives Arbeiten im Team und Teamführung';
      case 'LEADERSHIP':
        return 'Coaching, Leadership und Personalführung';
      case 'CUSTOMER_INTERACTION':
        return 'Kundeninteraktion und -veränderung';
      case 'CUSTOMER_RETENTION':
        return 'Kundenbindung und Mandatsgenerierung';
      default:
        return 'default';
    }
  };

  handleClick = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  };

  render() {
    const { prById, category, classes } = this.props;

    return (
      <div className={this.state.isExpanded ? classes.expanded : ''}>
        <div className={classes.containerListItem}>
          <ListItem
            button
            className={classes.nestedListItem}
            onClick={() => this.handleClick(category)}
          >
            <ListItemText
              id={`${category}_CommentDescription`}
              secondary={this.translateRatingDescription(category)}
            />

            <Icon
              id={`${category}_CommentIconId`}
              className={
                this.state.comment && this.state.prVisible
                  ? classes.iconComment
                  : classes.iconNoComment
              }
            >
              comment
            </Icon>
          </ListItem>

          <ListItem className={classes.nestedNumber}>
            {isEmployee(this.props.userroles) ? (
              <Typography
                id={category}
                className={classes.rating}
                variant="body2"
              >
                {this.state.prVisible ? this.state.rating : ''}
              </Typography>
            ) : (
              <FormControl className={classes.formControl}>
                <Select
                  id={category + '_RatingId'}
                  value={this.state.rating ? this.state.rating : 3}
                  onChange={this.handleChangeRating(prById, category)}
                  displayEmpty
                  name="rating"
                >
                  {[1, 2, 3, 4, 5].map(ratingValue => {
                    return (
                      <MenuItem
                        key={category + '_RatingValue' + ratingValue}
                        id={category + '_RatingValue' + ratingValue}
                        value={ratingValue}
                      >
                        {ratingValue}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
          </ListItem>
        </div>
        <Collapse in={this.state.isExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className={classes.nestedText}>
            {isEmployee(this.props.userroles) ? (
              <ListItem>
                <Typography
                  id={category + '_TYPO'}
                  className={classes.comment}
                  variant="body1"
                >
                  {this.state.comment && this.state.prVisible
                    ? '»' + this.state.comment + '«'
                    : ''}
                </Typography>
              </ListItem>
            ) : (
              <ListItem>
                <TextField
                  id={category + '_CommentId'}
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
            )}
            <PrSwipePositionDescription category={category} />
          </List>
        </Collapse>
      </div>
    );
  }
}

export const StyledComponent = withStyles(styles)(PrComment);
export default connect(
  state => ({
    userroles: state.userroles,
    prRating: state.prRatings.prRating
  }),
  {
    addRating: actions.addRating
  }
)(StyledComponent);