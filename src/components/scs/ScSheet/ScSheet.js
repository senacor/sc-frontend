import React, { Fragment, useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import {
  useErrorContext,
  useInfoContext,
  useUserinfoContext
} from '../../../helper/contextHooks';
import { savePerformanceData, getScPerformanceData } from '../../../calls/sc';
// Material UI
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Performance from './categories/Performance';
import ButtonsBelowSheet from './ButtonsBelowSheet';
import WorkEffectivity from './categories/WorkEffectivity';
import WorkQuality from './categories/WorkQuality';

// Material UI
import { CircularProgress } from '@material-ui/core';
import { positions } from '../../../helper/filterData';
import Skills from './categories/Skills';

const styles = theme => ({
  addProjectButton: {
    color: theme.palette.secondary.yellow
  },
  formControl: {
    minWidth: 180
  },
  dropdownContainer: {
    textAlign: 'center'
  }
});

const ScSheet = ({ sc, withSkills, match, classes, intl }) => {
  const initialFieldsData = {
    title: '',
    weight: '-',
    percentage: 0,
    evaluation: '-',
    description: '',
    achievement: '',
    comment: ''
  };

  const info = useInfoContext();
  const error = useErrorContext();
  const user = useUserinfoContext();
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState('');
  const [dailyBusinessFields, setDailyBusinessFields] = useState([
    { ...initialFieldsData }
  ]);
  const [projectFields, setProjectFields] = useState([
    { ...initialFieldsData }
  ]);
  const [workEffectivityFields, setWorkEffectivityFields] = useState([
    { ...initialFieldsData }
  ]);
  const [workQualityFields, setWorkQualityFields] = useState([
    { ...initialFieldsData }
  ]);
  const [skillsInTheFieldFields, setSkillsInTheFieldFields] = useState([
    { ...initialFieldsData }
  ]);
  const [impactOnTeamFields, setImpactOnTeamFields] = useState([
    { ...initialFieldsData }
  ]);
  const [serviceQualityFields, setServiceQualityFields] = useState([
    { ...initialFieldsData }
  ]);
  const [impactOnCompanyFields, setImpactOnCompanyFields] = useState([
    { ...initialFieldsData }
  ]);
  const [
    performanceWeightPercentage,
    setPerformanceWeightPercentage
  ] = useState(30);
  const [skillsWeightPercentage, setSkillsWeightPercentage] = useState(70);

  useEffect(() => {
    getScPerformanceData(
      match.params.id,
      user.isReviewerInSc(sc) ? 'reviewer' : 'employee',
      setDailyBusinessFields,
      setProjectFields,
      setWorkEffectivityFields,
      setWorkQualityFields,
      setIsLoading,
      error
    );
  }, []);

  const handleSubmit = () => {
    // TODO: submitting data and sending to backend
  };

  const handleSave = () => {
    const data = {
      dailyBusiness: dailyBusinessFields.map(field => {
        return {
          title: field.title,
          evaluation:
            typeof field.evaluation === 'number' ? field.evaluation : 0,
          percentage: field.percentage,
          description: field.description,
          achievement: field.achievement,
          weight: typeof field.weight === 'number' ? field.weight : 1,
          comment: field.comment
        };
      }),
      project: projectFields.map(field => {
        return {
          title: field.title,
          evaluation:
            typeof field.evaluation === 'number' ? field.evaluation : 0,
          percentage: field.percentage,
          description: field.description,
          achievement: field.achievement,
          weight: typeof field.weight === 'number' ? field.weight : 1,
          comment: field.comment
        };
      }),
      workEffectivity: workEffectivityFields.map(field => {
        return {
          title: field.title,
          evaluation:
            typeof field.evaluation === 'number' ? field.evaluation : 0,
          percentage: field.percentage,
          description: field.description,
          achievement: field.achievement,
          weight: typeof field.weight === 'number' ? field.weight : 1,
          comment: field.comment
        };
      }),
      workQuality: workQualityFields.map(field => {
        return {
          title: field.title,
          evaluation:
            typeof field.evaluation === 'number' ? field.evaluation : 0,
          percentage: field.percentage,
          description: field.description,
          achievement: field.achievement,
          weight: typeof field.weight === 'number' ? field.weight : 1,
          comment: field.comment
        };
      })
      // TODO: other categories
    };
    savePerformanceData(
      sc.id,
      user.isReviewerInSc(sc) ? 'reviewer' : 'employee',
      data,
      info,
      error
    );
  };

  const addSubcategory = type => {
    if (type === 'dailyBusiness') {
      const values = [...dailyBusinessFields];
      values.push(initialFieldsData);
      setDailyBusinessFields(values);
    } else {
      const values = [...projectFields];
      values.push(initialFieldsData);
      setProjectFields(values);
    }
  };

  const removeSubcategory = (type, index) => {
    if (type === 'dailyBusiness') {
      const values = [...dailyBusinessFields];
      values.splice(index, 1);
      setDailyBusinessFields(values);
    } else {
      const values = [...projectFields];
      values.splice(index, 1);
      setProjectFields(values);
    }
  };

  const handleChangePerformance = (type, i, propKey, event) => {
    if (type === 'dailyBusiness') {
      const values = [...dailyBusinessFields];
      values[i][propKey] = event.target.value;
      setDailyBusinessFields(values);
    } else if (type === 'project') {
      const values = [...projectFields];
      values[i][propKey] = event.target.value;
      setProjectFields(values);
    }
  };

  const handleChangeWorkEffectivity = (type, i, propKey, event) => {
    const values = [...workEffectivityFields];
    values[i][propKey] = event.target.value;
    setWorkEffectivityFields(values);
  };

  const handleChangeWorkQuality = (type, i, propKey, event) => {
    const values = [...workQualityFields];
    values[i][propKey] = event.target.value;
    setWorkQualityFields(values);
  };

  const handleChangeSkills = (type, i, propKey, event) => {
    if (type === 'skillsInTheField') {
      const values = [...skillsInTheFieldFields];
      values[i][propKey] = event.target.value;
      setSkillsInTheFieldFields(values);
    } else if (type === 'impactOnTeam') {
      const values = [...impactOnTeamFields];
      values[i][propKey] = event.target.value;
      setImpactOnTeamFields(values);
    } else if (type === 'serviceQuality') {
      const values = [...serviceQualityFields];
      values[i][propKey] = event.target.value;
      setServiceQualityFields(values);
    } else if (type === 'impactOnCompany') {
      const values = [...impactOnCompanyFields];
      values[i][propKey] = event.target.value;
      setImpactOnCompanyFields(values);
    }
  };

  const handleChangeWeightPercentage = (type, value) => {
    if (value < 0 || value > 100) {
      return;
    }
    if (type === 'performance') {
      setPerformanceWeightPercentage(value);
      setSkillsWeightPercentage(100 - value);
    } else if (type === 'skills') {
      setSkillsWeightPercentage(value);
      setPerformanceWeightPercentage(100 - value);
    }
  };

  const handleChangePosition = event => {
    setPosition(event.target.value);
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Fragment>
      <div className={classes.dropdownContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">
            {intl.formatMessage({ id: 'scsheet.position' })}
          </InputLabel>
          <Select
            labelid="demo-simple-select-label"
            id="demo-simple-select"
            value={position}
            onChange={handleChangePosition}
          >
            {positions.map((pos, index) => (
              <MenuItem key={index} value={pos}>
                {pos}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/* CATEGORIES */}
      {withSkills ? (
        <Fragment>
          <Performance
            dailyBusinessFields={dailyBusinessFields}
            projectFields={projectFields}
            handleChangePerformance={handleChangePerformance}
            addSubcategory={addSubcategory}
            removeSubcategory={removeSubcategory}
            hasWeightPercentage={true}
            performanceWeightPercentage={performanceWeightPercentage}
            handleChangeWeightPercentage={handleChangeWeightPercentage}
          />
          <Skills
            skillsInTheFieldsFields={skillsInTheFieldFields}
            impactOnTeamFields={impactOnTeamFields}
            serviceQualityFields={serviceQualityFields}
            impactOnCompanyFields={impactOnCompanyFields}
            handleChangeSkills={handleChangeSkills}
            skillsWeightPercentage={skillsWeightPercentage}
            handleChangeWeightPercentage={handleChangeWeightPercentage}
          />
        </Fragment>
      ) : (
        <Fragment>
          <Performance
            dailyBusinessFields={dailyBusinessFields}
            projectFields={projectFields}
            handleChangePerformance={handleChangePerformance}
            addSubcategory={addSubcategory}
            removeSubcategory={removeSubcategory}
          />
          <WorkEffectivity
            workEffectivityFields={workEffectivityFields}
            handleChangeWorkEffectivity={handleChangeWorkEffectivity}
          />
          <WorkQuality
            workQualityFields={workQualityFields}
            handleChangeWorkQuality={handleChangeWorkQuality}
          />
          {/* Other categories as separated components */}
        </Fragment>
      )}
      <ButtonsBelowSheet
        handleSave={handleSave}
        handleSubmit={handleSubmit}
        sc={sc}
      />
    </Fragment>
  );
};

export default withRouter(injectIntl(withStyles(styles)(ScSheet)));
