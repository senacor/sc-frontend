import React, { Fragment, useEffect, useState } from 'react';
import Performance from '../categories/Performance';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import PrCategories from '../categories/PrCategories';
import FinalScoreSection from '../FinalScoreSection';
import { reduceWeights } from '../calculations/helperFunctions';
import { checkEvaluationsFilledWithPR, isReady } from '../evaluationsCheck';
import {
  calculateFinalScoreWithPr,
  calculatePercentageWithPrPerformance,
  calculatePercentageWithPRPrCategories
} from '../calculations/scWithPr';
import { CATEGORY, SC_STATUS } from '../../../../helper/scSheetData';
import ButtonsBelowSheet from '../ButtonsBelowSheet';
import {
  addScStatus,
  publishScSectionData,
  savePerformanceData,
  saveWeightUpdate
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
    weight: 0,
    percentage: 0,
    evaluation: { value: 0, state: 'CHANGED' },
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
      setDailyBusinessFields(
        determineStatesForPropertyArray(
          sc,
          user.isReviewerInSc(sc),
          'dailyBusiness',
          dailyBusinessFields
        )
      );
      setProjectFields(
        determineStatesForPropertyArray(
          sc,
          user.isReviewerInSc(sc),
          'project',
          projectFields
        )
      );
      setSkillsInTheFieldsFields(
        determineStatesForProperty(
          sc,
          user.isReviewerInSc(sc),
          'skillsInTheFields',
          skillsInTheFieldsFields
        )
      );
      setImpactOnTeamFields(
        determineStatesForProperty(
          sc,
          user.isReviewerInSc(sc),
          'impactOnTeam',
          impactOnTeamFields
        )
      );
      setServiceQualityFields(
        determineStatesForProperty(
          sc,
          user.isReviewerInSc(sc),
          'serviceQuality',
          serviceQualityFields
        )
      );
      setImpactOnCompanyFields(
        determineStatesForProperty(
          sc,
          user.isReviewerInSc(sc),
          'impactOnCompany',
          impactOnCompanyFields
        )
      );

      const privateData = user.isReviewerInSc(sc)
        ? sc.privateReviewerData
        : sc.privateEmployeeData;
      setPerformanceWeightPercentage(100 - privateData.skillsWeightPercentage);
      setPrCategoriesWeightPercentage(privateData.skillsWeightPercentage);
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
    const prPercentage = type === CATEGORY.PR_CATEGORIES ? value : 100 - value;
    setPrCategoriesWeightPercentage(prPercentage);
    setPerformanceWeightPercentage(100 - prPercentage);

    const privateSpace = user.isReviewerInSc(sc)
      ? sc.privateReviewerData
      : sc.privateEmployeeData;
    privateSpace.skillsWeightPercentage = prPercentage;
    sc.publishedReviewerData.skillsWeightPercentage = prPercentage;
    sc.publishedEmployeeData.skillsWeightPercentage = prPercentage;
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
    downloadScAsPdf(sc.id, sc.deadline, sc.employee.login, error);
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

  const handleChangeWeight = (value, type, index) => {
    const weightDTO = {
      field: type,
      index: index,
      weight: value
    };
    const afterUpdate = () => {
      const scSpacesToUpdate = user.isReviewerInSc(sc)
        ? [
            sc.privateReviewerData,
            sc.publishedReviewerData,
            sc.publishedEmployeeData
          ]
        : [
            sc.publishedReviewerData,
            sc.privateEmployeeData,
            sc.publishedEmployeeData
          ];
      if (type === CATEGORY.DAILY_BUSINESS) {
        dailyBusinessFields[index].weight = value;
        setDailyBusinessFields([...dailyBusinessFields]);
        scSpacesToUpdate.forEach(space => {
          space[type][index].weight = value;
        });
      }
      if (type === CATEGORY.PROJECT) {
        projectFields[index].weight = value;
        setProjectFields([...projectFields]);
        scSpacesToUpdate.forEach(space => {
          space[type][index].weight = value;
        });
      }

      if (type === CATEGORY.SERVICE_QUALITY) {
        serviceQualityFields.weight = value;
        setServiceQualityFields({ ...serviceQualityFields });
        scSpacesToUpdate.forEach(space => {
          space[type].weight = value;
        });
      }

      if (type === CATEGORY.COMPANY_IMPACT) {
        impactOnCompanyFields.weight = value;
        setImpactOnCompanyFields({ ...impactOnCompanyFields });
        scSpacesToUpdate.forEach(space => {
          space[type].weight = value;
        });
      }
      if (type === CATEGORY.SKILLS_IN_THE_FIELDS) {
        skillsInTheFieldsFields.weight = value;
        setSkillsInTheFieldsFields({ ...skillsInTheFieldsFields });
        scSpacesToUpdate.forEach(space => {
          space[type].weight = value;
        });
      }
      if (type === CATEGORY.TEAM_IMPACT) {
        impactOnTeamFields.weight = value;
        setImpactOnTeamFields({ ...impactOnTeamFields });
        scSpacesToUpdate.forEach(space => {
          space[type].weight = value;
        });
      }
    };
    saveWeightUpdate(sc.id, weightDTO, info, error, afterUpdate);
  };

  return (
    <Fragment>
      <Performance
        sc={sc}
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
        handleChangeWeight={handleChangeWeight}
      />
      <PrCategories
        sc={sc}
        fieldsDisabled={fieldsDisabled}
        skillsInTheFieldsFields={skillsInTheFieldsFields}
        impactOnTeamFields={impactOnTeamFields}
        serviceQualityFields={serviceQualityFields}
        isReviewer={user.isReviewerInSc(sc)}
        impactOnCompanyFields={impactOnCompanyFields}
        handleChangePrCategories={handleChangePrCategories}
        prCategoriesWeightPercentage={prCategoriesWeightPercentage}
        handleChangeWeightPercentage={handleChangeWeightPercentage}
        handleChangeWeight={handleChangeWeight}
      />
      <FinalScoreSection isReady={isReady(sc)} finalScore={finalScore} />
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
