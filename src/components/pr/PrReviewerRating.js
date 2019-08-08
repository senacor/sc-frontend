import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import * as actions from '../../actions';
import PrSwipePositionDescription from './PrSwipePositionDescription';
import { debounce } from '../../helper/debounce';
import { getPrRatings } from '../../reducers/selector';
import Icon from '@material-ui/core/Icon';
import PrTextField from './PrTextField';
import TextFieldService from '../../service/TextFieldService';
import PrRatingPoints from './PrRatingPoints';
import { injectIntl } from 'react-intl';

const styles = theme => ({
  nestedText: { paddingRight: '2%' },
  containerListItem: {
    display: 'flex'
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
  }
});

const PrReviewerRating = ({
  prById,
  category,
  classes,
  prRating,
  addRating,
  nonActionPerformer,
  isActionPerformer,
  readOnly,
  helperText,
  openEditing,
  intl
}) => {
  prRating = {}; // TODO: temp
  let optionalComment = prRating.comment ? prRating.comment : '';
  const [isExpanded, setIsExpanded] = useState(false);
  const [comment, setComment] = useState(optionalComment);
  const [rating, setRating] = useState(null);

  let service = new TextFieldService();
  service.setNonActionPerformer(nonActionPerformer);
  service.setIsActionPerformer(isActionPerformer);
  service.setReadOnlyFlag(readOnly);
  service.setOpenEditing(true);
  service.setReadOnlyText(prRating.comment);
  service.setWriteableText(comment);
  service.setCloseEditingExplicitly(openEditing);

  let numberService = new TextFieldService();
  numberService.setNonActionPerformer(nonActionPerformer);
  numberService.setIsActionPerformer(isActionPerformer);
  numberService.setReadOnlyFlag(readOnly);
  numberService.setOpenEditing(true);
  numberService.setReadOnlyText(prRating.rating ? prRating.rating : '-');
  numberService.setWriteableText(prRating.rating ? prRating.rating : '-');
  numberService.setCloseEditingExplicitly(openEditing);

  const handleChangeRating = (prById, category) => event => {
    let chooseInDropdown =
      event.target.value !== '-' ? event.target.value : null;
    setRating(chooseInDropdown);

    prRating.rating = chooseInDropdown;

    addRating(
      prById,
      category,
      prRating.comment,
      chooseInDropdown,
      prRating.id
    );
  };

  const handleChangeComment = (prById, category) => event => {
    setComment(event.target.value);
    sendComment(prById, category, event.target.value, rating, prRating.id);
  };

  const sendComment = debounce(addRating, 500);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={isExpanded ? classes.expanded : classes.collapsed}>
      <div className={classes.containerListItem}>
        <ListItem className={classes.nestedTextSelect}>
          <PrTextField
            fieldId={category + '_CommentId'}
            label={intl.formatMessage({
              id: `${category}`
            })}
            startrows={'2'}
            state={service.getState()}
            value={service.getValue()}
            onChange={handleChangeComment(prById, category)}
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
              onChange={handleChangeRating(prById, category)}
            />
          }
        </ListItem>
        <ListItem
          button
          className={classes.nestedInfo}
          onClick={() => handleClick(category)}
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
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <PrSwipePositionDescription category={category} />
          </Collapse>
        </List>
      </div>
    </div>
  );
};

export const StyledComponent = withStyles(styles)(PrReviewerRating);
export default injectIntl(
  connect(
    (state, props) => ({}),
    {
      addRating: actions.addRating
    }
  )(StyledComponent)
);
