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
  fieldContainerDailyBusiness: {
    marginTop: 2 * theme.spacing.unit,
    marginBottom: 2 * theme.spacing.unit,
    background: theme.palette.secondary.brightGrey,
    borderRadius: 3
  },
  fieldContainerProject: {
    marginTop: 2 * theme.spacing.unit,
    marginBottom: 2 * theme.spacing.unit,
    background: theme.palette.secondary.brighterGreen,
    borderRadius: 3
  },
  textsContainer: {
    padding: theme.spacing.unit * 2
  },
  textArea: {},
  textCenter: {
    textAlign: 'center',
    margin: 'auto'
  }
});

const ScFields = ({
  intl,
  classes,
  fields,
  handleChange,
  removeFields,
  type
}) => {
  const containerClass =
    type === 'dailyBusiness'
      ? classes.fieldContainerDailyBusiness
      : classes.fieldContainerProject;
  return (
    <Fragment>
      {fields.map((field, index) => {
        return (
          <div key={index} className={containerClass}>
            <Tooltip
              title={intl.formatMessage({ id: 'scsheet.tooltip.removeField' })}
            >
              <IconButton
                className={classes.removeIcon}
                onClick={() => removeFields(type, index)}
              >
                <RemoveIcon />
              </IconButton>
            </Tooltip>
            <div className={classes.textsContainer}>
              <Grid container spacing={8}>
                <Grid item sm={6}>
                  <TextField
                    type="text"
                    value={field.headline}
                    margin="normal"
                    variant="outlined"
                    label={intl.formatMessage({
                      id: 'scsheet.textheader.headline'
                    })}
                    fullWidth
                    className={classes.textarea}
                    onChange={e => handleChange(type, index, 'headline', e)}
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
                    value={field.goal}
                    margin="normal"
                    variant="outlined"
                    label={intl.formatMessage({ id: 'scsheet.textarea.goal' })}
                    rows={3}
                    multiline
                    fullWidth
                    className={classes.textarea}
                    onChange={e => handleChange(type, index, 'goal', e)}
                  />
                </Grid>
                <Grid item sm={4}>
                  <TextField
                    type="text"
                    value={field.goalComment}
                    margin="normal"
                    variant="outlined"
                    label={intl.formatMessage({
                      id: 'scsheet.textarea.goalcomment'
                    })}
                    rows={3}
                    multiline
                    fullWidth
                    className={classes.textarea}
                    onChange={e => handleChange(type, index, 'goalComment', e)}
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

export default injectIntl(withStyles(styles)(ScFields));
