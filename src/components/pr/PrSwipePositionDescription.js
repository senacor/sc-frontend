import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ListItemText from '@material-ui/core/ListItemText';
import ReactSwipe from 'react-swipe';
import { FormattedMessage } from 'react-intl';

const styles = theme => ({
  swipe: {
    overflow: 'hidden',
    visibility: 'hidden',
    position: 'relative',
    width: '400px',
    [theme.breakpoints.down('md')]: {
      width: '200px'
    }
  },
  swipeWrapInside: {
    float: 'left',
    position: 'relative'
  },
  description: {
    paddingLeft: '0',
    paddingRight: '0'
  },
  titleSize: {
    paddingLeft: '0',
    paddingRight: '0'
  }
});

class PrSwipePositionDescription extends React.Component {
  positionText = (position, intl) => {
    switch (position) {
      case 'PROBLEM_ANALYSIS':
        return (
          <FormattedMessage id="prswipepositiondescription.problemanalysis" />
        );

      case 'WORK_RESULTS':
        return <FormattedMessage id="prswipepositiondescription.workresults" />;

      case 'WORKING_MANNER':
        return (
          <FormattedMessage id="prswipepositiondescription.workingmanner" />
        );

      case 'TEAMWORK':
        return <FormattedMessage id="prswipepositiondescription.teamwork" />;

      case 'LEADERSHIP':
        return <FormattedMessage id="prswipepositiondescription.leadership" />;

      case 'CUSTOMER_INTERACTION':
        return (
          <FormattedMessage id="prswipepositiondescription.customerinteraction" />
        );

      case 'CUSTOMER_RETENTION':
        return (
          <FormattedMessage id="prswipepositiondescription.customerretention" />
        );

      case 'FULFILLMENT_OF_REQUIREMENT':
        return (
          <FormattedMessage id="prswipepositiondescription.fulfillmentofrequirement" />
        );

      case 'CONTRIBUTION_TO_COMPANY_DEVELOPMENT':
        return (
          <FormattedMessage id="prswipepositiondescription.contributiontocompanydevelopment" />
        );

      default:
        return;
    }
  };
  categoryText = category => {
    switch (category) {
      case 'PROBLEM_ANALYSIS':
        return {
          junior: (
            <FormattedMessage id="prswipepositiondescription.problemanalysis.junior" />
          ),

          senior: (
            <FormattedMessage id="prswipepositiondescription.problemanalysis.senior" />
          ),

          expert: (
            <FormattedMessage id="prswipepositiondescription.problemanalysis.expert" />
          ),

          lead: (
            <FormattedMessage id="prswipepositiondescription.problemanalysis.lead" />
          )
        };
      case 'WORK_RESULTS':
        return {
          junior: (
            <FormattedMessage id="prswipepositiondescription.workresults.junior" />
          ),

          senior: (
            <FormattedMessage id="prswipepositiondescription.workresults.senior" />
          ),

          expert: (
            <FormattedMessage id="prswipepositiondescription.workresults.expert" />
          ),

          lead: (
            <FormattedMessage id="prswipepositiondescription.workresults.lead" />
          )
        };

      case 'WORKING_MANNER':
        return {
          junior: (
            <FormattedMessage id="prswipepositiondescription.workingmanner.junior" />
          ),

          senior: (
            <FormattedMessage id="prswipepositiondescription.workingmanner.senior" />
          ),

          expert: (
            <FormattedMessage id="prswipepositiondescription.workingmanner.expert" />
          ),

          lead: (
            <FormattedMessage id="prswipepositiondescription.workingmanner.lead" />
          )
        };

      case 'TEAMWORK':
        return {
          junior: (
            <FormattedMessage id="prswipepositiondescription.teamwork.junior" />
          ),

          senior: (
            <FormattedMessage id="prswipepositiondescription.teamwork.senior" />
          ),

          expert: (
            <FormattedMessage id="prswipepositiondescription.teamwork.expert" />
          ),

          lead: (
            <FormattedMessage id="prswipepositiondescription.teamwork.lead" />
          )
        };

      case 'LEADERSHIP':
        return {
          junior: (
            <FormattedMessage id="prswipepositiondescription.leadership.junior" />
          ),

          senior: (
            <FormattedMessage id="prswipepositiondescription.leadership.senior" />
          ),

          expert: (
            <FormattedMessage id="prswipepositiondescription.leadership.expert" />
          ),

          lead: (
            <FormattedMessage id="prswipepositiondescription.leadership.lead" />
          )
        };

      case 'CUSTOMER_INTERACTION':
        return {
          junior: (
            <FormattedMessage id="prswipepositiondescription.customerinteraction.junior" />
          ),

          senior: (
            <FormattedMessage id="prswipepositiondescription.customerinteraction.senior" />
          ),

          expert: (
            <FormattedMessage id="prswipepositiondescription.customerinteraction.expert" />
          ),

          lead: (
            <FormattedMessage id="prswipepositiondescription.customerinteraction.lead" />
          )
        };

      case 'CUSTOMER_RETENTION':
        return {
          junior: (
            <FormattedMessage id="prswipepositiondescription.customerretention.junior" />
          ),

          senior: (
            <FormattedMessage id="prswipepositiondescription.customerretention.senior" />
          ),

          expert: (
            <FormattedMessage id="prswipepositiondescription.customerretention.expert" />
          ),

          lead: (
            <FormattedMessage id="prswipepositiondescription.customerretention.lead" />
          )
        };

      case 'FULFILLMENT_OF_REQUIREMENT':
        return {
          text: (
            <FormattedMessage id="prswipepositiondescription.fulfillmentofrequirement.text" />
          )
        };

      case 'CONTRIBUTION_TO_COMPANY_DEVELOPMENT':
        return {
          junior: (
            <FormattedMessage id="prswipepositiondescription.contributiontocompanydevelopment.junior" />
          ),

          senior: (
            <FormattedMessage id="prswipepositiondescription.contributiontocompanydevelopment.senior" />
          ),

          expert: (
            <FormattedMessage id="prswipepositiondescription.contributiontocompanydevelopment.expert" />
          ),

          lead: (
            <FormattedMessage id="prswipepositiondescription.contributiontocompanydevelopment.lead" />
          )
        };

      default:
        return;
    }
  };

