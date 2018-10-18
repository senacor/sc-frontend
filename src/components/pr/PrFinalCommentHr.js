import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles/index';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import * as actions from '../../actions';
import { getFinalCommentHr, getUserroles } from '../../reducers/selector';
import { debounce } from '../../helper/debounce';
import { translateContent } from '../translate/Translate';
import PrTextField from './PrTextField';
import { textFieldsInPrSheetService } from '../../service/textFieldsInPrSheetService';

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

class PrFinalCommentHr extends Component {
  constructor(props) {
    super(props);
    let { finalCommentHr } = this.props;
    let comment = finalCommentHr ? finalCommentHr : '';
    this.state = {
      commentText: comment
    };
  }

  handleChangeComment = prById => event => {
    this.setState({ commentText: event.target.value });

    this.sendComment(prById.id, event.target.value);
  };
  sendComment = debounce(this.props.changeFinalCommentHr, 500);

  render() {
    let {
      prById,
      finalCommentHr,
      readOnly,
      open,
      isActionPerformer
    } = this.props;
    let { commentText } = this.state;

    let textFieldService = textFieldsInPrSheetService(
      null,
      readOnly,
      isActionPerformer,
      open,
      finalCommentHr,
      null,
      commentText
    );

    let textFieldState = textFieldService.state;

    let textFieldValue = textFieldService.value;

    let helperText =
      'Letzte Anmerkungen und Ergänzungen zum Performance Review.';

    return (
      <List>
        <ListItem>
          <Grid container direction={'column'}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <PrTextField
                fieldId={'finalCommentHr'}
                label={translateContent('FINAL_COMMENT_HR')}
                state={textFieldState}
                value={textFieldValue}
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

export const StyledComponent = withStyles(styles)(PrFinalCommentHr);
export default connect(
  state => ({
    finalCommentHr: getFinalCommentHr()(state),
    userroles: getUserroles(state)
  }),
  {
    changeFinalCommentHr: actions.changeFinalCommentHr
  }
)(StyledComponent);
