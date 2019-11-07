import React from 'react';
import ReactSwipe from 'react-swipe';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  container: {
    maxWidth: 400
  },
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
    overflow: 'hidden',
    float: 'left',
    position: 'relative'
  },
  description: {
    paddingLeft: 0,
    paddingRight: 0
  },
  titleSize: {
    paddingLeft: 0,
    paddingRight: 0
  }
});

const ScSwipePositionDescription = ({ category, classes, intl }) => {
  const categoryAndPercentage = category => {
    if (
      'PROFESSIONAL_KNOWLEDGE,PROBLEM_ANALYSIS,WORKING_MANNER'.includes(
        category
      )
    ) {
      return {
        specialist: ' (50%)',
        seniorExpert: ' (50%)',
        seniorManagement: ' (35%)',
        leadExpert: ' (35%)',
        leadManagement: ' (20%)'
      };
    }
    if ('TEAM_WORK,LEADERSHIP'.includes(category)) {
      return {
        specialist: ' (25%)',
        seniorExpert: ' (25%)',
        seniorManagement: ' (30%)',
        leadExpert: ' (30%)',
        leadManagement: ' (35%)'
      };
    }
    if ('SERVICE_DEGREE,RECEIVER_SATISFACTION'.includes(category)) {
      return {
        specialist: ' (20%)',
        seniorExpert: ' (20%)',
        seniorManagement: ' (25%)',
        leadExpert: ' (25%)',
        leadManagement: ' (30%)'
      };
    }
    if ('IMPACT_ON_COMPANY'.includes(category)) {
      return {
        specialist: ' (5%)',
        seniorExpert: ' (5%)',
        seniorManagement: ' (10%)',
        leadExpert: ' (10%)',
        leadManagement: ' (15%)'
      };
    }
  };

  const categoryText = category => {
    switch (category) {
      case 'PROFESSIONAL_KNOWLEDGE':
        return {
          specialist: (
            <FormattedMessage id="scsheet.beschreibung.grundlagenwissen" />
          ),
          seniorExpert: (
            <FormattedMessage id="scsheet.beschreibung.verfugtuberfachwissenschnell" />
          ),
          seniorManagement: (
            <FormattedMessage id="scsheet.beschreibung.verfugtuberfachwissen" />
          ),
          leadExpert: (
            <FormattedMessage id="scsheet.beschreibung.verfugtuberbreiteundtiefe" />
          ),
          leadManagement: (
            <FormattedMessage id="scsheet.beschreibung.verfugtuberbreite" />
          )
        };
      case 'PROBLEM_ANALYSIS':
        return {
          specialist: (
            <FormattedMessage id="scsheet.beschreibung.einarbeitung" />
          ),
          seniorExpert: (
            <FormattedMessage id="scsheet.beschreibung.scopingproblem" />
          ),
          seniorManagement: (
            <FormattedMessage id="scsheet.beschreibung.scopingproblem" />
          ),
          leadExpert: (
            <FormattedMessage id="scsheet.beschreibung.scopingproblem" />
          ),
          leadManagement: (
            <FormattedMessage id="scsheet.beschreibung.scopingproblem" />
          )
        };
      case 'WORKING_MANNER':
        return {
          specialist: (
            <FormattedMessage id="scsheet.beschreibung.eigenstandigeBearbeitung" />
          ),
          seniorExpert: (
            <FormattedMessage id="scsheet.beschreibung.ubernahmeendprodukte" />
          ),
          seniorManagement: (
            <FormattedMessage id="scsheet.beschreibung.ubernahmeendprodukte" />
          ),
          leadExpert: (
            <FormattedMessage id="scsheet.beschreibung.ubernahmeteilprojekte" />
          ),
          leadManagement: (
            <FormattedMessage id="scsheet.beschreibung.ubernahmegrossereprojekte" />
          )
        };
      case 'TEAM_WORK':
        return {
          specialist: (
            <FormattedMessage id="scsheet.beschreibung.recherchiertInfo" />
          ),
          seniorExpert: (
            <FormattedMessage id="scsheet.beschreibung.strukturiert" />
          ),
          seniorManagement: (
            <FormattedMessage id="scsheet.beschreibung.strukturiert" />
          ),
          leadExpert: (
            <FormattedMessage id="scsheet.beschreibung.strukturiertunterstutzt" />
          ),
          leadManagement: <FormattedMessage id="scsheet.beschreibung.schafft" />
        };
      case 'LEADERSHIP':
        return {
          specialist: (
            <FormattedMessage id="scsheet.beschreibung.unterstütztTeammitglieder" />
          ),
          seniorExpert: (
            <FormattedMessage id="scsheet.beschreibung.unterstütztTeammitglieder" />
          ),
          seniorManagement: (
            <FormattedMessage id="scsheet.beschreibung.coachedmitarbeiter" />
          ),
          leadExpert: (
            <FormattedMessage id="scsheet.beschreibung.coachedundunterstutzt" />
          ),
          leadManagement: (
            <FormattedMessage id="scsheet.beschreibung.coachedundunterstutztentwickelt" />
          )
        };
      case 'SERVICE_DEGREE':
        return {
          specialist: (
            <FormattedMessage id="scsheet.beschreibung.grundlegendesVerstandnis" />
          ),
          seniorExpert: (
            <FormattedMessage id="scsheet.beschreibung.verstandnisfragestellung" />
          ),
          seniorManagement: (
            <FormattedMessage id="scsheet.beschreibung.verstandnisfragestellung" />
          ),
          leadExpert: (
            <FormattedMessage id="scsheet.beschreibung.ausgepragtesfragestellung" />
          ),
          leadManagement: (
            <FormattedMessage id="scsheet.beschreibung.ausgepragtesgeamtkontext" />
          )
        };
      case 'RECEIVER_SATISFACTION':
        return {
          specialist: (
            <FormattedMessage id="scsheet.beschreibung.zusammenarbeit" />
          ),
          seniorExpert: (
            <FormattedMessage id="scsheet.beschreibung.wirdalsansprechpartner" />
          ),
          seniorManagement: (
            <FormattedMessage id="scsheet.beschreibung.wirdalsansprechpartner" />
          ),
          leadExpert: (
            <FormattedMessage id="scsheet.beschreibung.wirdalsexperte" />
          ),
          leadManagement: (
            <FormattedMessage id="scsheet.beschreibung.wirdalstrustedadvisor" />
          )
        };
      case 'IMPACT_ON_COMPANY':
        return {
          specialist: (
            <FormattedMessage id="scsheet.beschreibung.schulungsInfoAngebote" />
          ),
          seniorExpert: (
            <FormattedMessage id="scsheet.beschreibung.schulungsInfoAngebote" />
          ),
          seniorManagement: (
            <FormattedMessage id="scsheet.beschreibung.schulungsInfoAngebote" />
          ),
          leadExpert: (
            <FormattedMessage id="scsheet.beschreibung.schulungsInfoAngebote" />
          ),
          leadManagement: (
            <FormattedMessage id="scsheet.beschreibung.schulungsInfoAngebote" />
          )
        };
      default:
    }
  };

  let swiper;

  return (
    <div className={classes.container}>
      <ListItem>
        <IconButton
          className={classes.button}
          aria-label={<FormattedMessage id="prswipepositiondescription.left" />}
          onClick={() => swiper.prev()}
        >
          <Icon>keyboard_arrow_left</Icon>
        </IconButton>
        <ReactSwipe
          ref={swp => (swiper = swp)}
          className={classes.swipe}
          swipeOptions={{ continuous: false }}
        >
          <div className={classes.swipeWrapInside}>
            <ListItemText
              className={classes.titleSize}
              primary={
                <div>
                  <FormattedMessage id="scswipepositiondescription.specialist" />{' '}
                  {categoryAndPercentage(category).specialist}
                </div>
              }
            />
            <ListItemText
              className={classes.description}
              secondary={categoryText(category).specialist}
            />
          </div>
          <div className={classes.swipeWrapInside}>
            <ListItemText
              className={classes.titleSize}
              primary={
                <div>
                  <FormattedMessage id="scswipepositiondescription.seniorexpert" />
                  {categoryAndPercentage(category).seniorExpert}
                </div>
              }
            />
            <ListItemText
              className={classes.description}
              secondary={categoryText(category).seniorExpert}
            />
          </div>
          <div className={classes.swipeWrapInside}>
            <ListItemText
              className={classes.titleSize}
              primary={
                <div>
                  <FormattedMessage id="scswipepositiondescription.seniormanagement" />
                  {categoryAndPercentage(category).seniorManagement}
                </div>
              }
            />
            <ListItemText
              className={classes.description}
              secondary={categoryText(category).seniorManagement}
            />
          </div>
          <div className={classes.swipeWrapInside}>
            <ListItemText
              className={classes.titleSize}
              primary={
                <div>
                  <FormattedMessage id="scswipepositiondescription.leadexpert" />
                  {categoryAndPercentage(category).leadExpert}
                </div>
              }
            />
            <ListItemText
              className={classes.description}
              secondary={categoryText(category).leadExpert}
            />
          </div>
          <div className={classes.swipeWrapInside}>
            <ListItemText
              className={classes.titleSize}
              primary={
                <div>
                  <FormattedMessage id="scswipepositiondescription.leadmanagement" />
                  {categoryAndPercentage(category).leadManagement}
                </div>
              }
            />
            <ListItemText
              className={classes.description}
              secondary={categoryText(category).leadManagement}
            />
          </div>
        </ReactSwipe>
        <IconButton
          className={classes.button}
          aria-label={
            <FormattedMessage id="prswipepositiondescription.right" />
          }
          onClick={() => swiper.next()}
        >
          <Icon>keyboard_arrow_right</Icon>
        </IconButton>
      </ListItem>
    </div>
  );
};
export default injectIntl(withStyles(styles)(ScSwipePositionDescription));
