import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { Grid } from '@material-ui/core';
import { injectIntl } from 'react-intl';

import PrSwipePositionDescription from './PrSwipePositionDescription';
import PrTextField from './PrTextField';
import PrRatingPoints from './PrRatingPoints';

const styles = theme => ({
  iconComment: {
    color: theme.palette.primary['400']
  },
  iconNoComment: {
    color: theme.palette.primary['200']
  },
  expanded: {
    backgroundColor: theme.palette.secondary.brighterGrey,
    marginBottom: theme.spacing.unit
  },
  collapsed: {
    marginBottom: theme.spacing.unit
  }
});

const PrReviewerRating = ({
  category,
  classes,
  text,
  rating,
  isReadOnly,
  isError,
  actionText,
  actionRating,
  intl
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={isExpanded ? classes.expanded : classes.collapsed}>
      <Grid container spacing={16} alignItems="center">
        <Grid item xs={10}>
          <PrTextField
            label={intl.formatMessage({
              id: `${category}`
            })}
            rows="2"
            text={text}
            isReadOnly={isReadOnly('RATINGS_REVIEWER')}
            isError={isError}
            action={actionText}
          />
        </Grid>
        <Grid item xs={1}>
          <PrRatingPoints
            category={category}
            rating={rating}
            isReadOnly={isReadOnly}
            isError={false}
            action={actionRating}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={() => handleClick(category)}>
            <Icon
              id={`${category}_CommentIconId`}
              className={
                !isExpanded ? classes.iconComment : classes.iconNoComment
              }
            >
              info
            </Icon>
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <PrSwipePositionDescription category={category} />
          </Collapse>
        </Grid>
      </Grid>
    </div>
  );
};

export default injectIntl(withStyles(styles)(PrReviewerRating));
