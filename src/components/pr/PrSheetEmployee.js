import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles/index';
import { connect } from 'react-redux';
import { getPrEmployeeContributions } from '../../reducers/selector';
import PrTextField from './PrTextField';
import TextFieldService from '../../service/TextFieldService';
import { injectIntl } from 'react-intl';

const styles = () => ({
  nestedText: {
    paddingLeft: '0px'
  }
});

const PrSheetEmployee = ({
  employeeContribution,
  classes,
  category,
  readOnly,
  isActionPerformer,
  nonActionPerformer,
  errorFlag,
  intl
}) => {
  let comment = employeeContribution.text ? employeeContribution.text : '';
  const [commentText, setCommentText] = useState(comment);

  let service = new TextFieldService();
  service.setNonActionPerformer(nonActionPerformer);
  service.setIsActionPerformer(isActionPerformer);
  service.setReadOnlyFlag(readOnly);
  service.setOpenEditing(true);
  service.setReadOnlyText(employeeContribution.text);
  service.setWriteableText(commentText);
  service.setErrorFlag(errorFlag);

  const handleChangeComment = event => {
    setCommentText(event.target.value);
  };

  return (
    <div>
      <List component="div" disablePadding className={classes.nestedText}>
        <ListItem>
          <Grid container direction={'column'}>
            <Grid item xs={12}>
              <PrTextField
                fieldId={category + '_CommentId'}
                state={service.getState()}
                value={service.getValue()}
                required
                label={intl.formatMessage({
                  id: `${category}`
                })}
                helperText={intl.formatMessage({
                  id: `PLACEHOLDER_${category}`
                })}
                onChange={handleChangeComment}
              />
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </div>
  );
};

export default injectIntl(
  connect((state, props) => ({
    employeeContribution: getPrEmployeeContributions(props.category)(state)
  }))(withStyles(styles)(PrSheetEmployee))
);
