import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles/index';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import * as actions from '../../actions';
import { getFinalCommentEmployee, getUserroles } from '../../reducers/selector';
import { debounce } from '../../helper/debounce';
import { translateContent } from '../translate/Translate';

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

    this.sendComment(
      prById.id,
      prById.prFinalizationStatus.finalizationStatusOfEmployee,
      prById.prFinalizationStatus.finalizationStatusOfReviewer,
      event.target.value
    );
  };
  sendComment = debounce(this.props.changeFinalCommentEmployee, 500);

  render() {
    let { prById, classes, finalCommentEmployee, readOnly } = this.props;
    let { commentText } = this.state;

    return (
      <List>
        <ListItem>
          <Grid container direction={'column'}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography component="p">
                {translateContent('FINAL_COMMENT_EMPLOYEE')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              {readOnly ? (
                <Typography className={classes.comment} variant="body1">
                  {finalCommentEmployee
                    ? finalCommentEmployee
                    : 'Kein Kommentar'}
                </Typography>
              ) : (
                <TextField
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
                  placeholder={translateContent(
                    'PLACEHOLDER_FINAL_COMMENT_EMPLOYEE'
                  )}
                />
              )}
            </Grid>
          </Grid>
        </ListItem>
      </List>
    );
  }
}

export const StyledComponent = withStyles(styles)(PrFinalCommentEmployee);
export default connect(
  state => ({
    finalCommentEmployee: getFinalCommentEmployee()(state),
    userroles: getUserroles(state)
  }),
  {
    changeFinalCommentEmployee: actions.changeFinalCommentEmployee
  }
)(StyledComponent);
