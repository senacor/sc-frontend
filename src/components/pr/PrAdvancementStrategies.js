import React, { useState } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles/index';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import { getAdvancementStrategies } from '../../reducers/selector';

import PrTextField from './PrTextField';
import TextFieldService from '../../service/TextFieldService';
import { injectIntl } from 'react-intl';

const styles = theme => ({
  comment: {
    color: theme.palette.primary['400'],
    fontStyle: 'italic'
  }
});

const PrAdvancementStrategies = ({
  advancementStrategies,
  readOnly,
  open,
  isActionPerformer,
  nonActionPerformer,
  intl
}) => {
  let comment = advancementStrategies ? advancementStrategies : '';
  let helperText = intl.formatMessage({
    id: 'pradvancementstrategies.helpertext'
  });

  const [commentText, setCommentText] = useState(comment);

  let service = new TextFieldService();
  service.setNonActionPerformer(nonActionPerformer);
  service.setIsActionPerformer(isActionPerformer);
  service.setReadOnlyFlag(readOnly);
  service.setOpenEditing(true);
  service.setReadOnlyText(advancementStrategies);
  service.setWriteableText(commentText);
  service.setCloseEditingExplicitly(open);

  const handleChangeComment = event => {
    setCommentText(event.target.value);
  };

  return (
    <List>
      <ListItem>
        <Grid container direction={'column'}>
          <Grid item xs={12}>
            <PrTextField
              fieldId={'advancementStrategiees'}
              label={intl.formatMessage({
                id: 'pradvancementstrategies.measures'
              })}
              state={service.getState()}
              value={service.getValue()}
              helperText={helperText}
              onChange={handleChangeComment}
            />
          </Grid>
        </Grid>
      </ListItem>
    </List>
  );
};

export const StyledComponent = withStyles(styles)(PrAdvancementStrategies);
export default injectIntl(
  connect(state => ({
    advancementStrategies: getAdvancementStrategies()(state)
  }))(StyledComponent)
);
