import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles/index';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';

import * as actions from '../../actions';
import { getPrRatings, getUserroles } from '../../reducers/selector';
import { debounce } from '../../helper/debounce';
import PrTextField from './PrTextField';
import TextFieldService from '../../service/TextFieldService';

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

class PrOverallComment extends Component {
  constructor(props) {
    super(props);
    let { prRating } = this.props;
    let overallComment = prRating.comment ? prRating.comment : '';
    this.state = {
      comment: overallComment
    };
  }

  handleChangeComment = prById => event => {
    this.setState({ comment: event.target.value });

    this.sendComment(
      prById,
      this.props.category,
      event.target.value,
      this.props.prRating.rating,
      this.props.prRating.id
    );
  };

  sendComment = debounce(this.props.addRating, 500);

  render() {
    let {
      prRating,
      prById,
      isActionPerformer,
      readOnly,
      nonActionPerformer,
      errorFlag,
      category
    } = this.props;
    let { comment } = this.state;

    let service = new TextFieldService();
    service.setNonActionPerformer(nonActionPerformer);
    service.setIsActionPerformer(isActionPerformer);
    service.setReadOnlyFlag(readOnly);
    service.setOpenEditing(true);
    service.setReadOnlyText(prRating.comment);
    service.setWriteableText(comment);
    service.setErrorFlag(errorFlag);
    service.setCloseEditingExplicitly(this.props.openEditing);

    let helperText =
      'Erfüllung der Anforderungen, welche Stärken ausbauen, welche Lücken schließen?';

    return (
      <List>
        <ListItem>
          <Grid container direction={'column'}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <PrTextField
                fieldId={category}
                state={service.getState()}
                value={service.getValue()}
                required
                label={'Gesamteinschätzung Freitext'}
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

export const StyledComponent = withStyles(styles)(PrOverallComment);
export default connect(
  (state, props) => ({
    prRating: getPrRatings(props.category)(state),
    userroles: getUserroles(state)
  }),
  {
    addRating: actions.addRating
  }
)(StyledComponent);
