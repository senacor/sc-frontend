import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { isEmployee } from '../../helper/checkRole';
import { getPrRatings, getUserroles } from '../../reducers/selector';
import { translateContent } from '../translate/Translate';
import * as actions from '../../actions';

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
    const { category, userroles, prRating, prById, prFinalized } = this.props;

    if (!prRating) {
      return null;
    }

    return (
      <ListItem>
        <ListItemText secondary={translateContent(category)} />
        {isEmployee(userroles) ? (
          <Typography id="FULFILLMENT_OF_REQUIREMENT_TYPO" variant="body1">
            {this.props.prVisible
              ? this.mapRatingFullfilment(prRating.rating)
              : ''}
          </Typography>
        ) : (
          <FormControl disabled={prFinalized}>
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
        )}
      </ListItem>
    );
  }
}

export default connect(
  (state, props) => ({
    prRating: getPrRatings(props.category)(state),
    userroles: getUserroles(state)
  }),
  {
    addRating: actions.addRating
  }
)(PrOverallFulfillment);
