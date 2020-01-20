import React, { Fragment, useEffect, useState } from 'react';
import Performance from '../categories/Performance';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import PrCategories from '../categories/PrCategories';
import FinalScoreSection from '../FinalScoreSection';
import { reduceWeights } from '../calculations/helperFunctions';
import {
  calculateFinalScoreWithPr,
  calculatePercentageWithPrPerformance,
  calculatePercentageWithPRPrCategories
} from '../calculations/scWithPr';
import { CATEGORY, SC_STATUS } from '../../../../helper/scSheetData';
import ButtonsBelowSheet from '../ButtonsBelowSheet';
import { savePerformanceData, addScStatus, publishScSectionData } from '../../../../calls/sc';
import {
  useErrorContext,
  useInfoContext,
  useUserinfoContext
} from '../../../../helper/contextHooks';
import { downloadScAsPdf } from '../helperFunc.js';

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
        setDailyBusinessFields(sc.privateEmployeeData.dailyBusiness);
        setProjectFields(sc.privateEmployeeData.project);
        setSkillsInTheFieldsFields(sc.privateEmployeeData.skillsInTheFields);
        setImpactOnTeamFields(sc.privateEmployeeData.impactOnTeam);
        setServiceQualityFields(sc.privateEmployeeData.serviceQuality);
        setImpactOnCompanyFields(sc.privateEmployeeData.impactOnCompany);
        setPerformanceWeightPercentage(
          100 - sc.privateEmployeeData.skillsWeightPercentage
        );
        setPrCategoriesWeightPercentage(
          sc.privateEmployeeData.skillsWeightPercentage
        );
      } else if (user.isReviewerInSc(sc)) {
        setDailyBusinessFields(sc.privateReviewerData.dailyBusiness);
        setProjectFields(sc.privateReviewerData.project);
        setSkillsInTheFieldsFields(sc.privateReviewerData.skillsInTheFields);
        setImpactOnTeamFields(sc.privateReviewerData.impactOnTeam);
        setServiceQualityFields(sc.privateReviewerData.serviceQuality);
        setImpactOnCompanyFields(sc.privateReviewerData.impactOnCompany);
        setPerformanceWeightPercentage(
          100 - sc.privateReviewerData.skillsWeightPercentage
        );
        setPrCategoriesWeightPercentage(
          sc.privateReviewerData.skillsWeightPercentage
        );
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

  const handlePublish = withEvaluation => {
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

    publishScSectionData(sc.id, user.isReviewerInSc(sc) ? 'reviewer' : 'employee', data, withEvaluation, info, setIsLoading, error)
      .then(() => {
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
    console.log("adding status closed");
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
        handlePublish={handlePublish}
        handleCloseSc={handleCloseSc}
        handlePdfDownload={handlePdfDownload}
        sc={sc}
      />
    </Fragment>
  );
};
export default injectIntl(withStyles(styles)(ScSheetWithPr));
