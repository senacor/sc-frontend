import React, { Component } from 'react';
import { connect } from 'react-redux';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { isEmployee } from '../../helper/checkRole';
import { translateContent } from '../translate/Translate';
import { getPrRatings, getUserroles } from '../../reducers/selector';
import * as actions from '../../actions';

export class TargetRole extends Component {
  handleChangeRating = prById => event => {
    this.props.addRating(
      prById,
      this.props.category,
      this.props.prRating.comment,
      event.target.value,
      this.props.prRating.id
    );
  };

  mapRatingTargetRole = ratingTargetRole => {
    switch (ratingTargetRole) {
      case 1:
        return 'keine Auswahl';
      case 2:
        return 'Platformgestalter';
      case 3:
        return 'Business IT Solution Leader';
      case 4:
        return 'Transformation Manager';
      case 5:
        return 'IT-Liefersteuerer';
      case 6:
        return 'Architect';
      case 7:
        return 'Technical Expert';
      case 8:
        return 'Lead Developer';
      default:
        return 'keine Auswahl';
    }
  };

  render() {
    const { category, prRating, prById } = this.props;

    if (!prRating) {
      return null;
    }

    return (
      <ListItem>
        <ListItemText secondary={translateContent(category)} />

        {isEmployee(this.props.userroles) ? (
          <Typography id="TARGET_ROLE_TYPO" variant="body1">
            {this.props.prVisible
              ? this.mapRatingTargetRole(prRating.rating)
              : ''}
          </Typography>
        ) : (
          <FormControl>
            <Select
              id="ratingTargetRoleId"
              value={prRating.rating ? prRating.rating : 1}
              displayEmpty
              name="ratingTargetRole"
              onChange={this.handleChangeRating(prById)}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(ratingValue => {
                return (
                  <MenuItem
                    key={'_ratingTargetRole' + ratingValue}
                    id={'_ratingTargetValueRole' + ratingValue}
                    value={ratingValue}
                  >
                    {this.mapRatingTargetRole(ratingValue)}
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
)(TargetRole);
