import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { CATEGORY } from '../../../../helper/scSheetData';
import MixedScRow from './MixedScRow';

const styles = theme => ({
  ...theme.styledComponents,
  addProjectButton: {
    color: theme.palette.secondary.yellow
  },
  whiteFont: {
    color: '#FFFFFF'
  },
  container: {
    display: 'flex',
    alignItems: 'center'
  }
});

const SummaryPrCategories = ({
  classes,
  intl,
  skillsInTheFieldsFields,
  impactOnTeamFields,
  serviceQualityFields,
  impactOnCompanyFields,
  prCategoriesWeightPercentage
}) => {
  return (
    <Fragment>
      <Grid
        container
        className={`${classes.categoryTitle} ${classes.container}`}
      >
        <Grid item xs={11}>
          <Typography variant="h5" className={classes.whiteFont}>
            {intl.formatMessage({ id: 'scsheet.category.skills' })}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography className={classes.whiteFont}>
            {`${prCategoriesWeightPercentage}%`}
          </Typography>
        </Grid>
      </Grid>
      <MixedScRow
        rowEmployee={skillsInTheFieldsFields.employee}
        rowReviewer={skillsInTheFieldsFields.reviewer}
        type={CATEGORY.SKILLS_IN_THE_FIELDS}
        title={intl.formatMessage({
          id: 'scsheet.subtitle.skillsinthefield'
        })}
        description={intl.formatMessage({
          id: 'scsheet.textarea.description.skillsinthefield'
        })}
      />
      <Divider />
      <MixedScRow
        rowEmployee={impactOnTeamFields.employee}
        rowReviewer={impactOnTeamFields.reviewer}
        type={CATEGORY.TEAM_IMPACT}
        title={intl.formatMessage({
          id: 'scsheet.subtitle.impactonteam'
        })}
        description={intl.formatMessage({
          id: 'scsheet.textarea.description.impactonteam'
        })}
      />
      <Divider />
      <MixedScRow
        rowEmployee={serviceQualityFields.employee}
        rowReviewer={serviceQualityFields.reviewer}
        type={CATEGORY.SERVICE_QUALITY}
        title={intl.formatMessage({
          id: 'scsheet.subtitle.servicequality'
        })}
        description={intl.formatMessage({
          id: 'scsheet.textarea.description.servicequality'
        })}
      />
      <Divider />
      <MixedScRow
        rowEmployee={impactOnCompanyFields.employee}
        rowReviewer={impactOnCompanyFields.reviewer}
        type={CATEGORY.COMPANY_IMPACT}
        title={intl.formatMessage({
          id: 'scsheet.subtitle.impactoncompany'
        })}
        description={intl.formatMessage({
          id: 'scsheet.textarea.description.impactoncompany'
        })}
      />
    </Fragment>
  );
};

export default withRouter(injectIntl(withStyles(styles)(SummaryPrCategories)));
