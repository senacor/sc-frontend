import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles/index';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import * as actions from '../../actions';
import { getFinalCommentHr, getUserroles } from '../../reducers/selector';
import { debounce } from '../../helper/debounce';
import { translateContent } from '../translate/Translate';
import { isHr } from '../../helper/checkRole';

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
      classes,
      finalCommentHr,
      readOnly,
      open,
      disabledText
    } = this.props;
    let { commentText } = this.state;

    let printComment = finalCommentHr ? finalCommentHr : 'Kein Eintrag.';

    let readOnlyView = () => {
      return disabledText ? (
        <TextField
          id={'finalCommentHr'}
          multiline
          fullWidth
          disabled={true}
          rows="4"
          rowsMax="10"
          margin="none"
          value={readOnly ? printComment : 'Noch nicht freigegeben.'}
          onChange={this.handleChangeComment(prById)}
          InputProps={{
            disableUnderline: true,
            name: 'comment',
            classes: {
              input: classes.bootstrapInput
            }
          }}
          InputLabelProps={{
            shrink: true
          }}
          helperText={`Möchte ich letzte Anmerkungen zum Performance Review machen?
                  Gibt es noch etwas zu ergänzen? Ich bestätige, dass ich das Review zur Kenntnis genommen habe.`}
          placeholder={translateContent('PLACEHOLDER_FINAL_COMMENT_EMPLOYEE')}
        />
      ) : (
        <Typography
          id={'finalCommentHrReadonly'}
          className={classes.comment}
          variant="body1"
        >
          {readOnly ? printComment : 'Noch nicht freigegeben.'}
        </Typography>
      );
    };

    let insertText = () => {
      return (
        <TextField
          id={'finalCommentHr'}
          multiline
          fullWidth
          rows="4"
          rowsMax="10"
          margin="none"
          value={commentText}
          onChange={this.handleChangeComment(prById)}
          InputProps={{
            disableUnderline: true,
            name: 'comment',
            classes: {
              input: classes.bootstrapInput
            }
          }}
          InputLabelProps={{
            shrink: true
          }}
          helperText={`Möchte ich letzte Anmerkungen zum Performance Review machen?
                  Gibt es noch etwas zu ergänzen? Ich bestätige, dass ich das Review zur Kenntnis genommen habe.`}
          placeholder={translateContent('PLACEHOLDER_FINAL_COMMENT_EMPLOYEE')}
        />
      );
    };

    let infoText = () => {
      return disabledText ? (
        <TextField
          id={'finalCommentHr'}
          multiline
          fullWidth
          disabled={true}
          rows="4"
          rowsMax="10"
          margin="none"
          value={
            readOnly
              ? printComment
              : 'Bitte nach Abschluss durch den Mitarbeiter ausfüllen.'
          }
          onChange={this.handleChangeComment(prById)}
          InputProps={{
            disableUnderline: true,
            name: 'comment',
            classes: {
              input: classes.bootstrapInput
            }
          }}
          InputLabelProps={{
            shrink: true
          }}
          helperText={`Möchte ich letzte Anmerkungen zum Performance Review machen?
                  Gibt es noch etwas zu ergänzen? Ich bestätige, dass ich das Review zur Kenntnis genommen habe.`}
          placeholder={translateContent('PLACEHOLDER_FINAL_COMMENT_EMPLOYEE')}
        />
      ) : (
        <Typography
          id={'finalCommentHrReadonly'}
          className={classes.comment}
          variant="body1"
        >
          {readOnly
            ? printComment
            : 'Bitte nach Abschluss durch den Mitarbeiter ausfüllen.'}
        </Typography>
      );
    };

    let writingView = () => {
      return open ? insertText() : infoText();
    };

    return isHr(this.props.userroles) ? (
      <List>
        <ListItem>
          <Grid container direction={'column'}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography component="p">
                {translateContent('FINAL_COMMENT_HR')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              {!readOnly ? writingView() : readOnlyView()}
            </Grid>
          </Grid>
        </ListItem>
      </List>
    ) : null;
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
