import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import * as actions from '../../actions';
import PrSwipePositionDescription from './PrSwipePositionDescription';
import { debounce } from '../../helper/debounce';
import { translateContent } from '../translate/Translate';
import { getPrRatings, getUserroles } from '../../reducers/selector';
import Icon from '@material-ui/core/Icon';
import PrTextField from './PrTextField';
import TextFieldService from '../../service/TextFieldService';
import PrRatingPoints from './PrRatingPoints';

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
  collapsed: {
    marginTop: '-10pt',
    marginBottom: '10pt'
  },
  rating: {
    color: theme.palette.primary['400']
  },
  center: {
    textAlign: 'center'
  }
});

class PrReviewerRating extends React.Component {
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
    let chooseInDropdown =
      event.target.value !== '-' ? event.target.value : null;
    this.setState({ [event.target.name]: event.target.value });

    this.props.prRating.rating = chooseInDropdown;

    this.props.addRating(
      prById,
      category,
      this.props.prRating.comment,
      chooseInDropdown,
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

    let service = new TextFieldService();
    service.setNonActionPerformer(nonActionPerformer);
    service.setIsActionPerformer(isActionPerformer);
    service.setReadOnlyFlag(readOnly);
    service.setOpenEditing(true);
    service.setReadOnlyText(prRating.comment);
    service.setWriteableText(comment);

    let numberService = new TextFieldService();
    numberService.setNonActionPerformer(nonActionPerformer);
    numberService.setIsActionPerformer(isActionPerformer);
    numberService.setReadOnlyFlag(readOnly);
    numberService.setOpenEditing(true);
    numberService.setReadOnlyText(prRating.rating ? prRating.rating : '-');
    numberService.setWriteableText(prRating.rating ? prRating.rating : '-');

    return (
      <div className={isExpanded ? classes.expanded : classes.collapsed}>
        <div className={classes.containerListItem}>
          <ListItem className={classes.nestedTextSelect}>
            <PrTextField
              id={category + '_CommentId'}
              label={translateContent(category)}
              startrows={'2'}
              state={service.getState()}
              value={service.getValue()}
              onChange={this.handleChangeComment(prById, category)}
              helperText={helperText}
            />
          </ListItem>
          <ListItem className={classes.nestedNumber}>
            {
              <PrRatingPoints
                state={numberService.getState()}
                readOnly={readOnly}
                value={prRating.rating ? prRating.rating : '-'}
                classes={classes}
                category={category}
                onChange={this.handleChangeRating(prById, category)}
              />
            }
          </ListItem>
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

export const StyledComponent = withStyles(styles)(PrReviewerRating);
export default connect(
  (state, props) => ({
    userroles: getUserroles(state),
    prRating: getPrRatings(props.category)(state)
  }),
  {
    addRating: actions.addRating
  }
)(StyledComponent);
