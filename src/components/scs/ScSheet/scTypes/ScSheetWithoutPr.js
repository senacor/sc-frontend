import React, { Fragment, useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import Performance from '../categories/Performance';
import WorkEfficiency from '../categories/WorkEfficiency';
import WorkQuality from '../categories/WorkQuality';
import FinalScoreSection from '../FinalScoreSection';
import { reduceWeights } from '../calculations/helperFunctions';
import { checkEvaluationsFilledWithoutPR } from '../evaluationsCheck';
import {
  calculatePercentageWithoutPr,
  calculateFinalScoreWithoutPr
} from '../calculations/scWithoutPr';
import { SC_STATUS } from '../../../../helper/scSheetData';
import ButtonsBelowSheet from '../ButtonsBelowSheet';
import { savePerformanceData, addScStatus, publishScSectionData} from '../../../../calls/sc';
import { downloadScAsPdf } from '../helperFunc.js';
import {
  useInfoContext,
  useErrorContext,
  useUserinfoContext
} from '../../../../helper/contextHooks';

const styles = () => ({});

const ScSheetWithoutPr = ({
  sc,
  setSc,
  setIsLoading,
  tabValue,
  validateTitles,
  fieldsDisabled,
  handleChangePerformance,
  initialFieldsData,
  dailyBusinessFields,
  setDailyBusinessFields,
  projectFields,
  setProjectFields,
  addSubcategory,
  afterScFetched
}) => {
  const info = useInfoContext();
  const error = useErrorContext();
  const user = useUserinfoContext();
  const [workEfficiencyFields, setWorkEfficiencyFields] = useState({
    ...initialFieldsData
  });
  const [workQualityFields, setWorkQualityFields] = useState({
    ...initialFieldsData
  });
  const [weightsWithoutPR, setWeightsWithoutPR] = useState(7);

  const [finalScore, setFinalScore] = useState(0);

  useEffect(
    () => {
      const totalWeight =
        reduceWeights(dailyBusinessFields) +
        reduceWeights(projectFields) +
        workEfficiencyFields.weight +
        workQualityFields.weight;
      setWeightsWithoutPR(totalWeight);
    },
    [
      dailyBusinessFields,
      projectFields,
      workEfficiencyFields.weight,
      workQualityFields.weight
    ]
  );

  useEffect(
    () => {
      calculatePercentageWithoutPr(
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
    },
    [weightsWithoutPR]
  );

  useEffect(
    () => {
      setFinalScore(
        calculateFinalScoreWithoutPr(
          dailyBusinessFields,
          projectFields,
          workEfficiencyFields,
          workQualityFields,
          weightsWithoutPR
        )
      );
    },
    [
      dailyBusinessFields,
      projectFields,
      workEfficiencyFields.evaluation,
      workEfficiencyFields.weight,
      workQualityFields.evaluation,
      workQualityFields.weight
    ]
  );

  useEffect(
    () => {
      if (user.isOwnerInSc(sc)) {
        setDailyBusinessFields(sc.privateEmployeeData.dailyBusiness);
        setProjectFields(sc.privateEmployeeData.project);
        setWorkEfficiencyFields(sc.privateEmployeeData.workEfficiency);
        setWorkQualityFields(sc.privateEmployeeData.workQuality);
      } else if (user.isReviewerInSc(sc)) {
        setDailyBusinessFields(sc.privateReviewerData.dailyBusiness);
        setProjectFields(sc.privateReviewerData.project);
        setWorkEfficiencyFields(sc.privateReviewerData.workEfficiency);
        setWorkQualityFields(sc.privateReviewerData.workQuality);
      }
    },
    [tabValue]
  );

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
      workEfficiency: mapToDTO(workEfficiencyFields),
      workQuality: mapToDTO(workQualityFields)
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
      workQuality: mapToDTO(workQualityFields)
    };

    savePerformanceData(
      sc.id,
      user.isReviewerInSc(sc) ? 'reviewer' : 'employee',
      data,
      info,
      error
    );
  };

  const areAllEvaluationsFilled = () => {
    return checkEvaluationsFilledWithoutPR(dailyBusinessFields, projectFields, workEfficiencyFields, workQualityFields);
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
      />
      <WorkEfficiency
        fieldsDisabled={fieldsDisabled}
        workEfficiencyFields={workEfficiencyFields}
        handleChangeWorkEfficiency={handleChangeWorkEfficiency}
      />
      <WorkQuality
        fieldsDisabled={fieldsDisabled}
        workQualityFields={workQualityFields}
        handleChangeWorkQuality={handleChangeWorkQuality}
      />
      <FinalScoreSection finalScore={finalScore} />
      <ButtonsBelowSheet
        submitDisabled={!validateTitles()}
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

export default injectIntl(withStyles(styles)(ScSheetWithoutPr));
