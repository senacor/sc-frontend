import React, { Fragment, memo } from 'react';
import { injectIntl } from 'react-intl';
import {
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Paper,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ScRatingPoints from '../ScRatingPoints';
import RemoveIcon from '@material-ui/icons/Close';
import { CATEGORY } from '../../../helper/scSheetData';

const styles = theme => ({
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

const ScRow = memo(
  ({
    intl,
    classes,
    index,
    title,
    description,
    achievement,
    row,
    action,
    type,
    fieldsDisabled,
    removeSubcategory,
    canRemoveGoal
  }) => {

    const weightValues =
      type === CATEGORY.SKILLS_IN_THE_FIELDS ||
      type === CATEGORY.TEAM_IMPACT ||
      type === CATEGORY.SERVICE_QUALITY ||
      type === CATEGORY.COMPANY_IMPACT
        ? [0.5, 1, 2, 3]
        : [1, 2, 3];

    return (
      <Fragment>
        <Paper className={classes.scRowContainer}>
          {(type === CATEGORY.PROJECT || type === CATEGORY.DAILY_BUSINESS) && canRemoveGoal && (
              <Tooltip
                title={intl.formatMessage({
                  id: 'scsheet.tooltip.removeField'
                })}
              >
                <IconButton
                  className={
                    fieldsDisabled ? classes.hidden : classes.removeIcon
                  }
                  onClick={() => removeSubcategory(type, index)}
                >
                  <RemoveIcon />
                </IconButton>
              </Tooltip>
            )}
          <div className={classes.textsContainer}>
            <Grid container>
              <Grid item sm={6}>
                {type === CATEGORY.DAILY_BUSINESS ||
                type === CATEGORY.PROJECT ? (
                  <TextField
                    required
                    disabled={fieldsDisabled}
                    type="text"
                    value={row.title}
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
                    inputProps={{ className: classes.input }}
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
                    disabled={fieldsDisabled}
                    id="weight-label"
                    value={row.weight}
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
                  row.percentage
                } %`}</Typography>
              </Grid>
              <Grid item sm={2} className={classes.textCenter}>
                <ScRatingPoints
                  fieldsDisabled={fieldsDisabled}
                  type={type}
                  rating={row.evaluation}
                  changeEvaluation={e => action(type, 'evaluation', e)}
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
                    <TextField
                      disabled={fieldsDisabled}
                      type="text"
                      value={row.comment}
                      margin="normal"
                      variant="outlined"
                      label={intl.formatMessage({
                        id: 'scsheet.textarea.comment'
                      })}
                      rows={5}
                      multiline
                      fullWidth
                      inputProps={{ className: classes.input }}
                      onChange={e => action(type, 'comment', e)}
                    />
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
                    <TextField
                      disabled={fieldsDisabled}
                      type="text"
                      value={row.description}
                      margin="normal"
                      variant="outlined"
                      label={description}
                      rows={6}
                      multiline
                      fullWidth
                      inputProps={{ className: classes.input }}
                      onChange={e => action(type, 'description', e)}
                    />
                  )}
                </Grid>
                {type === CATEGORY.WORK_EFFICIENCY ||
                type === CATEGORY.WORK_QUALITY ? null : (
                  <Grid item sm={4}>
                    <TextField
                      disabled={fieldsDisabled}
                      type="text"
                      value={row.achievement}
                      margin="normal"
                      variant="outlined"
                      label={achievement}
                      rows={6}
                      multiline
                      fullWidth
                      inputProps={{ className: classes.input }}
                      onChange={e => action(type, 'achievement', e)}
                    />
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
                  <TextField
                    disabled={fieldsDisabled}
                    type="text"
                    value={row.comment}
                    margin="normal"
                    variant="outlined"
                    label={intl.formatMessage({
                      id: 'scsheet.textarea.comment'
                    })}
                    rows={6}
                    multiline
                    fullWidth
                    inputProps={{ className: classes.input }}
                    onChange={e => action(type, 'comment', e)}
                  />
                </Grid>
              </Grid>
            )}
          </div>
        </Paper>
      </Fragment>
    );
  },
  (prevProps, nextProps) => prevProps.row === nextProps.row
);

export default injectIntl(withStyles(styles)(ScRow));
