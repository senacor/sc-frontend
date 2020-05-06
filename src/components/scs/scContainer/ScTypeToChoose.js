import React, { Fragment, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Popover,
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
import {
  useErrorContext,
  useUserinfoContext
} from '../../../helper/contextHooks';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/AddBox';
import EmployeeImportScsDialog from './importSc/EmployeeImportScsDialog';
import { getAllEmployeesForImport } from '../../../calls/employees';
import ConfirmDialog from '../../utils/ConfirmDialog';
import CheckIcon from '@material-ui/icons/Check';

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
  btnClear: {
    color: theme.palette.secondary.darkGrey,
    paddingLeft: theme.spacing.unit,
    '&:hover': {
      transform: 'scale(1.30)',
      color: theme.palette.secondary.darkRed,
      transition: 'all 0.3s'
    }
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
  },
  captionContainer: {
    padding: 2 * theme.spacing.unit,
    paddingTop: 0,
    display: 'flex',
    justifyContent: 'end'
  },
  captionTitle: {
    marginTop: theme.spacing.unit
  },
  captionGeneral: {
    borderStyle: 'solid',
    borderWidth: 1,
    marginRight: 2 * theme.spacing.unit,
    padding: 1.5 * theme.spacing.unit,
    borderRadius: 0.75 * theme.spacing.unit,
    marginLeft: 0.5 * theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  backgroundYellow: {
    backgroundColor: '#ffba0017'
  },
  backgroundGray: {
    backgroundColor: 'rgba(0, 0, 0, 0.13)'
  },
  smallLeftMargin: {
    marginLeft: 4
  },
  smallLeftPadding: {
    paddingLeft: 4
  }
});

