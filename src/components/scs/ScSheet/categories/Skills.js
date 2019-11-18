import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import ScRow from '../ScRow';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/es/TextField';

const styles = theme => ({
  ...theme.styledComponents,
  addProjectButton: {
    color: theme.palette.secondary.yellow
  }
});

const Skills = React.memo(
  ({
    classes,
    intl,
    skillsInTheFieldsFields,
    impactOnTeamFields,
    serviceQualityFields,
    impactOnCompanyFields,
    handleChangeSkills,
    skillsWeightPercentage
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
              defaultValue={skillsWeightPercentage}
              margin="normal"
              variant="outlined"
              label={'%'}
            />
          </Grid>
        </Grid>
        <Typography variant="h5" className={classes.subCategoryTitle}>
          {intl.formatMessage({ id: 'scsheet.subtitle.skillsinthefield' })}
        </Typography>
        <ScRow
          fields={skillsInTheFieldsFields}
          type={'skillsInTheField'}
          action={handleChangeSkills}
        />
        <Divider />
        <Typography variant="h5" className={classes.subCategoryTitle}>
          {intl.formatMessage({ id: 'scsheet.subtitle.impactonteam' })}
        </Typography>
        <ScRow
          fields={impactOnTeamFields}
          type={'impactOnTeam'}
          action={handleChangeSkills}
        />
        <Divider />
        <Typography variant="h5" className={classes.subCategoryTitle}>
          {intl.formatMessage({ id: 'scsheet.subtitle.servicequality' })}
        </Typography>
        <ScRow
          fields={serviceQualityFields}
          type={'serviceQuality'}
          action={handleChangeSkills}
        />
        <Divider />
        <Typography variant="h5" className={classes.subCategoryTitle}>
          {intl.formatMessage({ id: 'scsheet.subtitle.impactoncompany' })}
        </Typography>
        <ScRow
          fields={impactOnCompanyFields}
          type={'impactOnCompany'}
          action={handleChangeSkills}
        />
      </Fragment>
    );
  },
  (prevProps, nextProps) => prevProps.show === nextProps.show
);

export default withRouter(injectIntl(withStyles(styles)(Skills)));
