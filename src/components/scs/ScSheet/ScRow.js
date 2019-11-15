import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import {
  Grid,
  IconButton,
  TextField,
  Tooltip,
  withStyles,
  Paper
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
  }
});

const ScRow = React.memo(
  ({ intl, classes, fields, action, removeSubcategory, type }) => {
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
                    <TextField
                      type="text"
                      defaultValue={field.title}
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
                  </Grid>
                  <Grid item sm={2}>
                    <TextField
                      type="number"
                      defaultValue={field.weight}
                      margin="normal"
                      variant="outlined"
                      label={intl.formatMessage({
                        id: 'scsheet.textheader.weight'
                      })}
                      fullWidth
                      className={classes.textarea}
                      onChange={e => action(type, index, 'weight', e)}
                    />
                  </Grid>
                  <Grid item sm={2}>
                    <TextField
                      type="number"
                      defaultValue={field.percentage}
                      margin="normal"
                      variant="outlined"
                      label={intl.formatMessage({
                        id: 'scsheet.textheader.percentage'
                      })}
                      fullWidth
                      className={classes.textarea}
                      onChange={e => action(type, index, 'percentage', e)}
                    />
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
                      defaultValue={field.description}
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
                      defaultValue={field.achievement}
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
                      defaultValue={field.comment}
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
  (prevProps, nextProps) => prevProps.show === nextProps.show
);

export default injectIntl(withStyles(styles)(ScRow));