const ScTypeToChoose = ({
  classes,
  intl,
  sc,
  classification,
  setClassification,
  handleChangeType,
  scTypeSelected,
  handleSubmitScType,
  handleSaveInit,
  dailyBusinesses,
  setDailyBusinesses,
  projects,
  setProjects,
  importSc
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [fieldsState, setFieldsState] = useState(null);
  const [importFromDialogOpen, setImportFromDialogOpen] = useState(false);
  const [importAction, setImportAction] = useState({});
  const [allEmployees, setAllEmployees] = useState([]);

  const user = useUserinfoContext();
  const error = useErrorContext();

  useEffect(() => {
    getAllEmployeesForImport(setAllEmployees, () => {}, error);
  }, []);

  useEffect(
    () => {
      if (sc && sc.publishedReviewerData) {
        const lProjects = [
          ...sc.publishedReviewerData.project.map(entry => ({
            title: entry.title,
            weight: entry.weight
          }))
        ];
        const lDBs = [
          ...sc.publishedReviewerData.dailyBusiness.map(entry => ({
            title: entry.title,
            weight: entry.weight
          }))
        ];
        setProjects(
          lProjects && lProjects.length > 0
            ? lProjects
            : [{ title: '', weight: 0 }]
        );
        setDailyBusinesses(
          lDBs && lDBs.length > 0 ? lDBs : [{ title: '', weight: 0 }]
        );
      } else {
        setDailyBusinesses([{ title: '', weight: 0 }]);
        setProjects([{ title: '', weight: 0 }]);
      }
    },
    [sc]
  );

  useEffect(
    () => {
      if (sc) {
        const initDailyBusiness = sc.publishedReviewerData.dailyBusiness.map(
          (entry, idx) => {
            let title;
            let weight;
            if (
              idx < sc.initScTemplate.data.dailyBusiness.length &&
              entry.title === sc.initScTemplate.data.dailyBusiness[idx].title
            ) {
              title = 'IMPORTED';
            } else {
              title = 'SAVED';
            }
            if (
              idx < sc.initScTemplate.data.dailyBusiness.length &&
              entry.weight === sc.initScTemplate.data.dailyBusiness[idx].weight
            ) {
              weight = 'IMPORTED';
            } else {
              weight = 'SAVED';
            }
            return { title: title, weight: weight };
          }
        );
        const initProject = sc.publishedReviewerData.project.map(
          (entry, idx) => {
            let title;
            let weight;
            if (
              idx < sc.initScTemplate.data.project.length &&
              entry.title === sc.initScTemplate.data.project[idx].title
            ) {
              title = 'IMPORTED';
            } else {
              title = 'SAVED';
            }
            if (
              idx < sc.initScTemplate.data.project.length &&
              entry.weight === sc.initScTemplate.data.project[idx].weight
            ) {
              weight = 'IMPORTED';
            } else {
              weight = 'SAVED';
            }
            return { title: title, weight: weight };
          }
        );
        let initClassification;
        if (
          sc.initScTemplate.importType &&
          sc.classification === sc.initScTemplate.classification
        ) {
          initClassification = 'IMPORTED';
        } else {
          initClassification = 'SAVED';
        }

        const initialState = {
          dailyBusiness: initDailyBusiness,
          project: initProject,
          classification: initClassification
        };
        setFieldsState(initialState);
      }
    },
    [sc]
  );

  const addDailyBusiness = () => {
    const newFieldsState = { ...fieldsState };
    newFieldsState.dailyBusiness.push({ title: 'CHANGED', weight: 'CHANGED' });
    setFieldsState(newFieldsState);

    const newDailyBusinesses = [...dailyBusinesses];
    newDailyBusinesses.push({
      title: '',
      weight: 0
    });
    setDailyBusinesses(newDailyBusinesses);
  };

  const addProject = () => {
    const newFieldsState = { ...fieldsState };
    newFieldsState.project.push({ title: 'CHANGED', weight: 'CHANGED' });
    setFieldsState(newFieldsState);

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
    if (idx < sc.initScTemplate.data.dailyBusiness.length) {
      sc.initScTemplate.data.dailyBusiness.splice(idx, 1);
    }
    fieldsState.dailyBusiness.splice(idx, 1);
    setDailyBusinesses(newDailyBusinesses);
  };

  const deleteProject = idx => {
    const newProjects = [...projects];
    newProjects.splice(idx, 1);
    if (idx < sc.initScTemplate.data.project.length) {
      sc.initScTemplate.data.project.splice(idx, 1);
    }
    fieldsState.project.splice(idx, 1);
    setProjects(newProjects);
  };

  const onChangeDailyBusinessTitle = (idx, event) => {
    if (idx < sc.initScTemplate.data.dailyBusiness.length) {
      sc.initScTemplate.data.dailyBusiness[idx].title = null;
    }

    const newFieldsState = { ...fieldsState };
    const newF = { ...newFieldsState.dailyBusiness[idx] };
    newF.title = 'CHANGED';
    newFieldsState.dailyBusiness[idx] = newF;
    setFieldsState(newFieldsState);

    const newDailyBusinesses = [...dailyBusinesses];
    const newDB = { ...newDailyBusinesses[idx] };
    newDB.title = event.target.value;
    newDailyBusinesses[idx] = newDB;
    setDailyBusinesses(newDailyBusinesses);
  };

  const setDailyBusinessWeight = (idx, event) => {
    if (idx < sc.initScTemplate.data.dailyBusiness.length) {
      sc.initScTemplate.data.dailyBusiness[idx].weight = null;
    }

    const newFieldsState = { ...fieldsState };
    const newF = { ...newFieldsState.dailyBusiness[idx] };
    newF.weight = 'CHANGED';
    newFieldsState.dailyBusiness[idx] = newF;
    setFieldsState(newFieldsState);

    const newDailyBusinesses = [...dailyBusinesses];
    const newDB = { ...newDailyBusinesses[idx] };
    newDB.weight = event.target.value;
    newDailyBusinesses[idx] = newDB;
    setDailyBusinesses(newDailyBusinesses);
  };

  const onChangeProjectTitle = (idx, event) => {
    if (idx < sc.initScTemplate.data.project.length) {
      sc.initScTemplate.data.project[idx].title = null;
    }

    const newFieldsState = { ...fieldsState };
    const newF = { ...newFieldsState.project[idx] };
    newF.title = 'CHANGED';
    newFieldsState.project[idx] = newF;
    setFieldsState(newFieldsState);

    const newProject = [...projects];
    const newP = { ...newProject[idx] };
    newP.title = event.target.value;
    newProject[idx] = newP;
    setProjects(newProject);
  };

  const setProjectWeight = (idx, event) => {
    if (idx < sc.initScTemplate.data.project.length) {
      sc.initScTemplate.data.project[idx].weight = null;
    }

    const newFieldsState = { ...fieldsState };
    const newF = { ...newFieldsState.project[idx] };
    newF.weight = 'CHANGED';
    newFieldsState.project[idx] = newF;
    setFieldsState(newFieldsState);

    const newProject = [...projects];
    const newP = { ...newProject[idx] };
    newP.weight = event.target.value;
    newProject[idx] = newP;
    setProjects(newProject);
  };

  const onChangeClassification = event => {
    if (sc.initScTemplate && sc.initScTemplate.classification !== null) {
      sc.initScTemplate.classification = null;
    }

    const newFieldsState = { ...fieldsState };
    newFieldsState.classification = 'CHANGED';
    setFieldsState(newFieldsState);

    setClassification(event.target.value);
  };

  const bgClass = (type, idx) => {
    if (type === 'classification') {
      if (fieldsState && fieldsState.classification === 'IMPORTED') {
        return classes.backgroundGray;
      }
      if (fieldsState && fieldsState.classification === 'SAVED') {
        return '';
      }
      if (fieldsState && fieldsState.classification === 'CHANGED') {
        return classes.backgroundYellow;
      }
    }

    if (type === 'dailyBusinessTitle') {
      if (
        fieldsState &&
        fieldsState.dailyBusiness[idx] &&
        fieldsState.dailyBusiness[idx].title === 'IMPORTED'
      ) {
        return classes.backgroundGray;
      }
      if (
        fieldsState &&
        fieldsState.dailyBusiness[idx] &&
        fieldsState.dailyBusiness[idx].title === 'SAVED'
      ) {
        return '';
      }
      if (
        fieldsState &&
        fieldsState.dailyBusiness[idx] &&
        fieldsState.dailyBusiness[idx].title === 'CHANGED'
      ) {
        return classes.backgroundYellow;
      }
    }

    if (type === 'projectTitle') {
      if (
        fieldsState &&
        fieldsState.project[idx] &&
        fieldsState.project[idx].title === 'IMPORTED'
      ) {
        return classes.backgroundGray;
      }
      if (
        fieldsState &&
        fieldsState.project[idx] &&
        fieldsState.project[idx].title === 'SAVED'
      ) {
        return '';
      }
      if (
        fieldsState &&
        fieldsState.project[idx] &&
        fieldsState.project[idx].title === 'CHANGED'
      ) {
        return classes.backgroundYellow;
      }
    }

    if (type === 'dailyBusinessWeight') {
      if (
        fieldsState &&
        fieldsState.dailyBusiness[idx] &&
        fieldsState.dailyBusiness[idx].weight === 'IMPORTED'
      ) {
        return classes.backgroundGray;
      }
      if (
        fieldsState &&
        fieldsState.dailyBusiness[idx] &&
        fieldsState.dailyBusiness[idx].weight === 'SAVED'
      ) {
        return '';
      }
      if (
        fieldsState &&
        fieldsState.dailyBusiness[idx] &&
        fieldsState.dailyBusiness[idx].weight === 'CHANGED'
      ) {
        return classes.backgroundYellow;
      }
    }

    if (type === 'projectWeight') {
      if (
        fieldsState &&
        fieldsState.project[idx] &&
        fieldsState.project[idx].weight === 'IMPORTED'
      ) {
        return classes.backgroundGray;
      }
      if (
        fieldsState &&
        fieldsState.project[idx] &&
        fieldsState.project[idx].weight === 'SAVED'
      ) {
        return '';
      }
      if (
        fieldsState &&
        fieldsState.project[idx] &&
        fieldsState.project[idx].weight === 'CHANGED'
      ) {
        return classes.backgroundYellow;
      }
    }
  };

  const containsEmptyValues = array => {
    const entryWithEmptyValues = array.find(entry => {
      if (entry === null) {
        return false;
      }
      return entry.title.trim() === '' || entry.weight === 0;
    });

    return Boolean(entryWithEmptyValues);
  };

  const submitDisabled =
    !scTypeSelected ||
    !classification ||
    dailyBusinesses.length < 1 ||
    containsEmptyValues(dailyBusinesses);

  const submitButton = (
    <Button
      disabled={submitDisabled}
      onClick={handleSubmitScType}
      color="primary"
      variant="contained"
      className={classes.submitScType}
    >
      {intl.formatMessage({ id: 'scsheet.publish' })}
    </Button>
  );

  const saveButton = (
    <Tooltip title={intl.formatMessage({ id: 'sctypetochoose.save.tooltip' })}>
      <Button
        onClick={handleSaveInit}
        color="secondary"
        variant="contained"
        className={classes.submitScType}
      >
        {intl.formatMessage({ id: 'scsheet.save' })}
      </Button>
    </Tooltip>
  );

  const openImportDialog = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const importButton = (
    <Button onClick={openImportDialog} color="primary" variant="contained">
      {intl.formatMessage({ id: 'scsheet.import' })}
    </Button>
  );

  const importOtherSc = () => {
    setImportFromDialogOpen(true);
  };

  const renderGoalSection = (
    categoryId,
    contentArray,
    changeTitle,
    setWeight,
    deleteItem,
    addItem
  ) => {
    return (
      <Grid item xs={6}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography className={classes.boldText}>
                  {intl.formatMessage({
                    id: categoryId
                  })}
                </Typography>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {contentArray.map((entry, idx) => {
              if (entry === null) {
                return '';
              }
              return (
                <TableRow key={idx}>
                  <TableCell
                    className={`${classes.noBorders} ${classes.noPadding}`}
                  >
                    <TextField
                      variant="outlined"
                      inputProps={{ className: classes.textFieldInput }}
                      onChange={event => changeTitle(idx, event)}
                      value={entry.title}
                      className={bgClass(
                        `${categoryId.split('.')[2]}Title`,
                        idx
                      )}
                    />
                  </TableCell>
                  <TableCell
                    className={`${classes.noBorders} ${classes.noRightPadding}`}
                  >
                    <FormControl className={classes.weightForm}>
                      <InputLabel>
                        {intl.formatMessage({
                          id: 'scsheet.textheader.weight'
                        })}
                      </InputLabel>
                      <Select
                        value={contentArray[idx].weight}
                        onChange={event => setWeight(idx, event)}
                        renderValue={selected => (
                          <span className={classes.smallLeftMargin}>
                            {selected}
                          </span>
                        )}
                        inputProps={{ className: classes.input }}
                        className={bgClass(
                          `${categoryId.split('.')[2]}Weight`,
                          idx
                        )}
                      >
                        {[0.5, 1, 2, 3, 4, 5, 6].map((val, index) => (
                          <MenuItem key={index} value={val}>
                            {val}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell className={classes.noBorders}>
                    <IconButton onClick={() => deleteItem(idx)}>
                      <Icon>clear</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Tooltip title={intl.formatMessage({ id: 'sctypetochoose.addfield' })}>
          <IconButton onClick={addItem}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    );
  };

  const caption = (
    <div className={classes.captionContainer}>
      <div className={classes.captionTitle}>
        {intl.formatMessage({ id: 'scsheet.caption.title' })}
      </div>
      <div className={`${classes.captionGeneral} ${classes.backgroundGray}`}>
        {intl.formatMessage({ id: 'scsheet.caption.imported' })}
      </div>
      <div className={`${classes.captionGeneral}`}>
        {intl.formatMessage({ id: 'scsheet.caption.saved' })}
      </div>
      <div className={`${classes.captionGeneral} ${classes.backgroundYellow}`}>
        {intl.formatMessage({ id: 'scsheet.caption.notsaved' })}
      </div>
    </div>
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
              control={
                <Radio
                  checked={
                    scTypeSelected === SC_STATUS.WITH_PR ||
                    scTypeSelected === SC_STATUS.SC_WITH_PR_PRESET
                  }
                />
              }
              label={intl.formatMessage({ id: 'scsheet.sctype.withPR' })}
            />
            <FormControlLabel
              value={SC_STATUS.WITHOUT_PR}
              control={
                <Radio
                  checked={
                    scTypeSelected === SC_STATUS.WITHOUT_PR ||
                    scTypeSelected === SC_STATUS.SC_WITHOUT_PR_PRESET
                  }
                />
              }
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
            onChange={onChangeClassification}
            className={`${bgClass('classification')} ${
              classes.smallLeftPadding
            }`}
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
          {renderGoalSection(
            'scsheet.subtitle.dailyBusiness',
            dailyBusinesses,
            onChangeDailyBusinessTitle,
            setDailyBusinessWeight,
            deleteDailyBusiness,
            addDailyBusiness
          )}
          {renderGoalSection(
            'scsheet.subtitle.project',
            projects,
            onChangeProjectTitle,
            setProjectWeight,
            deleteProject,
            addProject
          )}
        </Grid>
        {caption}
        <span>{saveButton}</span>
        {submitDisabled ? (
          <Tooltip title={intl.formatMessage({ id: 'sctypetochoose.tooltip' })}>
            <span>{submitButton}</span>
          </Tooltip>
        ) : (
          <Tooltip
            title={intl.formatMessage({
              id: 'scsheet.tooltip.publish.reviewer'
            })}
          >
            <span>{submitButton}</span>
          </Tooltip>
        )}
        <span>{importButton}</span>
      </div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <List>
          <ListItem dense button>
            <ListItemText
              onClick={() => {
                setImportAction({ type: 'last' });
              }}
              primary={intl.formatMessage({
                id: 'scsheet.import.last'
              })}
            />
            {sc.initScTemplate && sc.initScTemplate.importType === 'last' && (
              <Fragment>
                <CheckIcon color={'secondary'} />
                <Icon
                  className={classes.btnClear}
                  onClick={() => setImportAction({ type: 'unimport' })}
                >
                  clear
                </Icon>
              </Fragment>
            )}
          </ListItem>
          <ListItem dense button>
            <ListItemText
              onClick={importOtherSc}
              primary={intl.formatMessage({
                id: 'scsheet.import.other'
              })}
            />
            {sc.initScTemplate && sc.initScTemplate.importType === 'specific' && (
              <Fragment>
                <CheckIcon color={'secondary'} />
                <Icon
                  className={classes.btnClear}
                  onClick={() => setImportAction({ type: 'unimport' })}
                >
                  clear
                </Icon>
              </Fragment>
            )}
          </ListItem>
        </List>
      </Popover>
      {importFromDialogOpen && (
        <EmployeeImportScsDialog
          employees={allEmployees}
          dialogOpen={importFromDialogOpen}
          setDialogOpen={setImportFromDialogOpen}
          importAction={scId => {
            setImportAction({ type: 'specific', scId: scId });
          }}
        />
      )}
      <ConfirmDialog
        open={Object.values(importAction).length > 0}
        handleClose={() => setImportAction({})}
        handleConfirm={() => {
          importSc(importAction);
        }}
        confirmationText={intl.formatMessage({
          id:
            importAction && importAction.type !== 'unimport'
              ? 'sc.import.confirm.content'
              : 'sc.import.clean.content'
        })}
        confirmationHeader={intl.formatMessage({
          id:
            importAction && importAction.type !== 'unimport'
              ? 'sc.import.confirm.title'
              : 'sc.import.clean.title'
        })}
      />
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(ScTypeToChoose));
