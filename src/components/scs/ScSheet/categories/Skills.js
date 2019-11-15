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

const Skills = ({
  isEmployee,
  classes,
  intl,
  kompetenzEmployeeFields,
  kompetenzReviewerFields,
  handleChangePropKeyEmployee,
  handleChangePropKeyReviewer
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
        fields={
          isEmployee ? kompetenzEmployeeFields : kompetenzReviewerFields
        }
        type={'skillsInTheField'}
        handleChange={
          isEmployee ? handleChangePropKeyEmployee : handleChangePropKeyReviewer
        }
      />
      <Divider />
      <Typography variant="h5" className={classes.subCategoryTitle}>
        {intl.formatMessage({ id: 'scsheet.subtitle.impactonteam' })}
      </Typography>
      <ScRow
        fields={
          isEmployee ? kompetenzEmployeeFields : kompetenzReviewerFields
        }
        type={'impactOnTeam'}
        handleChange={
          isEmployee ? handleChangePropKeyEmployee : handleChangePropKeyReviewer
        }
      />
      <Divider />
      <Typography variant="h5" className={classes.subCategoryTitle}>
        {intl.formatMessage({ id: 'scsheet.subtitle.servicequality' })}
      </Typography>
      <ScRow
        fields={
          isEmployee ? kompetenzEmployeeFields : kompetenzReviewerFields
        }
        type={'serviceQuality'}
        handleChange={
          isEmployee ? handleChangePropKeyEmployee : handleChangePropKeyReviewer
        }
      />
      <Divider />
      <Typography variant="h5" className={classes.subCategoryTitle}>
        {intl.formatMessage({ id: 'scsheet.subtitle.impactoncompany' })}
      </Typography>
      <ScRow
        fields={
          isEmployee ? kompetenzEmployeeFields : kompetenzReviewerFields
        }
        type={'impactOnCompany'}
        handleChange={
          isEmployee ? handleChangePropKeyEmployee : handleChangePropKeyReviewer
        }
      />
    </Fragment>
  );
};

export default withRouter(injectIntl(withStyles(styles)(Skills)));
