import React, { useState } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles/index';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';

import { getPrRatings } from '../../reducers/selector';
import PrTextField from './PrTextField';
import TextFieldService from '../../service/TextFieldService';
import { injectIntl } from 'react-intl';

const styles = theme => ({
  comment: {
    color: theme.palette.primary['400'],
    fontStyle: 'italic'
  }
});

const PrOverallComment = ({
  prRating,
  isActionPerformer,
  readOnly,
  nonActionPerformer,
  errorFlag,
  category,
  openEditing,
  intl
}) => {
  prRating = {}; //TODO: temp
  let comment = prRating.comment ? prRating.comment : '';
  const [overallComment, setOverallComment] = useState(comment);

  let service = new TextFieldService();
  service.setNonActionPerformer(nonActionPerformer);
  service.setIsActionPerformer(isActionPerformer);
  service.setReadOnlyFlag(readOnly);
  service.setOpenEditing(true);
  service.setReadOnlyText(prRating.comment);
  service.setWriteableText(overallComment);
  service.setErrorFlag(errorFlag);
  service.setCloseEditingExplicitly(openEditing);

  const handleChangeComment = event => {
    setOverallComment(event.target.value);
  };

  return (
    <List>
      <ListItem>
        <Grid container direction={'column'}>
          <Grid item xs={12}>
            <PrTextField
              fieldId={category}
              state={service.getState()}
              value={service.getValue()}
              required
              label={intl.formatMessage({
                id: 'proverallcomment.overall'
              })}
              helperText={intl.formatMessage({
                id: 'proverallcomment.requirements'
              })}
              onChange={handleChangeComment}
            />
          </Grid>
        </Grid>
      </ListItem>
    </List>
  );
};

export const StyledComponent = withStyles(styles)(PrOverallComment);
export default injectIntl(
  connect((state, props) => ({
  }))(StyledComponent)
);
