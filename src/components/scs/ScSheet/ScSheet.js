import React, { Fragment, useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import {
  useErrorContext,
  useInfoContext,
  useUserinfoContext
} from '../../../helper/contextHooks';
import { savePerformanceData } from '../../../calls/sc';
import { positions } from '../../../helper/filterData';
import PrCategories from './categories/PrCategories';
import cloneDeep from '../../../helper/cloneDeep';
import Performance from './categories/Performance';
import ButtonsBelowSheet from './ButtonsBelowSheet';
import WorkEfficiency from './categories/WorkEfficiency';
import WorkQuality from './categories/WorkQuality';

// Material UI
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
  reduceWeights,
  updatePercentageAllWithoutPR,
  calculateFinalScoreWithoutPR,
  round
} from './calculationFunc';
import FinalScoreSection from './FinalScoreSection';
import { CATEGORY } from '../../../helper/scSheetData';

const styles = theme => ({
  ...theme.styledComponents,
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

const ScSheet = ({ sc, withPrCategories, classes, intl }) => {
  const initialFieldsData = {
    title: '',
    weight: 1,
    percentage: 0,
    evaluation: 0,
    description: '',
    achievement: '',
    comment: ''
  };

  const info = useInfoContext();
  const error = useErrorContext();
  const user = useUserinfoContext();
  const [position, setPosition] = useState('');
  const [dailyBusinessFields, setDailyBusinessFields] = useState([
    { ...initialFieldsData }
  ]);
  const [projectFields, setProjectFields] = useState([
    { ...initialFieldsData }
  ]);
  const [workEfficiencyFields, setWorkEfficiencyFields] = useState({
    ...initialFieldsData
  });
  const [workQualityFields, setWorkQualityFields] = useState({
    ...initialFieldsData
  });
  const [skillsInTheFieldsFields, setSkillsInTheFieldsFields] = useState({
    ...initialFieldsData
  });
  const [impactOnTeamFields, setImpactOnTeamFields] = useState({
    ...initialFieldsData
  });
  const [serviceQualityFields, setServiceQualityFields] = useState({
    ...initialFieldsData
  });
  const [impactOnCompanyFields, setImpactOnCompanyFields] = useState({
    ...initialFieldsData
  });
  const [
    performanceWeightPercentage,
    setPerformanceWeightPercentage
  ] = useState(0);
  const [
    prCategoriesWeightPercentage,
    setPrCategoriesWeightPercentage
  ] = useState(0);
  const [weightsWithoutPR, setWeightsWithoutPR] = useState(7);
  const [finalScore, setFinalScore] = useState(0);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  useEffect(
    () => {
      if (!withPrCategories) {
        const totalWeight =
          reduceWeights(dailyBusinessFields) +
          reduceWeights(projectFields) +
          workEfficiencyFields.weight +
          workQualityFields.weight;
        setWeightsWithoutPR(totalWeight);
      }
    },
    [
      dailyBusinessFields,
      projectFields,
      workEfficiencyFields,
      workQualityFields
    ]
  );

  useEffect(
    () => {
      if (!withPrCategories) {
        updatePercentageAllWithoutPR(
          dailyBusinessFields,
          setDailyBusinessFields,
          projectFields,
          setProjectFields,
          workEfficiencyFields,
          setWorkEfficiencyFields,
          workQualityFields,
          setWorkQualityFields,
          weightsWithoutPR
        );
      }
    },
    [weightsWithoutPR, withPrCategories]
  );

  useEffect(
    () => {
      if (!withPrCategories) {
        setFinalScore(
          round(
            calculateFinalScoreWithoutPR(
              dailyBusinessFields,
              projectFields,
              workEfficiencyFields,
              workQualityFields,
              weightsWithoutPR
            ),
            1
          )
        );
      } else {
        // TODO: set final score for SC with PR
      }
    },
    [
      weightsWithoutPR,
      dailyBusinessFields,
      projectFields,
      workEfficiencyFields,
      workQualityFields
    ]
  );

  useEffect(() => {
    if (user.isOwnerInSc(sc)) {
      setDailyBusinessFields(sc.employeeData.dailyBusiness);
      setProjectFields(sc.employeeData.project);
      if (withPrCategories) {
        setSkillsInTheFieldsFields(sc.employeeData.skillsInTheFields);
        setImpactOnTeamFields(sc.employeeData.impactOnTeam);
        setServiceQualityFields(sc.employeeData.serviceQuality);
        setImpactOnCompanyFields(sc.employeeData.impactOnCompany);
        setPerformanceWeightPercentage(
          100 - sc.employeeData.skillsWeightPercentage
        );
        setPrCategoriesWeightPercentage(sc.employeeData.skillsWeightPercentage);
      } else {
        setWorkEfficiencyFields(sc.employeeData.workEfficiency);
        setWorkQualityFields(sc.employeeData.workQuality);
      }
    } else {
      setDailyBusinessFields(sc.reviewerData.dailyBusiness);
      setProjectFields(sc.reviewerData.project);
      if (withPrCategories) {
        setSkillsInTheFieldsFields(sc.reviewerData.skillsInTheFields);
        setImpactOnTeamFields(sc.reviewerData.impactOnTeam);
        setServiceQualityFields(sc.reviewerData.serviceQuality);
        setImpactOnCompanyFields(sc.reviewerData.impactOnCompany);
        setPerformanceWeightPercentage(
          100 - sc.reviewerData.skillsWeightPercentage
        );
        setPrCategoriesWeightPercentage(sc.reviewerData.skillsWeightPercentage);
      } else {
        setWorkEfficiencyFields(sc.reviewerData.workEfficiency);
        setWorkQualityFields(sc.reviewerData.workQuality);
      }
    }
  }, []);

  const handleSubmit = () => {
    // TODO: submitting data and sending to backend
  };

  useEffect(() => {
    setSubmitDisabled(false);
    if (dailyBusinessFields.find(element => element.evaluation === 0)) {
      setSubmitDisabled(true);
    }
    if (projectFields.find(element => element.evaluation === 0)) {
      setSubmitDisabled(true);
    }
    if (withPrCategories) {
      if (skillsInTheFieldsFields.evaluation === 0) {
        setSubmitDisabled(true);
      }
      if (impactOnTeamFields.evaluation === 0) {
        setSubmitDisabled(true);
      }
      if (serviceQualityFields.evaluation === 0) {
        setSubmitDisabled(true);
      }
      if (impactOnCompanyFields.evaluation === 0) {
        setSubmitDisabled(true);
      }
      if (prCategoriesWeightPercentage === 0) {
        setSubmitDisabled(true);
      }
    } else {
      if (workEfficiencyFields.evaluation === 0) {
        setSubmitDisabled(true);
      }
      if (workQualityFields.evaluation === 0) {
        setSubmitDisabled(true);
      }
    }
  });

  const handleSave = () => {
    const mapToDTO = field => {
      return {
        title: field.title,
        evaluation: typeof field.evaluation === 'number' ? field.evaluation : 1,
        percentage: field.percentage,
        description: field.description,
        achievement: field.achievement,
        weight: field.weight,
        comment: field.comment
      };
    };

    const data = {
      dailyBusiness: dailyBusinessFields.map(mapToDTO),
      project: projectFields.map(mapToDTO),
      workEfficiency: mapToDTO(workEfficiencyFields),
      workQuality: mapToDTO(workQualityFields),
      skillsInTheFields: mapToDTO(skillsInTheFieldsFields),
      impactOnTeam: mapToDTO(impactOnTeamFields),
      serviceQuality: mapToDTO(serviceQualityFields),
      impactOnCompany: mapToDTO(impactOnCompanyFields),
      skillsWeightPercentage: prCategoriesWeightPercentage
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
    if (type === CATEGORY.DAILY_BUSINESS) {
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
    if (type === CATEGORY.DAILY_BUSINESS) {
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
    if (type === CATEGORY.DAILY_BUSINESS) {
      const values = cloneDeep(dailyBusinessFields);
      const newObjectValue = { ...values[i] };
      newObjectValue[propKey] = event.target.value;
      values[i] = newObjectValue;
      setDailyBusinessFields(values);
    } else if (type === CATEGORY.PROJECT) {
      const values = cloneDeep(projectFields);
      const newObjectValue = { ...values[i] };
      newObjectValue[propKey] = event.target.value;
      values[i] = newObjectValue;
      setProjectFields(values);
    }
  };

  const handleChangeWorkEfficiency = (type, propKey, event) => {
    const values = { ...workEfficiencyFields };
    values[propKey] = event.target.value;
    setWorkEfficiencyFields(values);
  };

  const handleChangeWorkQuality = (type, propKey, event) => {
    const values = { ...workQualityFields };
    values[propKey] = event.target.value;
    setWorkQualityFields(values);
  };

  const handleChangePrCategories = (type, propKey, event) => {
    if (type === CATEGORY.SKILLS_IN_THE_FIELDS) {
      const values = { ...skillsInTheFieldsFields };
      values[propKey] = event.target.value;
      setSkillsInTheFieldsFields(values);
    } else if (type === CATEGORY.TEAM_IMPACT) {
      const values = { ...impactOnTeamFields };
      values[propKey] = event.target.value;
      setImpactOnTeamFields(values);
    } else if (type === CATEGORY.SERVICE_QUALITY) {
      const values = { ...serviceQualityFields };
      values[propKey] = event.target.value;
      setServiceQualityFields(values);
    } else if (type === CATEGORY.COMPANY_IMPACT) {
      const values = { ...impactOnCompanyFields };
      values[propKey] = event.target.value;
      setImpactOnCompanyFields(values);
    }
  };

  const handleChangeWeightPercentage = (type, value) => {
    if (value < 0 || value > 100) {
      return;
    }
    if (type === CATEGORY.PERFORMANCE) {
      setPerformanceWeightPercentage(value);
      setPrCategoriesWeightPercentage(100 - value);
    } else if (type === CATEGORY.PR_CATEGORIES) {
      setPrCategoriesWeightPercentage(value);
      setPerformanceWeightPercentage(100 - value);
    }
  };

  const handleChangePosition = event => {
    setPosition(event.target.value);
  };

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
      {withPrCategories ? (
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
          <PrCategories
            skillsInTheFieldsFields={skillsInTheFieldsFields}
            impactOnTeamFields={impactOnTeamFields}
            serviceQualityFields={serviceQualityFields}
            impactOnCompanyFields={impactOnCompanyFields}
            handleChangePrCategories={handleChangePrCategories}
            prCategoriesWeightPercentage={prCategoriesWeightPercentage}
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
          <WorkEfficiency
            workEfficiencyFields={workEfficiencyFields}
            handleChangeWorkEfficiency={handleChangeWorkEfficiency}
          />
          <WorkQuality
            workQualityFields={workQualityFields}
            handleChangeWorkQuality={handleChangeWorkQuality}
          />
          <FinalScoreSection finalScore={finalScore} />
        </Fragment>
      )}
      <ButtonsBelowSheet
        submitDisabled={submitDisabled}
        handleSave={handleSave}
        handleSubmit={handleSubmit}
        sc={sc}
      />
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(ScSheet));
