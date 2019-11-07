import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { injectIntl } from 'react-intl';
import ScSwipePositionDescription from './ScSwipePositionDescription';
import ScRatingPoints from './ScRatingPoints';

const styles = theme => ({
  iconComment: {
    color: theme.palette.primary['400']
  },
  iconNoComment: {
    color: theme.palette.primary['200']
  }
});

const ScReviewerRating = ({
  category,
  classes,
  rating,
  actionRating,
  intl
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={isExpanded ? classes.expanded : classes.collapsed}>
      <ScRatingPoints
        category={category}
        rating={rating}
        action={actionRating}
      />
      <IconButton onClick={() => handleClick(category)}>
        <Icon
          id={`${category}_CommentIconId`}
          className={!isExpanded ? classes.iconComment : classes.iconNoComment}
        >
          info
        </Icon>
      </IconButton>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <ScSwipePositionDescription category={category} />
      </Collapse>
    </div>
  );
};

export default injectIntl(withStyles(styles)(ScReviewerRating));
