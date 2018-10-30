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
    console.log('Kategorie: ' + this.props.category);

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

    let helperText =
      'Erfüllung der Anforderungen, welche Stärken ausbauen, welche Lücken schließen?';

    return (
      <List>
        <ListItem>
          <Grid container direction={'column'}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <PrTextField
                fieldId={category}
                isActionPerformer={isActionPerformer}
                nonActionPerformer={nonActionPerformer}
                readOnlyFlag={readOnly}
                openEditing={true}
                required
                label={'Gesamteinschätzung Freitext'}
                helperText={helperText}
                readOnlyText={prRating.comment}
                writeableText={comment}
                onChange={this.handleChangeComment(prById)}
                errorFlag={errorFlag}
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
