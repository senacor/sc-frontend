import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { getPrRatings, getUserroles } from '../../reducers/selector';

import PrOverallFulfillment from './PrOverallFulfillment';
import PrOverallComment from './PrOverallComment';
import TargetRole from './TargetRole';

const styles = {
  containerListItem: {
    display: 'flex'
  }
};

class PrOverallAssessment extends React.Component {
  render() {
    const { prById, classes } = this.props;

    return (
      <div>
        <div className={classes.containerListItem}>
          <PrOverallFulfillment
            prById={prById}
            category="FULFILLMENT_OF_REQUIREMENT"
            prVisible={this.props.prVisible}
          />
        </div>

        <div className={classes.containerListItem}>
          <TargetRole prById={prById} />
        </div>

        <div className={classes.containerListItem}>
          <PrOverallComment
            prById={prById}
            category="FULFILLMENT_OF_REQUIREMENT"
            prVisible={this.props.prVisible}
          />
        </div>
      </div>
    );
  }
}

export const StyledComponentOA = withStyles(styles)(PrOverallAssessment);
export default connect(
  (state, props) => ({
    userroles: getUserroles(state),
    prRating: getPrRatings(props.category)(state)
  }),
  {
    addRating: actions.addRating,
    fetchTargetRolesById: actions.fetchTargetRolesById
  }
)(StyledComponentOA);
