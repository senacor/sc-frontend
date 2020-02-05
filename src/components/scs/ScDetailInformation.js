import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper/Paper';
import getDisplayName from '../../helper/getDisplayName';
import Grid from '@material-ui/core/Grid';
import { formatLocaleDateTime, FRONTEND_DATE_FORMAT } from '../../helper/date';
import { translateClassification } from '../../helper/string';
import { SC_STATUS } from '../../helper/scSheetData';

const styles = theme => ({
  spacing: {
    margin: 3 * theme.spacing.unit
  },
  saveBtn: {
    margin: 2 * theme.spacing.unit
  },
  root: {
    padding: 3 * theme.spacing.unit
  },
  avatar: {
    backgroundColor: theme.palette.primary[500]
  },
  heading: {
    flex: '1 1 auto'
  },
  names: {
    display: 'flex',
    '& p:not(:first-child)': {
      paddingLeft: theme.spacing.unit
    }
  }
});

const ScDetailInformation = ({ classes, sc, intl }) => {
  const { firstName, lastName } = sc.employee;

  const im = id =>
    intl.formatMessage({
      id: id
    });

  let mainContent = im('scdetailinformation.duedate') + ' ';
  mainContent += formatLocaleDateTime(sc.deadline, FRONTEND_DATE_FORMAT) + ', ';
  mainContent += im('scdetailinformation.department') + ': ';
  mainContent += sc.department;
  mainContent += sc.classification
    ? ', ' + im('scdetailinformation.classification') + ' '
    : '';
  mainContent += sc.classification
    ? im(translateClassification(sc.classification))
    : '';

  //Variant (with or without PR)
  let variantInfo;
  if (
    !sc.statusSet.includes(SC_STATUS.WITH_PR) &&
    !sc.statusSet.includes(SC_STATUS.WITHOUT_PR)
  ) {
    variantInfo = im('scdetailinformation.no.variant');
  } else {
    variantInfo = sc.statusSet.includes(SC_STATUS.WITH_PR)
      ? im('scdetailinformation.with.pr')
      : im('scdetailinformation.without.pr');
  }

  const supervisorAndReviewersText = () => {
    //Supervisor: Michal Beres,
    let resultText = `${im('sc.supervisor')} ${getDisplayName(
      sc.supervisor
    )}, `;

    //Supervisor: Michael Beres, Kein Reviewer
    if (!sc.reviewer1) {
      resultText += im('sc.no.reviewer');
      return resultText;
    }

    //Supervisor: Michael Beres, Beurteiler: Boris Kollar
    resultText += `${im('sc.reviewer')} ${getDisplayName(sc.reviewer1)}`;
    return resultText;
  };

  return (
    <Paper className={classes.spacing}>
      <div className={classes.root}>
        <Grid container alignItems="center" justify="center">
          <Grid item md={1} xs={3}>
            <Avatar className={classes.avatar}>
              {`${firstName.charAt(0)}${lastName.charAt(0)}`}
            </Avatar>
          </Grid>
          <Grid item md={9} xs={9}>
            <Typography variant="body2">
              {getDisplayName(sc.employee)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {variantInfo}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {mainContent}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {supervisorAndReviewersText()}
            </Typography>
          </Grid>
          <Grid item md={2} xs={12} />
        </Grid>
      </div>
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(ScDetailInformation));
