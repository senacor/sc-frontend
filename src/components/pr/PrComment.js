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
import { isSupervisor } from '../../helper/checkRole';
import { translateContent } from '../translate/Translate';
import { getPrRatings, getUserroles } from '../../reducers/selector';

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

// TODO Rename to PrReviewerRating
class PrComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prById: this.props.prById,
      isExpanded: false
    };
  }
  handleChangeRating = (prById, category) => event => {
    this.setState({ [event.target.name]: event.target.value });

    this.props.prRating.rating = event.target.value;

    this.props.addRating(
      prById,
      category,
      this.props.prRating.comment,
      event.target.value,
      this.props.prRating.id
    );
  };
  handleChangeComment = (prById, category) => event => {
    this.setState({ comment: event.target.value });
    this.props.prRating.comment = event.target.value;

    this.sendComment(
      prById,
      category,
      event.target.value,
      this.state.rating,
      this.props.prRating.id
    );
  };
  sendComment = debounce(this.props.addRating, 500);
  handleClick = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  };

  render() {
    const { prById, category, classes, prRating } = this.props;

    if (!prRating) {
      return null;
    }

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
              secondary={translateContent(category)}
            />

            <Icon
              id={`${category}_CommentIconId`}
              className={
                prRating.comment && this.props.prVisible
                  ? classes.iconComment
                  : classes.iconNoComment
              }
            >
              comment
            </Icon>
          </ListItem>

          <ListItem className={classes.nestedNumber}>
            {!isSupervisor(this.props.userroles) ? (
              <Typography
                id={category}
                className={classes.rating}
                variant="body2"
              >
                {this.props.prVisible ? prRating.rating : ''}
              </Typography>
            ) : (
              <FormControl
                className={classes.formControl}
                disabled={this.props.prFinalized}
              >
                <Select
                  id={category + '_RatingId'}
                  value={prRating.rating ? prRating.rating : 3}
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
            {!isSupervisor(this.props.userroles) ? (
              <ListItem>
                <Typography
                  id={category + '_TYPO'}
                  className={classes.comment}
                  variant="body1"
                >
                  {prRating.comment && this.props.prVisible
                    ? '»' + prRating.comment + '«'
                    : 'Noch nicht freigegeben.'}
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
                  value={
                    this.state.comment ? this.state.comment : prRating.comment
                  }
                  disabled={this.props.prFinalized}
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
  (state, props) => ({
    userroles: getUserroles(state),
    prRating: getPrRatings(props.category)(state)
  }),
  {
    addRating: actions.addRating
  }
)(StyledComponent);
