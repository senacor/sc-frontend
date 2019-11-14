import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import {
  Grid,
  IconButton,
  TextField,
  Tooltip,
  withStyles
} from '@material-ui/core';
import ScRatingPoints from '../ScRatingPoints';
import RemoveIcon from '@material-ui/icons/IndeterminateCheckBox';

const styles = theme => ({
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

const ScRow = ({ intl, classes, fields, handleChange, removeFields, type }) => {
  return (
    <Fragment>
      {fields.map((field, index) => {
        return (
          <div key={index}>
            {(type === 'project' || type === 'dailyBusiness') && (
              <Tooltip
                title={intl.formatMessage({
                  id: 'scsheet.tooltip.removeField'
                })}
              >
                <IconButton
                  className={classes.removeIcon}
                  onClick={() => removeFields(type, index)}
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
                    onChange={e => handleChange(type, index, 'title', e)}
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    type="number"
                    value={field.weight}
                    margin="normal"
                    variant="outlined"
                    label={intl.formatMessage({
                      id: 'scsheet.textheader.weight'
                    })}
                    fullWidth
                    className={classes.textarea}
                    onChange={e => handleChange(type, index, 'weight', e)}
                  />
                </Grid>
                <Grid item sm={2}>
                  <TextField
                    disabled
                    type="number"
                    value={field.percentage}
                    margin="normal"
                    variant="outlined"
                    label={intl.formatMessage({
                      id: 'scsheet.textheader.percentage'
                    })}
                    fullWidth
                    className={classes.textarea}
                    onChange={e => handleChange(type, index, 'percentage', e)}
                  />
                </Grid>
                <Grid item sm={2} className={classes.textCenter}>
                  <ScRatingPoints
                    changeEvaluation={e =>
                      handleChange(type, index, 'evaluation', e)
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
                    onChange={e => handleChange(type, index, 'description', e)}
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
                    onChange={e => handleChange(type, index, 'achievement', e)}
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
                    onChange={e => handleChange(type, index, 'comment', e)}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(ScRow));
