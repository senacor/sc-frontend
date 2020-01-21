import React, { Fragment, useEffect, useState } from 'react';
import Performance from '../categories/Performance';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import PrCategories from '../categories/PrCategories';
import FinalScoreSection from '../FinalScoreSection';
import { reduceWeights } from '../calculations/helperFunctions';
import { checkEvaluationsFilledWithPR } from '../evaluationsCheck';
import {
  calculateFinalScoreWithPr,
  calculatePercentageWithPrPerformance,
  calculatePercentageWithPRPrCategories
} from '../calculations/scWithPr';
import { CATEGORY, SC_STATUS } from '../../../../helper/scSheetData';
import ButtonsBelowSheet from '../ButtonsBelowSheet';
import {
  savePerformanceData,
  addScStatus,
  publishScSectionData
} from '../../../../calls/sc';
import {
  useErrorContext,
  useInfoContext,
  useUserinfoContext
} from '../../../../helper/contextHooks';
import { downloadScAsPdf } from '../helperFunc.js';
import {
  determineStatesForProperty,
  determineStatesForPropertyArray,
  mapToDTO,
  wrapPropertiesIntoObject
} from '../../../../helper/wrapping';

const styles = theme => ({});

const ScSheetWithPr = ({
  fieldsDisabled,
  addSubcategory,
  removeSubcategory,
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
    evaluation: { value: 3, state: 'CHANGED' },
    description: { value: '', state: 'CHANGED' },
    achievement: { value: '', state: 'CHANGED' },
    comment: { value: '', state: 'CHANGED' }
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
      dailyBusinessFields,
      projectFields,
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
          true,
          dailyBusinessFields,
          projectFields,
          skillsInTheFieldsFields,
          impactOnTeamFields,
          serviceQualityFields,
          impactOnCompanyFields,
          performanceWeightPercentage,
          prCategoriesWeightPercentage,
          weightsWithPRPerformance,
          weightsWithPRPrCategories
        )
      );
    },
    [
      dailyBusinessFields,
      projectFields,
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
      if (user.isOwnerInSc(sc)) {
        setDailyBusinessFields(
          determineStatesForPropertyArray(sc, false, 'dailyBusiness')
        );
        setProjectFields(determineStatesForPropertyArray(sc, false, 'project'));
        setSkillsInTheFieldsFields(
          determineStatesForProperty(sc, false, 'skillsInTheFields')
        );
        setImpactOnTeamFields(
          determineStatesForProperty(sc, false, 'impactOnTeam')
        );
        setServiceQualityFields(
          determineStatesForProperty(sc, false, 'serviceQuality')
        );
        setImpactOnCompanyFields(
          determineStatesForProperty(sc, false, 'impactOnCompany')
        );
        setPerformanceWeightPercentage(
          100 - sc.privateEmployeeData.skillsWeightPercentage
        );
        setPrCategoriesWeightPercentage(
          sc.privateEmployeeData.skillsWeightPercentage
        );
      } else if (user.isReviewerInSc(sc)) {
        setDailyBusinessFields(
          determineStatesForPropertyArray(sc, true, 'dailyBusiness')
        );
        setProjectFields(determineStatesForPropertyArray(sc, true, 'project'));
        setSkillsInTheFieldsFields(
          determineStatesForProperty(sc, true, 'skillsInTheFields')
        );
        setImpactOnTeamFields(
          determineStatesForProperty(sc, true, 'impactOnTeam')
        );
        setServiceQualityFields(
          determineStatesForProperty(sc, true, 'serviceQuality')
        );
        setImpactOnCompanyFields(
          determineStatesForProperty(sc, true, 'impactOnCompany')
        );
        setPerformanceWeightPercentage(
          100 - sc.privateReviewerData.skillsWeightPercentage
        );
        setPrCategoriesWeightPercentage(
          sc.privateReviewerData.skillsWeightPercentage
        );
      }
    },
    [sc]
  );

  const handleChangePrCategories = (type, propKey, event) => {
    if (type === CATEGORY.SKILLS_IN_THE_FIELDS) {
      const values = { ...skillsInTheFieldsFields };
      values[propKey] = event.target.value;
      wrapPropertiesIntoObject(values, propKey);
      setSkillsInTheFieldsFields(values);
    } else if (type === CATEGORY.TEAM_IMPACT) {
      const values = { ...impactOnTeamFields };
      values[propKey] = event.target.value;
      wrapPropertiesIntoObject(values, propKey);
      setImpactOnTeamFields(values);
    } else if (type === CATEGORY.SERVICE_QUALITY) {
      const values = { ...serviceQualityFields };
      values[propKey] = event.target.value;
      wrapPropertiesIntoObject(values, propKey);
      setServiceQualityFields(values);
    } else if (type === CATEGORY.COMPANY_IMPACT) {
      const values = { ...impactOnCompanyFields };
      values[propKey] = event.target.value;
      wrapPropertiesIntoObject(values, propKey);
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
      error,
      setSc,
      setIsLoading,
      afterScFetched
    );
  };

  const handlePublish = withEvaluation => {
    const data = {
      dailyBusiness: dailyBusinessFields.map(mapToDTO),
      project: projectFields.map(mapToDTO),
      skillsInTheFields: mapToDTO(skillsInTheFieldsFields),
      impactOnTeam: mapToDTO(impactOnTeamFields),
      serviceQuality: mapToDTO(serviceQualityFields),
      impactOnCompany: mapToDTO(impactOnCompanyFields),
      skillsWeightPercentage: prCategoriesWeightPercentage
    };

    publishScSectionData(
      sc.id,
      user.isReviewerInSc(sc) ? 'reviewer' : 'employee',
      data,
      withEvaluation,
      info,
      setIsLoading,
      error
    ).then(() => {
      if (user.isOwnerInSc(sc)) {
        addScStatus(
          sc.id,
          SC_STATUS.EMPLOYEE_PUBLISHED,
          setSc,
          setIsLoading,
          error,
          afterScFetched
        );
      } else if (user.isReviewerInSc(sc)) {
        addScStatus(
          sc.id,
          SC_STATUS.REVIEWER_PUBLISHED,
          setSc,
          setIsLoading,
          error,
          afterScFetched
        );
      }
    });
  };

  const handleCloseSc = () => {
    if (user.isReviewerInSc(sc)) {
      addScStatus(
        sc.id,
        SC_STATUS.CLOSED,
        setSc,
        setIsLoading,
        error,
        afterScFetched
      );
    }
  };

  const handlePdfDownload = () => {
    downloadScAsPdf(sc.id, sc.employee.login, error);
  };

  const areAllEvaluationsFilled = () => {
    return checkEvaluationsFilledWithPR(
      true,
      dailyBusinessFields,
      projectFields,
      serviceQualityFields,
      skillsInTheFieldsFields,
      impactOnTeamFields,
      impactOnCompanyFields
    );
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
        removeSubcategory={removeSubcategory}
        hasWeightPercentage
        isReviewer={user.isReviewerInSc(sc)}
        performanceWeightPercentage={performanceWeightPercentage}
        handleChangeWeightPercentage={handleChangeWeightPercentage}
        canRemoveGoal={user.isReviewerInSc(sc)}
      />
      <PrCategories
        fieldsDisabled={fieldsDisabled}
        skillsInTheFieldsFields={skillsInTheFieldsFields}
        impactOnTeamFields={impactOnTeamFields}
        serviceQualityFields={serviceQualityFields}
        isReviewer={user.isReviewerInSc(sc)}
        impactOnCompanyFields={impactOnCompanyFields}
        handleChangePrCategories={handleChangePrCategories}
        prCategoriesWeightPercentage={prCategoriesWeightPercentage}
        handleChangeWeightPercentage={handleChangeWeightPercentage}
      />
      <FinalScoreSection finalScore={finalScore} />
      <ButtonsBelowSheet
        withEvaluationsButtonDisabled={!areAllEvaluationsFilled()}
        handleSave={handleSave}
        handlePublish={handlePublish}
        handleCloseSc={handleCloseSc}
        handlePdfDownload={handlePdfDownload}
        sc={sc}
      />
    </Fragment>
  );
};
export default injectIntl(withStyles(styles)(ScSheetWithPr));
