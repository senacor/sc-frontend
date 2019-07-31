import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles/index';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import * as actions from '../../actions';
import { getFinalCommentEmployee, getUserroles } from '../../reducers/selector';
import { debounce } from '../../helper/debounce';

import PrTextField from './PrTextField';
import TextFieldService from '../../service/TextFieldService';
import { injectIntl } from 'react-intl';

const styles = theme => ({
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '3pt 3pt',
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  },
  comment: {
    color: theme.palette.primary['400'],
    fontStyle: 'italic'
  }
});

class PrFinalCommentEmployee extends Component {
  constructor(props) {
    super(props);
    let { finalCommentEmployee } = this.props;
    let comment = finalCommentEmployee ? finalCommentEmployee : '';
    this.state = {
      commentText: comment
    };
  }

  handleChangeComment = prById => event => {
    this.setState({ commentText: event.target.value });

    this.sendComment(prById.id, event.target.value);
  };
  sendComment = debounce(this.props.changeFinalCommentEmployee, 500);

  render() {
    let {
      prById,
      finalCommentEmployee,
      readOnly,
      open,
      isActionPerformer,
      nonActionPerformer,
      intl
    } = this.props;
    let { commentText } = this.state;

    let service = new TextFieldService();
    service.setNonActionPerformer(nonActionPerformer);
    service.setIsActionPerformer(isActionPerformer);
    service.setReadOnlyFlag(readOnly);
    service.setOpenEditing(open);
    service.setReadOnlyText(finalCommentEmployee);
    service.setWriteableText(commentText);

    let helperText = intl.formatMessage({
      id: 'prfinalcommentemployee.notes'
    });

    return (
      <List>
        <ListItem>
          <Grid container direction={'column'}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <PrTextField
                fieldId={'finalComment'}
                label={intl.formatMessage({
                  id: 'FINAL_COMMENT_EMPLOYEE'
                })}
                state={service.getState()}
                value={service.getValue()}
                helperText={helperText}
                onChange={this.handleChangeComment(prById)}
              />
            </Grid>
          </Grid>
        </ListItem>
      </List>
    );
  }
}

export const StyledComponent = withStyles(styles)(PrFinalCommentEmployee);
export default injectIntl(
  connect(
    state => ({
      finalCommentEmployee: getFinalCommentEmployee()(state),
      userroles: getUserroles(state)
    }),
    {
      changeFinalCommentEmployee: actions.changeFinalCommentEmployee
    }
  )(StyledComponent)
);
