import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, TextField, Grid, IconButton } from '@material-ui/core';
import ScRatingPoints from '../ScRatingPoints';
import RemoveIcon from '@material-ui/icons/IndeterminateCheckBox';

const styles = theme => ({
  removeIcon: {
    position: 'absolute',
    right: 40
  },
  fieldContainer: {
    marginTop: 2 * theme.spacing.unit,
    marginBottom: 2 * theme.spacing.unit,
    background: theme.palette.secondary.brightGrey,
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
  changeHeadline,
  changeWeight,
  changePercentage,
  changeEvaluation,
  changeDescription,
  changeGoal,
  changeGoalComment,
  removeFields
}) => {
  console.log('fields', fields);
  return (
    <Fragment>
      {fields.map((field, index) => {
        return (
          <div key={index} className={classes.fieldContainer}>
            <IconButton
              className={classes.removeIcon}
              onClick={() => removeFields(index)}
            >
              <RemoveIcon />
            </IconButton>
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
                    onChange={e => changeHeadline(index, e)}
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
                    onChange={e => changeWeight(index, e)}
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
                    onChange={e => changePercentage(index, e)}
                  />
                </Grid>
                <Grid item sm={2} className={classes.textCenter}>
                  <ScRatingPoints
                    changeEvaluation={e => changeEvaluation(index, e)}
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
                    onChange={e => changeDescription(index, e)}
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
                    onChange={e => changeGoal(index, e)}
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
                    onChange={e => changeGoalComment(index, e)}
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
