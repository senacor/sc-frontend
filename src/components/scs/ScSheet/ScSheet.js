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
import {
  weightSumWithoutPR,
  updatePercentageArr,
  updatePercentageObj
} from './calculationFunc';
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
    evaluation: '-',
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

  const weightsWithoutPR = weightSumWithoutPR(
    dailyBusinessFields,
    projectFields,
    workEfficiencyFields,
    workQualityFields
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
      const values = cloneDeep(dailyBusinessFields);
      const newObjectValue = { ...values[i] };
      newObjectValue[propKey] = event.target.value;
      values[i] = newObjectValue;
      if (propKey === 'weight') {
        updatePercentageArr(values, setDailyBusinessFields, weightsWithoutPR);
        updatePercentageArr(projectFields, setProjectFields, weightsWithoutPR);
        updatePercentageObj(
          workEfficiencyFields,
          setWorkEfficiencyFields,
          weightsWithoutPR
        );
        updatePercentageObj(
          workQualityFields,
          setWorkQualityFields,
          weightsWithoutPR
        );
      } else {
        setDailyBusinessFields(values);
      }
    } else if (type === 'project') {
      const values = cloneDeep(projectFields);
      const newObjectValue = { ...values[i] };
      newObjectValue[propKey] = event.target.value;
      values[i] = newObjectValue;
      if (propKey === 'weight') {
        updatePercentageArr(values, setProjectFields, weightsWithoutPR);
        updatePercentageArr(
          dailyBusinessFields,
          setDailyBusinessFields,
          weightsWithoutPR
        );
        updatePercentageObj(
          workEfficiencyFields,
          setWorkEfficiencyFields,
          weightsWithoutPR
        );
        updatePercentageObj(
          workQualityFields,
          setWorkQualityFields,
          weightsWithoutPR
        );
      } else {
        setProjectFields(values);
      }
    }
  };

  const handleChangeWorkEfficiency = (type, propKey, event) => {
    const values = { ...workEfficiencyFields };
    values[propKey] = event.target.value;
    if (propKey === 'weight') {
      updatePercentageObj(values, setWorkEfficiencyFields, weightsWithoutPR);
      updatePercentageObj(
        workQualityFields,
        setWorkQualityFields,
        weightsWithoutPR
      );
      updatePercentageArr(projectFields, setProjectFields, weightsWithoutPR);
      updatePercentageArr(
        dailyBusinessFields,
        setDailyBusinessFields,
        weightsWithoutPR
      );
    } else {
      setWorkEfficiencyFields(values);
    }
  };

  const handleChangeWorkQuality = (type, propKey, event) => {
    const values = { ...workQualityFields };
    values[propKey] = event.target.value;
    if (propKey === 'weight') {
      updatePercentageObj(values, setWorkQualityFields, weightsWithoutPR);
      updatePercentageObj(
        workEfficiencyFields,
        setWorkEfficiencyFields,
        weightsWithoutPR
      );
      updatePercentageArr(projectFields, setProjectFields, weightsWithoutPR);
      updatePercentageArr(
        dailyBusinessFields,
        setDailyBusinessFields,
        weightsWithoutPR
      );
    } else {
      setWorkQualityFields(values);
    }
  };

  const handleChangePrCategories = (type, propKey, event) => {
    if (type === 'skillsInTheField') {
      const values = { ...skillsInTheFieldsFields };
      values[propKey] = event.target.value;
      setSkillsInTheFieldsFields(values);
    } else if (type === 'impactOnTeam') {
      const values = { ...impactOnTeamFields };
      values[propKey] = event.target.value;
      setImpactOnTeamFields(values);
    } else if (type === 'serviceQuality') {
      const values = { ...serviceQualityFields };
      values[propKey] = event.target.value;
      setServiceQualityFields(values);
    } else if (type === 'impactOnCompany') {
      const values = { ...impactOnCompanyFields };
      values[propKey] = event.target.value;
      setImpactOnCompanyFields(values);
    }
  };

  const handleChangeWeightPercentage = (type, value) => {
    if (value < 0 || value > 100) {
      return;
    }
    if (type === 'performance') {
      setPerformanceWeightPercentage(value);
      setPrCategoriesWeightPercentage(100 - value);
    } else if (type === 'prCategories') {
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

export default injectIntl(withStyles(styles)(ScSheet));
