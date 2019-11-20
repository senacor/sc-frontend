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

const styles = theme => ({
  scRowContainer: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    transition: '0.3s',
    '&:hover': {
      transform: 'scale(1.01)',
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
    minHeight: 150
  }
});

const ScRow = memo(
  ({
    intl,
    classes,
    title,
    description,
    achievement,
    row,
    action,
    removeSubcategory,
    type
  }) => {
    return (
      <Fragment>
        <Paper className={classes.scRowContainer}>
          {(type === 'project' || type === 'dailyBusiness') && (
            <Tooltip
              title={intl.formatMessage({
                id: 'scsheet.tooltip.removeField'
              })}
            >
              <IconButton
                className={classes.removeIcon}
                onClick={() => removeSubcategory(type)}
              >
                <RemoveIcon />
              </IconButton>
            </Tooltip>
          )}
          <div className={classes.textsContainer}>
            <Grid container>
              <Grid item sm={6}>
                {type === 'dailyBusiness' || type === 'project' ? (
                  <TextField
                    type="text"
                    value={row.title}
                    margin="normal"
                    variant="outlined"
                    placeholder={intl.formatMessage({
                      id:
                        type === 'dailyBusiness'
                          ? 'scsheet.textheader.title.dailyBusiness'
                          : 'scsheet.textheader.title.project'
                    })}
                    fullWidth
                    onChange={e => {
                      action(type, 'title', e)}}
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
                    id="weight-label"
                    value={row.weight}
                    onChange={e => action(type, 'weight', e)}
                    renderValue={selected => <span>{selected}</span>}
                  >
                    {[1, 2, 3].map((val, index) => (
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
                <Typography variant="body2">{`${row.percentage} %`}</Typography>
              </Grid>
              <Grid item sm={2} className={classes.textCenter}>
                <ScRatingPoints
                  type={type}
                  rating={row.evaluation}
                  changeEvaluation={e => action(type, 'evaluation', e)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={8}>
              <Grid item sm={4}>
                <TextField
                  type="text"
                  value={row.description}
                  margin="normal"
                  variant="outlined"
                  placeholder={description}
                  rows={6}
                  multiline
                  fullWidth
                  InputProps={{ className: classes.input }}
                  onChange={e => action(type, 'description', e)}
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  type="text"
                  value={row.achievement}
                  margin="normal"
                  variant="outlined"
                  placeholder={achievement}
                  rows={6}
                  multiline
                  fullWidth
                  InputProps={{ className: classes.input }}
                  onChange={e => action(type, 'achievement', e)}
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  type="text"
                  value={row.comment}
                  margin="normal"
                  variant="outlined"
                  placeholder={intl.formatMessage({
                    id: 'scsheet.textarea.comment'
                  })}
                  rows={6}
                  multiline
                  fullWidth
                  InputProps={{ className: classes.input }}
                  onChange={e => action(type, 'comment', e)}
                />
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Fragment>
    );
  },
  (prevProps, nextProps) => prevProps.row === nextProps.row
);

export default injectIntl(withStyles(styles)(ScRow));
