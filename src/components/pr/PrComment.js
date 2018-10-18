import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import * as actions from '../../actions';
import PrSwipePositionDescription from './PrSwipePositionDescription';
import { debounce } from '../../helper/debounce';
import { translateContent } from '../translate/Translate';
import { getPrRatings, getUserroles } from '../../reducers/selector';
import Icon from '@material-ui/core/Icon';
import PrTextField from './PrTextField';

const styles = theme => ({
  nestedText: { paddingRight: '2%' },
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
    width: '18%'
  },
  nestedInfo: {
    width: '5%',
    paddingRight: '6%',
    marginLeft: '-3%'
  },
  nestedTextSelect: {
    width: '100%'
  },
  expanded: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    marginTop: '-10pt',
    marginBottom: '10pt'
  },
  collapsen: {
    marginTop: '-10pt',
    marginBottom: '10pt'
  },
  rating: {
    color: theme.palette.primary['400']
  }
});

// TODO Rename to PrReviewerRating
class PrComment extends React.Component {
  constructor(props) {
    super(props);
    let { prRating } = this.props;
    let optionalComment = prRating.comment ? prRating.comment : '';

    this.state = {
      prById: this.props.prById,
      isExpanded: false,
      comment: optionalComment
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
    const {
      prById,
      category,
      classes,
      prRating,
      nonActionPerformer,
      isActionPerformer,
      readOnly,
      helperText
    } = this.props;

    let { isExpanded, comment } = this.state;

    let ratingPoints = () => {
      switch (true) {
        case nonActionPerformer:
          return (
            <Typography
              id={category}
              className={classes.rating}
              variant="body2"
            >
              {readOnly ? prRating.rating : ''}
            </Typography>
          );
        case isActionPerformer:
          return (
            <FormControl className={classes.formControl} disabled={readOnly}>
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
          );
        default:
          return null;
      }
    };

    return (
      <div className={isExpanded ? classes.expanded : classes.collapsen}>
        <div className={classes.containerListItem}>
          <ListItem className={classes.nestedTextSelect}>
            <PrTextField
              id={category + '_CommentId'}
              label={translateContent(category)}
              startrows={'2'}
              openEditing={true}
              readOnlyText={prRating.comment ? prRating.comment : ''}
              writeableText={comment}
              onChange={this.handleChangeComment(prById, category)}
              readOnlyFlag={readOnly}
              isActionPerformer={isActionPerformer}
              nonActionPerformer={nonActionPerformer}
              helperText={helperText}
            />
          </ListItem>
          <ListItem className={classes.nestedNumber}>{ratingPoints()}</ListItem>
          <ListItem
            button
            className={classes.nestedInfo}
            onClick={() => this.handleClick(category)}
          >
            <Icon
              id={`${category}_CommentIconId`}
              className={
                !isExpanded ? classes.iconComment : classes.iconNoComment
              }
            >
              info
            </Icon>
          </ListItem>
        </div>
        <div>
          <List component="div" disablePadding className={classes.nestedText}>
            <Collapse in={this.state.isExpanded} timeout="auto" unmountOnExit>
              <PrSwipePositionDescription category={category} />
            </Collapse>
          </List>
        </div>
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
