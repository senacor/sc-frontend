import React, { Fragment, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import ScRow from '../ScRow';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { CATEGORY } from '../../../../helper/scSheetData';
import { Button } from '@material-ui/core';
import PercentageDialog from '../PercentageDialog';

const styles = theme => ({
  ...theme.styledComponents,
  addProjectButton: {
    color: theme.palette.secondary.yellow
  },
  whiteFont: {
    color: '#FFFFFF'
  },
  changeButton: {
    color: '#FFFFFF',
    backgroundColor: theme.palette.secondary.purple
  },
  container: {
    display: 'flex',
    alignItems: 'center'
  }
});

const PrCategories = React.memo(
  ({
    scId,
    classes,
    intl,
    skillsInTheFieldsFields,
    impactOnTeamFields,
    serviceQualityFields,
    impactOnCompanyFields,
    handleChangePrCategories,
    prCategoriesWeightPercentage,
    fieldsDisabled,
    isReviewer,
    handleChangeWeight
  }) => {
    const [percentageDialogOpened, setPercentageDialogOpened] = useState(false);

    const handlePercentageDialogOpen = () => {
      setPercentageDialogOpened(true);
    };

    const handlePercentageDialogClose = () => {
      setPercentageDialogOpened(false);
    };

    return (
      <Fragment>
        <Grid
          container
          className={`${classes.categoryTitle} ${classes.container}`}
        >
          <Fragment>
            <Grid item xs={10}>
              <Typography variant="h5" className={classes.whiteFont}>
                {intl.formatMessage({ id: 'scsheet.category.skills' })}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography
                className={classes.whiteFont}
              >{`${prCategoriesWeightPercentage}%`}</Typography>
            </Grid>
            <Grid item xs={1}>
              <Button
                className={classes.changeButton}
                onClick={handlePercentageDialogOpen}
              >
                {intl.formatMessage({ id: 'percentagedialog.change' })}
              </Button>
            </Grid>
          </Fragment>
        </Grid>
        <ScRow
          isReviewer={isReviewer}
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
          handleChangeWeight={value =>
            handleChangeWeight(value, CATEGORY.SKILLS_IN_THE_FIELDS)
          }
        />
        <Divider />
        <ScRow
          isReviewer={isReviewer}
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
          handleChangeWeight={value =>
            handleChangeWeight(value, CATEGORY.TEAM_IMPACT)
          }
        />
        <Divider />
        <ScRow
          isReviewer={isReviewer}
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
          handleChangeWeight={value =>
            handleChangeWeight(value, CATEGORY.SERVICE_QUALITY)
          }
        />
        <Divider />
        <ScRow
          isReviewer={isReviewer}
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
          handleChangeWeight={value =>
            handleChangeWeight(value, CATEGORY.COMPANY_IMPACT)
          }
        />
        <PercentageDialog
          open={percentageDialogOpened}
          scId={scId}
          prCategoriesWeightPercentage={prCategoriesWeightPercentage}
          handleClose={handlePercentageDialogClose}
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
