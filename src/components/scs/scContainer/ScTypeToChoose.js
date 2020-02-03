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
  Grid,
  Tooltip,
  InputLabel
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
  },
  tableCell: {
    padding: 0
  },
  textField: {
    width: '100%'
  },
  boldText: {
    fontWeight: 'bold'
  },
  tableDiv: {
    marginTop: 2 * theme.spacing.unit
  },
  input: {
    color: theme.palette.secondary.darkGrey
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
  const [dailyBusinessWeight, setDailyBusinessWeight] = useState(0);
  const [projectValue, setProjectValue] = useState('');
  const [projectWeight, setProjectWeight] = useState(0);

  const user = useUserinfoContext();

  const handleDailyBusinessChange = event => {
    setDailyBusinessValue(event.target.value);
  };

  const handleProjectChange = event => {
    setProjectValue(event.target.value);
  };

  const addDailyBusiness = () => {
    const newDailyBusinesses = [...dailyBusinesses];
    newDailyBusinesses.push({
      title: dailyBusinessValue.trim(),
      weight: dailyBusinessWeight
    });
    setDailyBusinesses(newDailyBusinesses);
    setDailyBusinessValue('');
    setDailyBusinessWeight(0);
  };

  const addProject = () => {
    const newProjects = [...projects];
    newProjects.push({
      title: projectValue.trim(),
      weight: projectWeight
    });
    setProjects(newProjects);
    setProjectValue('');
    setProjectWeight(0);
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

  const submitDisabled =
    !scTypeSelected ||
    !classification ||
    dailyBusinesses.length < 1 ||
    projects.length < 1;

  const submitButton = (
    <Button
      disabled={submitDisabled}
      onClick={handleSubmitScType}
      color="secondary"
      variant="contained"
      className={classes.submitScType}
    >
      {intl.formatMessage({ id: 'scsheet.submit' })}
    </Button>
  );

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
      <div className={classes.tableDiv}>
        <Grid container>
          <Grid item xs={6}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography className={classes.boldText}>
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
                    <TableRow key={idx}>
                      <TableCell>
                        <Typography>{entry.title}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{entry.weight}</Typography>
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
                  <TableCell className={classes.tableCell}>
                    <TextField
                      className={classes.textField}
                      value={dailyBusinessValue}
                      onChange={handleDailyBusinessChange}
                    />
                  </TableCell>
                  <FormControl>
                    <InputLabel id="weight-daily-business-input">
                      {intl.formatMessage({
                        id: 'scsheet.textheader.weight'
                      })}
                    </InputLabel>
                    <Select
                      id="weight-daily-business-input"
                      value={dailyBusinessWeight}
                      onChange={e => setDailyBusinessWeight(e.target.value)}
                      renderValue={selected => <span>{selected}</span>}
                      inputProps={{ className: classes.input }}
                    >
                      {[1, 2, 3].map((val, index) => (
                        <MenuItem key={index} value={val}>
                          {val}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TableCell>
                    <Button
                      disabled={
                        !dailyBusinessValue.trim() || dailyBusinessWeight === 0
                      }
                      variant="contained"
                      color="primary"
                      onClick={addDailyBusiness}
                    >
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
                    <Typography className={classes.boldText}>
                      {intl.formatMessage({
                        id: 'scsheet.subtitle.project'
                      })}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((entry, idx) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell>
                        <Typography>{entry.title}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{entry.weight}</Typography>
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
                  <TableCell className={classes.tableCell}>
                    <TextField
                      className={classes.textField}
                      value={projectValue}
                      onChange={handleProjectChange}
                    />
                  </TableCell>
                  <FormControl>
                    <InputLabel id="weight-project-input">
                      {intl.formatMessage({
                        id: 'scsheet.textheader.weight'
                      })}
                    </InputLabel>
                    <Select
                      id="weight-project-input"
                      value={projectWeight}
                      onChange={e => setProjectWeight(e.target.value)}
                      renderValue={selected => <span>{selected}</span>}
                      inputProps={{ className: classes.input }}
                    >
                      {[1, 2, 3].map((val, index) => (
                        <MenuItem key={index} value={val}>
                          {val}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TableCell>
                    <Button
                      disabled={!projectValue.trim() || projectWeight === 0}
                      variant="contained"
                      color="primary"
                      onClick={addProject}
                    >
                      {intl.formatMessage({ id: 'sctypetochoose.add' })}
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
        {submitDisabled ? (
          <Tooltip title={intl.formatMessage({ id: 'sctypetochoose.tooltip' })}>
            <span>{submitButton}</span>
          </Tooltip>
        ) : (
          submitButton
        )}
      </div>
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(ScTypeToChoose));
