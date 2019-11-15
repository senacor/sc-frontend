import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import ScRow from '../ScRow';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  ...theme.styledComponents,
  addProjectButton: {
    color: theme.palette.secondary.yellow
  }
});

const Skills = React.memo(({
  classes,
  intl,
  skillsInTheFieldsFields,
  impactOnTeamFields,
  serviceQualityFields,
  impactOnCompanyFields,
  handleChangeSkills
}) => {
  return (
    <Fragment>
      <Typography variant="h5" className={classes.categoryTitle}>
        {intl.formatMessage({ id: 'scsheet.category.skills' })}
      </Typography>
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
}, (prevProps, nextProps) => prevProps.show === nextProps.show);

export default withRouter(injectIntl(withStyles(styles)(Skills)));