  render() {
    const { category, classes, intl } = this.props;

    return (
      <div>
        <ListItem>
          <ListItemText secondary={this.positionText(category, intl)} />
        </ListItem>
        <ListItem>
          <IconButton
            className={classes.button}
            aria-label={
              <FormattedMessage id="prswipepositiondescription.left" />
            }
            onClick={() => this.refs.swiper.prev()}
          >
            <Icon>keyboard_arrow_left</Icon>
          </IconButton>
          <ReactSwipe
            ref="swiper"
            className={classes.swipe}
            swipeOptions={{ continuous: false }}
          >
            <div className={classes.swipeWrapInside}>
              <ListItemText
                className={classes.titleSize}
                primary={
                  <FormattedMessage id="prswipepositiondescription.junior" />
                }
              />
              <ListItemText
                className={classes.description}
                secondary={this.categoryText(category).junior}
              />
            </div>
            <div className={classes.swipeWrapInside}>
              <ListItemText
                className={classes.titleSize}
                primary={
                  <FormattedMessage id="prswipepositiondescription.senior" />
                }
              />
              <ListItemText
                className={classes.description}
                secondary={this.categoryText(category).senior}
              />
            </div>
            <div className={classes.swipeWrapInside}>
              <ListItemText
                className={classes.titleSize}
                primary={
                  <FormattedMessage id="prswipepositiondescription.expert" />
                }
              />
              <ListItemText
                className={classes.description}
                secondary={this.categoryText(category).expert}
              />
            </div>
            <div className={classes.swipeWrapInside}>
              <ListItemText
                className={classes.titleSize}
                primary={
                  <FormattedMessage id="prswipepositiondescription.lead" />
                }
              />
              <ListItemText
                className={classes.description}
                secondary={this.categoryText(category).lead}
              />
            </div>
          </ReactSwipe>
          <IconButton
            className={classes.button}
            aria-label={
              <FormattedMessage id="prswipepositiondescription.right" />
            }
            onClick={() => this.refs.swiper.next()}
          >
            <Icon>keyboard_arrow_right</Icon>
          </IconButton>
        </ListItem>
      </div>
    );
  }
}
export default withStyles(styles)(PrSwipePositionDescription);
