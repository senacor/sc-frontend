import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import ScRow from '../ScRow';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { CATEGORY } from '../../../../helper/scSheetData';

const styles = theme => ({
  ...theme.styledComponents,
  addProjectButton: {
    color: theme.palette.secondary.yellow
  }
});

const PrCategories = React.memo(
  ({
    classes,
    intl,
    skillsInTheFieldsFields,
    impactOnTeamFields,
    serviceQualityFields,
    impactOnCompanyFields,
    handleChangePrCategories,
    prCategoriesWeightPercentage,
    handleChangeWeightPercentage,
    fieldsDisabled
  }) => {
    return (
      <Fragment>
        <Grid container>
          <Grid item xs={11}>
            <Typography variant="h5" className={classes.categoryTitle}>
              {intl.formatMessage({ id: 'scsheet.category.skills' })}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <TextField
              disabled={fieldsDisabled}
              inputProps={{ style: { height: 10 } }}
              type="number"
              value={prCategoriesWeightPercentage}
              onChange={event => {
                handleChangeWeightPercentage(
                  CATEGORY.PR_CATEGORIES,
                  event.target.value
                );
              }}
              margin="normal"
              variant="outlined"
              label={'%'}
            />
          </Grid>
        </Grid>
        <ScRow
          fieldsDisabled={fieldsDisabled}
          row={skillsInTheFieldsFields}
          type={CATEGORY.SKILLS_IN_THE_FIELDS}
          action={handleChangePrCategories}
          title={intl.formatMessage({
            id: 'scsheet.subtitle.skillsinthefield'
          })}
          description={intl.formatMessage({
            id: 'scsheet.textarea.description.skillsinthefield'
          })}
        />
        <Divider />
        <ScRow
          fieldsDisabled={fieldsDisabled}
          row={impactOnTeamFields}
          type={CATEGORY.TEAM_IMPACT}
          action={handleChangePrCategories}
          title={intl.formatMessage({
            id: 'scsheet.subtitle.impactonteam'
          })}
          description={intl.formatMessage({
            id: 'scsheet.textarea.description.impactonteam'
          })}
        />
        <Divider />
        <ScRow
          fieldsDisabled={fieldsDisabled}
          row={serviceQualityFields}
          type={CATEGORY.SERVICE_QUALITY}
          action={handleChangePrCategories}
          title={intl.formatMessage({
            id: 'scsheet.subtitle.servicequality'
          })}
          description={intl.formatMessage({
            id: 'scsheet.textarea.description.servicequality'
          })}
        />
        <Divider />
        <ScRow
          fieldsDisabled={fieldsDisabled}
          row={impactOnCompanyFields}
          type={CATEGORY.COMPANY_IMPACT}
          action={handleChangePrCategories}
          title={intl.formatMessage({
            id: 'scsheet.subtitle.impactoncompany'
          })}
          description={intl.formatMessage({
            id: 'scsheet.textarea.description.impactoncompany'
          })}
        />
      </Fragment>
    );
  },
  (prevProps, nextProps) =>
    prevProps.skillsInTheFieldsFields === nextProps.skillsInTheFieldsFields &&
    prevProps.impactOnTeamFields === nextProps.impactOnTeamFields &&
    prevProps.serviceQualityFields === nextProps.serviceQualityFields &&
    prevProps.impactOnCompanyFields === nextProps.impactOnCompanyFields &&
    prevProps.prCategoriesWeightPercentage ===
      nextProps.prCategoriesWeightPercentage
);

export default withRouter(injectIntl(withStyles(styles)(PrCategories)));
