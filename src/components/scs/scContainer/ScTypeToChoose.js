import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  withStyles
} from '@material-ui/core';
import { classifications, SC_STATUS } from '../../../helper/scSheetData';
import { translateClassification } from '../../../helper/string';
import { useUserinfoContext } from '../../../helper/contextHooks';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/AddBox';

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
    margin: 2 * theme.spacing.unit
  },
  tableCell: {
    padding: 0,
    paddingLeft: 1.5 * theme.spacing.unit,
    borderBottom: 0
  },
  tableCellNoBorder: {
    border: 0
  },
  textField: {
    width: '100%',
    top: 1 * theme.spacing.unit
  },
  weightForm: {
    marginLeft: 2 * theme.spacing.unit
  },
  tableRow: {
    paddingTop: 1 * theme.spacing.unit,
    paddingBottom: 1 * theme.spacing.unit
  },
  boldText: {
    fontWeight: 'bold'
  },
  tableDiv: {
    marginTop: 2 * theme.spacing.unit
  },
  input: {
    color: theme.palette.secondary.darkGrey
  },
  categoryFormsRow: {
    paddingBottom: 2 * theme.spacing.unit,
    paddingTop: 2 * theme.spacing.unit
  },
  textFieldInput: {
    height: 0,
    width: '16rem'
  },
  noBorders: {
    border: 'none'
  },
  noPadding: {
    padding: 0
  },
  noRightPadding: {
    paddingRight: 0
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
  const user = useUserinfoContext();

  useEffect(() => {
    setDailyBusinesses([{ title: '', weight: 0 }]);
    setProjects([{ title: '', weight: 0 }]);
  }, []);

  const addDailyBusiness = () => {
    const newDailyBusinesses = [...dailyBusinesses];
    newDailyBusinesses.push({
      title: '',
      weight: 0
    });
    setDailyBusinesses(newDailyBusinesses);
  };

  const addProject = () => {
    const newProjects = [...projects];
    newProjects.push({
      title: '',
      weight: 0
    });
    setProjects(newProjects);
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

  const onChangeDailyBusinessTitle = (idx, event) => {
    const newDailyBusinesses = [...dailyBusinesses];
    newDailyBusinesses[idx].title = event.target.value;
    setDailyBusinesses(newDailyBusinesses);
  };

  const setDailyBusinessWeight = (idx, event) => {
    const newDailyBusinesses = [...dailyBusinesses];
    newDailyBusinesses[idx].weight = event.target.value;
    setDailyBusinesses(newDailyBusinesses);
  };

  const onChangeProjectTitle = (idx, event) => {
    const newProjects = [...projects];
    newProjects[idx].title = event.target.value;
    setProjects(newProjects);
  };

  const setProjectWeight = (idx, event) => {
    const newProjects = [...projects];
    newProjects[idx].weight = event.target.value;
    setProjects(newProjects);
  };

  const containsEmptyValues = array => {
    const entryWithEmptyValues = array.find(
      entry => entry.title.trim() === '' || entry.weight === 0
    );

    return Boolean(entryWithEmptyValues);
  };

  const submitDisabled =
    !scTypeSelected ||
    !classification ||
    dailyBusinesses.length < 1 ||
    projects.length < 1 ||
    containsEmptyValues(dailyBusinesses) ||
    containsEmptyValues(projects);

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
                {intl.formatMessage({ id: translateClassification(pos) })}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={classes.tableDiv}>
        <Grid container>
          <Grid item xs={6}>
            <Table style={{ marginRight: 35 }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography className={classes.boldText}>
                      {intl.formatMessage({
                        id: 'scsheet.subtitle.dailyBusiness'
                      })}
                    </Typography>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {dailyBusinesses.map((entry, idx) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell
                        className={`${classes.noBorders} ${classes.noPadding}`}
                      >
                        <TextField
                          variant="outlined"
                          inputProps={{ className: classes.textFieldInput }}
                          onChange={event =>
                            onChangeDailyBusinessTitle(idx, event)
                          }
                          value={entry.title}
                        />
                      </TableCell>
                      <TableCell
                        className={`${classes.noBorders} ${
                          classes.noRightPadding
                        }`}
                      >
                        <FormControl className={classes.weightForm}>
                          <InputLabel id="weight-daily-business-input">
                            {intl.formatMessage({
                              id: 'scsheet.textheader.weight'
                            })}
                          </InputLabel>
                          <Select
                            id="weight-daily-business-input"
                            value={dailyBusinesses[idx].weight}
                            onChange={event =>
                              setDailyBusinessWeight(idx, event)
                            }
                            renderValue={selected => <span>{selected}</span>}
                            inputProps={{ className: classes.input }}
                          >
                            {[0.5, 1, 2, 3].map((val, index) => (
                              <MenuItem key={index} value={val}>
                                {val}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell className={classes.noBorders}>
                        <IconButton onClick={() => deleteDailyBusiness(idx)}>
                          <Icon>clear</Icon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Tooltip
              title={intl.formatMessage({ id: 'sctypetochoose.addfield' })}
            >
              <IconButton onClick={addDailyBusiness}>
                <AddIcon />
              </IconButton>
            </Tooltip>
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
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((entry, idx) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell
                        className={`${classes.noBorders} ${classes.noPadding}`}
                      >
                        <TextField
                          variant="outlined"
                          inputProps={{ className: classes.textFieldInput }}
                          onChange={event => onChangeProjectTitle(idx, event)}
                          value={entry.title}
                        />
                      </TableCell>
                      <TableCell
                        className={`${classes.noBorders} ${
                          classes.noRightPadding
                        }`}
                      >
                        <FormControl className={classes.weightForm}>
                          <InputLabel id="weight-project-input">
                            {intl.formatMessage({
                              id: 'scsheet.textheader.weight'
                            })}
                          </InputLabel>
                          <Select
                            id="weight-procet-input"
                            value={projects[idx].weight}
                            onChange={event => setProjectWeight(idx, event)}
                            renderValue={selected => <span>{selected}</span>}
                            inputProps={{ className: classes.input }}
                          >
                            {[0.5, 1, 2, 3].map((val, index) => (
                              <MenuItem key={index} value={val}>
                                {val}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell className={classes.noBorders}>
                        <IconButton onClick={() => deleteProject(idx)}>
                          <Icon>clear</Icon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Tooltip
              title={intl.formatMessage({ id: 'sctypetochoose.addfield' })}
            >
              <IconButton onClick={addProject}>
                <AddIcon />
              </IconButton>
            </Tooltip>
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
