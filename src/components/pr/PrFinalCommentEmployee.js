import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import { getFinalCommentEmployee } from '../../reducers/selector';

import PrTextField from './PrTextField';
import TextFieldService from '../../service/TextFieldService';
import { injectIntl } from 'react-intl';

const styles = theme => ({
  comment: {
    color: theme.palette.primary['400'],
    fontStyle: 'italic'
  }
});

const PrFinalCommentEmployee = ({
  finalCommentEmployee,
  readOnly,
  open,
  isActionPerformer,
  nonActionPerformer,
  intl
}) => {
  let comment = finalCommentEmployee ? finalCommentEmployee : '';
  const [commentText, setCommentText] = useState(comment);

  let service = new TextFieldService();
  service.setNonActionPerformer(nonActionPerformer);
  service.setIsActionPerformer(isActionPerformer);
  service.setReadOnlyFlag(readOnly);
  service.setOpenEditing(open);
  service.setReadOnlyText(finalCommentEmployee);
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
              fieldId={'finalComment'}
              label={intl.formatMessage({
                id: 'FINAL_COMMENT_EMPLOYEE'
              })}
              state={service.getState()}
              value={service.getValue()}
              helperText={intl.formatMessage({
                id: 'prfinalcommentemployee.notes'
              })}
              onChange={handleChangeComment}
            />
          </Grid>
        </Grid>
      </ListItem>
    </List>
  );
};

export const StyledComponent = withStyles(styles)(PrFinalCommentEmployee);
export default injectIntl(
  connect(state => ({
    finalCommentEmployee: getFinalCommentEmployee()(state)
  }))(StyledComponent)
);
