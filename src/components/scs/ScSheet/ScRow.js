import React, { Fragment, memo } from 'react';
import { injectIntl } from 'react-intl';
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Close';
import { CATEGORY } from '../../../helper/scSheetData';
import ScRatingPoints from '../ScRatingPoints';

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
  captionContainer: {
    padding: 2 * theme.spacing.unit,
    paddingTop: 0,
    display: 'flex',
    justifyContent: 'end'
  },
  captionTitle: {
    marginTop: theme.spacing.unit
  },
  backgroundYellow: {
    backgroundColor: '#ffba0017'
  },
  backgroundGreen: {
    backgroundColor: '#01a68817'
  },
  backgroundGray: {
    backgroundColor: 'rgba(0, 0, 0, 0.13)'
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
  enterOnNewline: {
    whiteSpace: 'break-spaces'
  },
  captionGeneral: {
    borderStyle: 'solid',
    borderWidth: 1,
    marginRight: 2 * theme.spacing.unit,
    padding: 1.5 * theme.spacing.unit,
    borderRadius: 0.75 * theme.spacing.unit,
    marginLeft: 0.5 * theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  titleInput: {
    '& div > fieldset': {
      borderWidth: 0
    },
    '& div > input': {
      color: theme.palette.secondary.black
    }
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
    removable,
    isReviewer,
    isScEvaluated,
    handleChangeWeight
  }) => {
    const weightValues = [0.5, 1, 2, 3];

    const bgClass = state => {
      if (state === 'IMPORTED') return classes.backgroundGray;
      if (state === 'PUBLISHED') return classes.backgroundGreen;
      if (state === 'SAVED') return '';
      return classes.backgroundYellow;
    };

    return (
      <Fragment>
        <Paper className={classes.scRowContainer}>
          {(type === CATEGORY.PROJECT || type === CATEGORY.DAILY_BUSINESS) &&
            isReviewer &&
            removable && (
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
                    disabled
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
                    className={classes.titleInput}
                  />
                ) : (
                  <Typography variant="body1">{title}</Typography>
                )}
              </Grid>
              <Grid item sm={2} className={classes.percentage}>
                {isReviewer && (
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
                      onChange={e => handleChangeWeight(e.target.value)}
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
                )}
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
                  row.percentage ? row.percentage : 0
                } %`}</Typography>
              </Grid>
              <Grid item sm={2} className={classes.textCenter}>
                <ScRatingPoints
                  backgroundClass={bgClass(row.evaluation.state)}
                  fieldsDisabled={fieldsDisabled}
                  type={type}
                  rating={row.evaluation}
                  changeEvaluation={e => action(type, 'evaluation', e)}
                  isReviewer={isReviewer}
                  isScEvaluated={isScEvaluated}
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
                      <Typography component={'span'}>{description}</Typography>
                    </div>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item sm={12}>
                    <TextField
                      disabled={fieldsDisabled}
                      className={bgClass(row.comment.state)}
                      type="text"
                      value={row.comment.value}
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
                      <Typography>
                        {intl.formatMessage({
                          id: 'scsheet.textarea.description.basis'
                        })}
                      </Typography>
                      <Typography
                        component={'span'}
                        className={classes.enterOnNewline}
                      >
                        {description}
                      </Typography>
                    </div>
                  ) : (
                    <TextField
                      disabled={fieldsDisabled}
                      className={bgClass(row.description.state)}
                      type="text"
                      value={row.description.value}
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
                      className={bgClass(row.achievement.state)}
                      disabled={fieldsDisabled}
                      type="text"
                      value={row.achievement.value}
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
                    className={bgClass(row.comment.state)}
                    disabled={fieldsDisabled}
                    type="text"
                    value={row.comment.value}
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
          <div className={classes.captionContainer}>
            <div className={classes.captionTitle}>
              {intl.formatMessage({ id: 'scsheet.caption.title' })}
            </div>
            <div className={`${classes.captionGeneral}`}>
              {intl.formatMessage({ id: 'scsheet.caption.saved' })}
            </div>
            <div
              className={`${classes.captionGeneral} ${classes.backgroundGreen}`}
            >
              {intl.formatMessage({ id: 'scsheet.caption.publish' })}
            </div>
            <div
              className={`${classes.captionGeneral} ${
                classes.backgroundYellow
              }`}
            >
              {intl.formatMessage({ id: 'scsheet.caption.notsaved' })}
            </div>
            {isReviewer && (
              <div
                className={`${classes.captionGeneral} ${
                  classes.backgroundGray
                }`}
              >
                {intl.formatMessage({ id: 'scsheet.caption.imported' })}
              </div>
            )}
          </div>
        </Paper>
      </Fragment>
    );
  },
  (prevProps, nextProps) => prevProps.row === nextProps.row
);

export default injectIntl(withStyles(styles)(ScRow));
