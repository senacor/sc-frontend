import React, { Fragment, memo } from 'react';
import { injectIntl } from 'react-intl';
import {
  Grid,
  IconButton,
  TextField,
  Tooltip,
  withStyles,
  Paper,
  Typography,
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core';
import ScRatingPoints from '../ScRatingPoints';
import RemoveIcon from '@material-ui/icons/IndeterminateCheckBox';

const styles = theme => ({
  scRowContainer: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  removeIcon: {
    position: 'absolute',
    right: 40
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
  }
});

const ScRow = memo(
  ({ intl, classes, title, fields, action, removeSubcategory, type }) => {
    return (
      <Fragment>
        {fields.map((field, index) => {
          return (
            <Paper key={index} className={classes.scRowContainer}>
              {(type === 'project' || type === 'dailyBusiness') && (
                <Tooltip
                  title={intl.formatMessage({
                    id: 'scsheet.tooltip.removeField'
                  })}
                >
                  <IconButton
                    className={classes.removeIcon}
                    onClick={() => removeSubcategory(type, index)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Tooltip>
              )}
              <div className={classes.textsContainer}>
                <Grid container spacing={8}>
                  <Grid item sm={6}>
                    {type === 'dailyBusiness' || type === 'project' ? (
                      <TextField
                        type="text"
                        value={field.title}
                        margin="normal"
                        variant="outlined"
                        label={intl.formatMessage({
                          id:
                            type === 'dailyBusiness'
                              ? 'scsheet.textheader.title.dailyBusiness'
                              : 'scsheet.textheader.title.project'
                        })}
                        fullWidth
                        className={classes.textarea}
                        onChange={e => action(type, index, 'title', e)}
                      />
                    ) : (
                      <Typography variant="body1">{title}</Typography>
                    )}
                  </Grid>
                  <Grid item sm={2} className={classes.percentage}>
                    <FormControl>
                      <Select
                        value={field.weight}
                        onChange={e => action(type, index, 'weight', e)}
                      >
                        {['-', 1, 2, 3].map((val, index) => (
                          <MenuItem key={index} value={val}>
                            {val}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    sm={2}
                    component="div"
                    className={classes.percentage}
                  >
                    <Typography variant="body2">{`${
                      field.percentage
                    } %`}</Typography>
                  </Grid>
                  <Grid item sm={2} className={classes.textCenter}>
                    <ScRatingPoints
                      changeEvaluation={e =>
                        action(type, index, 'evaluation', e)
                      }
                      rating={fields.evaluation}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={8}>
                  <Grid item sm={4}>
                    <TextField
                      type="text"
                      value={field.description}
                      margin="normal"
                      variant="outlined"
                      label={intl.formatMessage({
                        id: 'scsheet.textarea.description'
                      })}
                      rows={3}
                      multiline
                      fullWidth
                      className={classes.textarea}
                      onChange={e => action(type, index, 'description', e)}
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <TextField
                      type="text"
                      value={field.achievement}
                      margin="normal"
                      variant="outlined"
                      label={intl.formatMessage({
                        id: 'scsheet.textarea.achievement'
                      })}
                      rows={3}
                      multiline
                      fullWidth
                      className={classes.textarea}
                      onChange={e => action(type, index, 'achievement', e)}
                    />
                  </Grid>
                  <Grid item sm={4}>
                    <TextField
                      type="text"
                      value={field.comment}
                      margin="normal"
                      variant="outlined"
                      label={intl.formatMessage({
                        id: 'scsheet.textarea.comment'
                      })}
                      rows={3}
                      multiline
                      fullWidth
                      className={classes.textarea}
                      onChange={e => action(type, index, 'comment', e)}
                    />
                  </Grid>
                </Grid>
              </div>
            </Paper>
          );
        })}
      </Fragment>
    );
  },
  (prevProps, nextProps) => prevProps.fields === nextProps.fields
);

export default injectIntl(withStyles(styles)(ScRow));
