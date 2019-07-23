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
import { mapRatingFullfilment } from '../../helper/mapRatingFullfilment';
import { injectIntl } from 'react-intl';

const styles = {
  simpleBlack: {
    color: '#000000',
    width: '80%'
  },
  number: {
    width: '20%',
    paddingLeft: '5%'
  }
};

export class PrOverallFulfillment extends Component {
  handleChangeRating = prById => event => {
    this.props.addRating(
      prById,
      this.props.category,
      this.props.prRating.comment,
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
      openEditing,
      classes,
      intl
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
            {readOnly
              ? mapRatingFullfilment(prRating.rating)
              : intl.formatMessage({
                  id: 'proverallfulfillment.noentry'
                })}
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
            <FormControl disabled={!openEditing}>
              <Select
                id="FULFILLMENT_OF_REQUIREMENT_RatingId"
                value={prRating.rating ? prRating.rating : 0}
                onChange={this.handleChangeRating(prById)}
                displayEmpty
                name="ratingFulfillment"
              >
                {[0, 1, 2, 3, 4, 5].map(ratingValue => {
                  return (
                    <MenuItem
                      key={
                        'FULFILLMENT_OF_REQUIREMENT' +
                        '_RatingValue' +
                        ratingValue
                      }
                      id={
                        'FULFILLMENT_OF_REQUIREMENT' +
                        '_RatingValue' +
                        ratingValue
                      }
                      value={ratingValue}
                    >
                      {mapRatingFullfilment(ratingValue)}
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
export default injectIntl(
  connect(
    (state, props) => ({
      prRating: getPrRatings(props.category)(state),
      userroles: getUserroles(state)
    }),
    {
      addRating: actions.addRating
    }
  )(StyledComponent)
);
