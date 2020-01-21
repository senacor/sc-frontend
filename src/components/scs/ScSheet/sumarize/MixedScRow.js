import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { CATEGORY } from '../../../../helper/scSheetData';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import SummaryScRatingPoints from './SummaryScRatingPoints';

const styles = theme => ({
  titleInput: {
    '& div > fieldset': {
      borderWidth: 0
    },
    '& div > input': {
      color: theme.palette.secondary.black
    }
  },
  scRowContainer: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    transition: '0.2s',
    '&:hover': {
      border: `1px solid ${theme.palette.secondary.main}`,
      background: theme.palette.secondary.brighterGrey
    }
  },
  removeIcon: {
    position: 'relative',
    float: 'right'
  },
  textsContainer: {
    padding: theme.spacing.unit * 2
  },
  padding: {
    padding: theme.spacing.unit
  },
  textBasis: {
    paddingBottom: theme.spacing.unit
  },
  textCenter: {
    textAlign: 'center',
    margin: 'auto'
  },
  percentage: {
    margin: 'auto',
    textAlign: 'center'
  },
  percentageText: {
    paddingBottom: theme.spacing.unit
  },
  input: {
    color: theme.palette.secondary.darkGrey
  },
  hidden: {
    display: 'none'
  }
});

const MixedScRow = ({
  intl,
  classes,
  index,
  title,
  description,
  achievement,
  rowReviewer,
  rowEmployee,
  action,
  removeSubcategory,
  type
}) => {
  const weightValues =
    type === CATEGORY.SKILLS_IN_THE_FIELDS ||
    type === CATEGORY.TEAM_IMPACT ||
    type === CATEGORY.SERVICE_QUALITY ||
    type === CATEGORY.COMPANY_IMPACT
      ? [0.5, 1, 2, 3]
      : [1, 2, 3];

  const mergedCell = (header, valueReviewer, valueEmployee) => {
    const reviewerText = valueReviewer ? 'Beurteiler: \n' + valueReviewer : '';
    const employeeText = valueEmployee ? 'Mitarbeiter: \n' + valueEmployee : '';
    return (
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {header}
          </ListSubheader>
        }
        component="nav"
        className={classes.root}
        aria-label="mailbox folders"
      >
        <ListItem>
          <ListItemText
            style={{ whiteSpace: 'pre-line' }}
            primary={reviewerText}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            style={{ whiteSpace: 'pre-line' }}
            primary={employeeText}
          />
        </ListItem>
      </List>
    );
  };

  return (
    <Fragment>
      <Paper className={classes.scRowContainer}>
        <div className={classes.textsContainer}>
          <Grid container>
            <Grid item sm={6}>
              {type === CATEGORY.DAILY_BUSINESS || type === CATEGORY.PROJECT ? (
                <TextField
                  disabled
                  type="text"
                  value={rowReviewer.title}
                  margin="normal"
                  variant="outlined"
                  label={intl.formatMessage({
                    id:
                      type === CATEGORY.DAILY_BUSINESS
                        ? 'scsheet.textheader.title.dailyBusiness'
                        : 'scsheet.textheader.title.project'
                  })}
                  fullWidth
                  onChange={e => {
                    action(type, 'title', e);
                  }}
                  className={classes.titleInput}
                />
              ) : (
                <Typography variant="body1">{title}</Typography>
              )}
            </Grid>
            <Grid item sm={2} className={classes.percentage}>
              <FormControl>
                <InputLabel id="weight-label">
                  {intl.formatMessage({
                    id: 'scsheet.textheader.weight'
                  })}
                </InputLabel>
                <Select
                  disabled
                  id="weight-label"
                  value={rowReviewer.weight}
                  onChange={e => action(type, 'weight', e)}
                  renderValue={selected => <span>{selected}</span>}
                  inputProps={{ className: classes.input }}
                >
                  {weightValues.map((val, index) => (
                    <MenuItem key={index} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={2} component="div" className={classes.percentage}>
              <Typography
                variant="caption"
                color="textSecondary"
                className={classes.percentageText}
              >
                {intl.formatMessage({
                  id: 'scsheet.textheader.percentage'
                })}
              </Typography>
              <Typography variant="body2" className={classes.input}>{`${
                rowReviewer.percentage
              } %`}</Typography>
            </Grid>
            <Grid item sm={2} className={classes.textCenter}>
              <SummaryScRatingPoints
                type={type}
                ratingReviewer={rowReviewer.evaluation}
                ratingEmployee={rowEmployee.evaluation}
              />
            </Grid>
          </Grid>
          {type === CATEGORY.SKILLS_IN_THE_FIELDS ||
          type === CATEGORY.TEAM_IMPACT ||
          type === CATEGORY.SERVICE_QUALITY ||
          type === CATEGORY.COMPANY_IMPACT ? (
            <Fragment>
              <Grid container>
                <Grid item sm={12}>
                  <div className={classes.padding}>
                    <Typography>{description}</Typography>
                  </div>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item sm={12}>
                  {mergedCell(
                    'Kommentar',
                    rowReviewer.comment,
                    rowEmployee.comment
                  )}
                </Grid>
              </Grid>
            </Fragment>
          ) : (
            <Grid container spacing={8}>
              <Grid item sm={4}>
                {type === CATEGORY.WORK_EFFICIENCY ||
                type === CATEGORY.WORK_QUALITY ? (
                  <div className={classes.padding}>
                    <Typography className={classes.textBasis}>
                      {intl.formatMessage({
                        id: 'scsheet.textarea.description.basis'
                      })}
                    </Typography>
                    <Typography>{description}</Typography>
                  </div>
                ) : (
                  mergedCell(
                    'Beschreibung',
                    rowReviewer.description,
                    rowEmployee.description
                  )
                )}
              </Grid>
              {type === CATEGORY.WORK_EFFICIENCY ||
              type === CATEGORY.WORK_QUALITY ? null : (
                <Grid item sm={4}>
                  {mergedCell(
                    'Zielvorgabe',
                    rowReviewer.achievement,
                    rowEmployee.achievement
                  )}
                </Grid>
              )}
              <Grid
                item
                sm={
                  type === CATEGORY.WORK_EFFICIENCY ||
                  type === CATEGORY.WORK_QUALITY
                    ? 8
                    : 4
                }
              >
                {mergedCell(
                  'Kommentar',
                  rowReviewer.comment,
                  rowEmployee.comment
                )}
              </Grid>
            </Grid>
          )}
        </div>
      </Paper>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(MixedScRow));
