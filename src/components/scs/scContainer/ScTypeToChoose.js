import React from 'react';
import { injectIntl } from 'react-intl';
import {
  withStyles,
  Paper,
  Typography,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button
} from '@material-ui/core';
import { SC_STATUS } from '../../../helper/scSheetData';
import { modifyString } from '../../../helper/string';
import { useUserinfoContext } from '../../../helper/contextHooks';
import { positions } from '../../../helper/filterData';

const styles = theme => ({
  ...theme.styledComponents,
  chooseScType: {
    backgroundColor: theme.palette.secondary.white,
    margin: 3 * theme.spacing.unit,
    padding: theme.spacing.unit
  },
  scTypeSelectionHeader: {
    background: theme.palette.secondary.darkGreen,
    color: theme.palette.secondary.white,
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2
  },
  dropdownContainer: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  formControl: {
    minWidth: 180
  },
  radioGroup: {
    display: 'inline-block'
  },
  submitScType: {
    height: 40,
    marginTop: 'auto',
    marginBottom: 'auto'
  }
});

const ScTypeToChoose = ({
  classes,
  intl,
  sc,
  position,
  handleChangePosition,
  handleChangeType,
  scTypeSeleted,
  handleSubmitScType
}) => {
  const user = useUserinfoContext();
  return (
    <Paper className={classes.chooseScType}>
      <Typography variant="h5" className={classes.scTypeSelectionHeader}>
        {intl.formatMessage({ id: 'scsheet.typeSelectionHeader' })}
      </Typography>
      <div className={classes.dropdownContainer}>
        <FormControl className={classes.formControl}>
          <FormLabel component="legend">
            {intl.formatMessage({ id: 'scsheet.position' })}
          </FormLabel>
          <Select
            labelid="demo-simple-select-label"
            id="demo-simple-select"
            value={position}
            disabled={!user.isReviewerInSc(sc)}
            onChange={handleChangePosition}
          >
            {positions.map((pos, index) => (
              <MenuItem key={index} value={pos.toUpperCase()}>
                {modifyString(pos)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <FormLabel component="legend">
            {intl.formatMessage({ id: 'scsheet.sctype' })}
          </FormLabel>
          <RadioGroup
            aria-label="sc-type"
            name="sc-type-radios"
            onChange={handleChangeType}
            className={classes.radioGroup}
          >
            <FormControlLabel
              value={SC_STATUS.WITH_PR}
              control={<Radio />}
              label={intl.formatMessage({ id: 'scsheet.sctype.withPR' })}
            />
            <FormControlLabel
              value={SC_STATUS.WITHOUT_PR}
              control={<Radio />}
              label={intl.formatMessage({
                id: 'scsheet.sctype.withoutPR'
              })}
            />
          </RadioGroup>
        </FormControl>
        <Button
          disabled={!scTypeSeleted || !position}
          onClick={handleSubmitScType}
          color="secondary"
          variant="contained"
          className={classes.submitScType}
        >
          {intl.formatMessage({ id: 'scsheet.submit' })}
        </Button>
      </div>
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(ScTypeToChoose));
