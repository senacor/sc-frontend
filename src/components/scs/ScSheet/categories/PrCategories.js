import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import ScRow from '../ScRow';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

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
    handleChangeWeightPercentage
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
              inputProps={{ style: { height: 10 } }}
              type="number"
              value={prCategoriesWeightPercentage}
              onChange={event => {
                handleChangeWeightPercentage(
                  'prCategories',
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
          fields={skillsInTheFieldsFields}
          type={'skillsInTheField'}
          action={handleChangePrCategories}
          title={intl.formatMessage({
            id: 'scsheet.subtitle.skillsinthefield'
          })}
          description={intl.formatMessage({
            id: 'scsheet.textarea.description'
          })}
          achievement={intl.formatMessage({
            id: 'scsheet.textarea.achievement.skillsinthefield'
          })}
        />
        <Divider />
        <ScRow
          fields={impactOnTeamFields}
          type={'impactOnTeam'}
          action={handleChangePrCategories}
          title={intl.formatMessage({
            id: 'scsheet.subtitle.impactonteam'
          })}
          description={intl.formatMessage({
            id: 'scsheet.textarea.description'
          })}
          achievement={intl.formatMessage({
            id: 'scsheet.textarea.achievement.impactonteam'
          })}
        />
        <Divider />
        <ScRow
          fields={serviceQualityFields}
          type={'serviceQuality'}
          action={handleChangePrCategories}
          title={intl.formatMessage({
            id: 'scsheet.subtitle.servicequality'
          })}
          description={intl.formatMessage({
            id: 'scsheet.textarea.description'
          })}
          achievement={intl.formatMessage({
            id: 'scsheet.textarea.achievement.servicequality'
          })}
        />
        <Divider />
        <ScRow
          fields={impactOnCompanyFields}
          type={'impactOnCompany'}
          action={handleChangePrCategories}
          title={intl.formatMessage({
            id: 'scsheet.subtitle.impactoncompany'
          })}
          description={intl.formatMessage({
            id: 'scsheet.textarea.description'
          })}
          achievement={intl.formatMessage({
            id: 'scsheet.textarea.achievement.impactoncompany'
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
