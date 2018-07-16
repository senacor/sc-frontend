import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

import Translate from '../translate/Translate';
import { formatDateForFrontend } from '../../helper/date';
import { getPrDetail, getSortedPrs } from '../../reducers/selector';
import * as actions from '../../actions/index';

const styles = theme => ({
  button_highlight: {
    backgroundColor: `${theme.palette.primary[50]} !important`
  }
});

class MyPerformanceReviewsList extends Component {
  componentDidMount() {
    return this.props.fetchPrs();
  }

  selectPerformanceReview = (prId, shouldGoTo) => () => {
    this.props.setPrDetail(prId);
    if (shouldGoTo) {
      this.props.history.push(`/prs/${prId}`);
    }
  };

  render() {
    let { prs, prDetail, classes, highlightPrDetail } = this.props;

    return (
      <List>
        {prs.map(pr => {
          return (
            <div key={pr.id}>
              <ListItem
                button
                className={
                  highlightPrDetail && pr.id === prDetail.id
                    ? classes.button_highlight
                    : ''
                }
                onClick={this.selectPerformanceReview(
                  pr.id,
                  !highlightPrDetail
                )}
              >
                <ListItemText
                  primary={<Translate content={pr.occasion} />}
                  primaryTypographyProps={{ component: 'div' }}
                  secondaryTypographyProps={{ component: 'div' }}
                  secondary={
                    <div>
                      <div>
                        Fälligkeitsdatum: {formatDateForFrontend(pr.deadline)}
                      </div>
                      <div>Bewerter: {pr.supervisor}</div>
                    </div>
                  }
                />
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    );
  }
}

MyPerformanceReviewsList.propTypes = {
  prs: PropTypes.array.isRequired,
  highlightPrDetail: PropTypes.bool
};

export const StyledComponent = withStyles(styles)(MyPerformanceReviewsList);
export default connect(
  state => ({
    prs: getSortedPrs()(state),
    prDetail: getPrDetail()(state)
  }),
  {
    fetchPrs: actions.fetchPrs,
    setPrDetail: actions.setPrDetail
  }
)(withRouter(StyledComponent));
