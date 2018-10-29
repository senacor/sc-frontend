import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListItem from '@material-ui/core/ListItem';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { getPrRatings, getUserroles } from '../../reducers/selector';
import { translateContent } from '../translate/Translate';
import * as actions from '../../actions';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  simpleBlack: {
    color: '#000000',
    width: '80%'
  },
  number: {
    width: '20%',
    paddingLeft: '5%'
  }
});

export class PrOverallFulfillment extends Component {
  mapRatingFullfilment = ratingFulfillemnt => {
    switch (ratingFulfillemnt) {
      case 1:
        return 'nicht erfüllt';
      case 2:
        return 'zT. nicht erfüllt';
      case 3:
        return 'erfüllt';
      case 4:
        return 'zT. übererfüllt';
      case 5:
        return 'übererfüllt';
      default:
        return 'keine Auswahl';
    }
  };

  handleChangeRating = prById => event => {
    this.props.addRating(
      prById,
      this.props.category,
      this.props.comment,
      event.target.value,
      this.props.prRating.id
    );
  };

  render() {
    const {
      category,
      prRating,
      prById,
      readOnly,
      isActionPerformer,
      nonActionPerformer,
      classes
    } = this.props;

    if (!prRating) {
      return null;
    }

    if (nonActionPerformer) {
      return (
        <ListItem>
          <div className={classes.simpleBlack}>
            <Typography>{translateContent(category)}</Typography>
          </div>
          <Typography id="FULFILLMENT_OF_REQUIREMENT_TYPO" variant="body1">
            {this.props.readOnly
              ? this.mapRatingFullfilment(prRating.rating)
              : 'kein Eintrag'}
          </Typography>
        </ListItem>
      );
    } else if (isActionPerformer) {
      return (
        <ListItem>
          <div className={classes.simpleBlack}>
            <Typography>{translateContent(category)}</Typography>
          </div>
          <div className={classes.number}>
            <FormControl disabled={readOnly}>
              <Select
                id="ratingFullfillmentId"
                value={prRating.rating ? prRating.rating : 3}
                onChange={this.handleChangeRating(prById)}
                displayEmpty
                name="ratingFulfillment"
              >
                {[1, 2, 3, 4, 5].map(ratingValue => {
                  return (
                    <MenuItem
                      key={'_ratingFulfillment' + ratingValue}
                      id={'_ratingFulfillmentValue' + ratingValue}
                      value={ratingValue}
                    >
                      {this.mapRatingFullfilment(ratingValue)}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </ListItem>
      );
    } else {
      return null;
    }
  }
}

export const StyledComponent = withStyles(styles)(PrOverallFulfillment);
export default connect(
  (state, props) => ({
    prRating: getPrRatings(props.category)(state),
    userroles: getUserroles(state)
  }),
  {
    addRating: actions.addRating
  }
)(StyledComponent);
