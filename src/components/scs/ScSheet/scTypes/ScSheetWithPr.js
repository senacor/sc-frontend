import React, { Fragment, useState, useEffect } from 'react';
import Performance from '../categories/Performance';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import PrCategories from '../categories/PrCategories';
import FinalScoreSection from '../FinalScoreSection';
import { reduceWeights } from '../calculations/helperFunctions';
import {
  calculatePercentageWithPrPerformance,
  calculatePercentageWithPRPrCategories,
  calculateFinalScoreWithPr
} from '../calculations/scWithPr';
import { SC_TAB, CATEGORY, SC_STATUS } from '../../../../helper/scSheetData';
import ButtonsBelowSheet from '../ButtonsBelowSheet';
import { savePerformanceData, addScStatus } from '../../../../calls/sc';
import {
  useInfoContext,
  useErrorContext,
  useUserinfoContext
} from '../../../../helper/contextHooks';

const styles = theme => ({});

const ScSheetWithPr = ({
  fieldsDisabled,
  addSubcategory,
  tabValue,
  validateTitles,
  sc,
  setSc,
  setIsLoading,
  afterScFetched,
  handleChangePerformance,
  dailyBusinessFields,
  setDailyBusinessFields,
  projectFields,
  setProjectFields
}) => {
  const initialFieldsData = {
    title: '',
    weight: 1,
    percentage: 0,
    evaluation: 3,
    description: '',
    achievement: '',
    comment: ''
  };

  const info = useInfoContext();
  const error = useErrorContext();
  const user = useUserinfoContext();

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
  const [weightsWithPRPerformance, setWeightsWithPRPerformance] = useState(5);
  const [weightsWithPRPrCategories, setWeightsWithPRPrCategories] = useState(4);
  const [finalScore, setFinalScore] = useState(0);

  const weightWithPR = weightsWithPRPerformance + weightsWithPRPrCategories;

  useEffect(
    () => {
      const totalWeightPerformance =
        reduceWeights(dailyBusinessFields) + reduceWeights(projectFields);
      setWeightsWithPRPerformance(totalWeightPerformance);
      const totalWeightPrCategories =
        skillsInTheFieldsFields.weight +
        impactOnTeamFields.weight +
        serviceQualityFields.weight +
        impactOnCompanyFields.weight;
      setWeightsWithPRPrCategories(totalWeightPrCategories);
    },
    [
      ...dailyBusinessFields.map(item => item.weight),
      ...projectFields.map(item => item.weight),
      skillsInTheFieldsFields.weight,
      impactOnTeamFields.weight,
      serviceQualityFields.weight,
      impactOnCompanyFields.weight
    ]
  );

  useEffect(
    () => {
      calculatePercentageWithPrPerformance(
        dailyBusinessFields,
        setDailyBusinessFields,
        projectFields,
        setProjectFields,
        weightsWithPRPerformance,
        performanceWeightPercentage
      );
      calculatePercentageWithPRPrCategories(
        skillsInTheFieldsFields,
        setSkillsInTheFieldsFields,
        impactOnTeamFields,
        setImpactOnTeamFields,
        serviceQualityFields,
        setServiceQualityFields,
        impactOnCompanyFields,
        setImpactOnCompanyFields,
        weightsWithPRPrCategories,
        prCategoriesWeightPercentage
      );
    },
    [weightWithPR, performanceWeightPercentage, prCategoriesWeightPercentage]
  );

  useEffect(
    () => {
      setFinalScore(
        calculateFinalScoreWithPr(
          dailyBusinessFields,
          projectFields,
          skillsInTheFieldsFields,
          impactOnTeamFields,
          serviceQualityFields,
          impactOnCompanyFields,
          performanceWeightPercentage,
          prCategoriesWeightPercentage,
          weightWithPR
        )
      );
    },
    [
      ...dailyBusinessFields.map(item => item.evaluation),
      ...dailyBusinessFields.map(item => item.weight),
      ...projectFields.map(item => item.evaluation),
      ...projectFields.map(item => item.weight),
      serviceQualityFields.evalution,
      serviceQualityFields.weight,
      impactOnCompanyFields.evaluation,
      impactOnCompanyFields.weight,
      skillsInTheFieldsFields.evaluation,
      skillsInTheFieldsFields.weight,
      impactOnTeamFields.evaluation,
      impactOnTeamFields.weight,
      performanceWeightPercentage
    ]
  );

  useEffect(
    () => {
      if (tabValue === SC_TAB.EMPLOYEE) {
        setDailyBusinessFields(sc.employeeData.dailyBusiness);
        setProjectFields(sc.employeeData.project);
        setSkillsInTheFieldsFields(sc.employeeData.skillsInTheFields);
        setImpactOnTeamFields(sc.employeeData.impactOnTeam);
        setServiceQualityFields(sc.employeeData.serviceQuality);
        setImpactOnCompanyFields(sc.employeeData.impactOnCompany);
        setPerformanceWeightPercentage(
          100 - sc.employeeData.skillsWeightPercentage
        );
        setPrCategoriesWeightPercentage(sc.employeeData.skillsWeightPercentage);
      } else if (tabValue === SC_TAB.REVIEWER) {
        setDailyBusinessFields(sc.reviewerData.dailyBusiness);
        setProjectFields(sc.reviewerData.project);
        setSkillsInTheFieldsFields(sc.reviewerData.skillsInTheFields);
        setImpactOnTeamFields(sc.reviewerData.impactOnTeam);
        setServiceQualityFields(sc.reviewerData.serviceQuality);
        setImpactOnCompanyFields(sc.reviewerData.impactOnCompany);
        setPerformanceWeightPercentage(
          100 - sc.reviewerData.skillsWeightPercentage
        );
        setPrCategoriesWeightPercentage(sc.reviewerData.skillsWeightPercentage);
      }
    },
    [tabValue]
  );

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

  const handleSubmit = () => {
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
    ).then(() => {
      if (user.isOwnerInSc(sc)) {
        if (!sc.statusSet.includes(SC_STATUS.EMPLOYEE_SUBMITTED)) {
          addScStatus(
            sc.id,
            SC_STATUS.EMPLOYEE_SUBMITTED,
            setSc,
            setIsLoading,
            error,
            afterScFetched
          );
        }
      } else if (user.isReviewerInSc(sc)) {
        if (!sc.statusSet.includes(SC_STATUS.REVIEWER_SUBMITTED)) {
          addScStatus(
            sc.id,
            SC_STATUS.REVIEWER_SUBMITTED,
            setSc,
            setIsLoading,
            error,
            afterScFetched
          );
        }
      }
    });
  };

  return (
    <Fragment>
      <Performance
        fieldsDisabled={fieldsDisabled}
        dailyBusinessFields={dailyBusinessFields}
        setDailyBusinessFields={setDailyBusinessFields}
        projectFields={projectFields}
        setProjectFields={setProjectFields}
        handleChangePerformance={handleChangePerformance}
        addSubcategory={addSubcategory}
        hasWeightPercentage
        performanceWeightPercentage={performanceWeightPercentage}
        handleChangeWeightPercentage={handleChangeWeightPercentage}
      />
      <PrCategories
        fieldsDisabled={fieldsDisabled}
        skillsInTheFieldsFields={skillsInTheFieldsFields}
        impactOnTeamFields={impactOnTeamFields}
        serviceQualityFields={serviceQualityFields}
        impactOnCompanyFields={impactOnCompanyFields}
        handleChangePrCategories={handleChangePrCategories}
        prCategoriesWeightPercentage={prCategoriesWeightPercentage}
        handleChangeWeightPercentage={handleChangeWeightPercentage}
      />
      <FinalScoreSection finalScore={finalScore} />
      <ButtonsBelowSheet
        submitDisabled={!validateTitles()}
        handleSave={handleSave}
        handleSubmit={handleSubmit}
        sc={sc}
      />
    </Fragment>
  );
};
export default injectIntl(withStyles(styles)(ScSheetWithPr));
