import React, { useState } from 'react';
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
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  IconButton,
  Grid
} from '@material-ui/core';
import { SC_STATUS, classifications } from '../../../helper/scSheetData';
import { modifyString } from '../../../helper/string';
import { useUserinfoContext } from '../../../helper/contextHooks';
import Icon from '@material-ui/core/Icon';

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
  classification,
  handleChangeClassification,
  handleChangeType,
  scTypeSelected,
  handleSubmitScType,
  dailyBusinesses,
  setDailyBusinesses,
  projects,
  setProjects
}) => {
  const [dailyBusinessValue, setDailyBusinessValue] = useState('');
  const [projectValue, setProjectValue] = useState('');

  const user = useUserinfoContext();

  const handleDailyBusinessChange = event => {
    setDailyBusinessValue(event.target.value);
  };

  const handleProjectChange = event => {
    setProjectValue(event.target.value);
  };

  const addDailyBusiness = () => {
    if (!dailyBusinessValue.trim()) {
      return;
    }
    const newDailyBusinesses = [...dailyBusinesses];
    newDailyBusinesses.push(dailyBusinessValue.trim());
    setDailyBusinesses(newDailyBusinesses);
    setDailyBusinessValue('');
  };

  const addProject = () => {
    if (!projectValue.trim()) {
      return;
    }
    const newProjects = [...projects];
    newProjects.push(projectValue.trim());
    setProjects(newProjects);
    setProjectValue('');
  };

  const deleteDailyBusiness = idx => {
    const newDailyBusinesses = [...dailyBusinesses];
    newDailyBusinesses.splice(idx, 1);
    setDailyBusinesses(newDailyBusinesses);
  };

  const deleteProject = idx => {
    const newProjects = [...projects];
    newProjects.splice(idx, 1);
    setProjects(newProjects);
  };

  return (
    <Paper className={classes.chooseScType}>
      <Typography variant="h5" className={classes.scTypeSelectionHeader}>
        {intl.formatMessage({ id: 'scsheet.typeSelectionHeader' })}
      </Typography>
      <div className={classes.dropdownContainer}>
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
        <FormControl className={classes.formControl}>
          <FormLabel component="legend">
            {intl.formatMessage({ id: 'scsheet.classification' })}
          </FormLabel>
          <Select
            labelid="demo-simple-select-label"
            id="demo-simple-select"
            value={classification}
            disabled={!user.isReviewerInSc(sc)}
            onChange={handleChangeClassification}
          >
            {classifications.map((pos, index) => (
              <MenuItem key={index} value={pos.toUpperCase()}>
                {modifyString(pos)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <Grid container>
          <Grid item xs={6}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography>
                      {intl.formatMessage({
                        id: 'scsheet.subtitle.dailyBusiness'
                      })}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dailyBusinesses.map((entry, idx) => {
                  return (
                    <TableRow>
                      <TableCell>
                        <Typography>{entry}</Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => deleteDailyBusiness(idx)}>
                          <Icon>clear</Icon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell>
                    <TextField
                      value={dailyBusinessValue}
                      onChange={handleDailyBusinessChange}
                    />
                    <Button onClick={addDailyBusiness}>
                      {intl.formatMessage({ id: 'sctypetochoose.add' })}
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={6}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography>
                      {intl.formatMessage({ id: 'scsheet.subtitle.project' })}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((entry, idx) => {
                  return (
                    <TableRow>
                      <TableCell>
                        <Typography>{entry}</Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => deleteProject(idx)}>
                          <Icon>clear</Icon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell>
                    <TextField
                      value={projectValue}
                      onChange={handleProjectChange}
                    />
                    <Button onClick={addProject}>
                      {intl.formatMessage({ id: 'sctypetochoose.add' })}
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
        <Button
          disabled={
            !scTypeSelected ||
            !classification ||
            dailyBusinesses.length < 1 ||
            projects.length < 1
          }
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
