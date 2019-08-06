import React, { useState } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles/index';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import { getFinalCommentHr } from '../../reducers/selector';
import PrTextField from './PrTextField';
import TextFieldService from '../../service/TextFieldService';
import { injectIntl } from 'react-intl';

const styles = theme => ({
  comment: {
    color: theme.palette.primary['400'],
    fontStyle: 'italic'
  }
});

const PrFinalCommentHr = ({
  finalCommentHr,
  readOnly,
  open,
  isActionPerformer,
  intl
}) => {
  let comment = finalCommentHr ? finalCommentHr : '';
  const [commentText, setCommentText] = useState(comment);

  let service = new TextFieldService();
  service.setIsActionPerformer(isActionPerformer);
  service.setReadOnlyFlag(readOnly);
  service.setOpenEditing(open);
  service.setReadOnlyText(finalCommentHr);
  service.setWriteableText(commentText);

  const handleChangeComment = event => {
    setCommentText(event.target.value);
  };

  return (
    <List>
      <ListItem>
        <Grid container direction={'column'}>
          <Grid item xs={12}>
            <PrTextField
              fieldId={'FINAL_COMMENT_HR'}
              label={intl.formatMessage({
                id: 'FINAL_COMMENT_HR'
              })}
              state={service.getState()}
              value={service.getValue()}
              helperText={intl.formatMessage({
                id: 'prfinalcommenthr.hronly'
              })}
              onChange={handleChangeComment}
            />
          </Grid>
        </Grid>
      </ListItem>
    </List>
  );
};

export const StyledComponent = withStyles(styles)(PrFinalCommentHr);
export default injectIntl(
  connect(state => ({
    finalCommentHr: getFinalCommentHr()(state)
  }))(StyledComponent)
);
