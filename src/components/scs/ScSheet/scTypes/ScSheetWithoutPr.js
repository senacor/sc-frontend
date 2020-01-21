import React, { Fragment, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import Performance from '../categories/Performance';
import WorkEfficiency from '../categories/WorkEfficiency';
import WorkQuality from '../categories/WorkQuality';
import FinalScoreSection from '../FinalScoreSection';
import { reduceWeights } from '../calculations/helperFunctions';
import { checkEvaluationsFilledWithoutPR } from '../evaluationsCheck';
import {
  calculateFinalScoreWithoutPr,
  calculatePercentageWithoutPr
} from '../calculations/scWithoutPr';
import { SC_STATUS } from '../../../../helper/scSheetData';
import ButtonsBelowSheet from '../ButtonsBelowSheet';
import {
  savePerformanceData,
  addScStatus,
  publishScSectionData
} from '../../../../calls/sc';
import { downloadScAsPdf } from '../helperFunc.js';
import {
  useErrorContext,
  useInfoContext,
  useUserinfoContext
} from '../../../../helper/contextHooks';
import {
  determineStatesForProperty,
  determineStatesForPropertyArray,
  mapToDTO,
  wrapPropertiesIntoObject
} from '../../../../helper/wrapping';

const styles = () => ({});

const ScSheetWithoutPr = ({
  sc,
  setSc,
  setIsLoading,
  validateTitles,
  fieldsDisabled,
  handleChangePerformance,
  initialFieldsData,
  dailyBusinessFields,
  setDailyBusinessFields,
  projectFields,
  setProjectFields,
  addSubcategory,
  removeSubcategory,
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
          true,
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
        setDailyBusinessFields(
          determineStatesForPropertyArray(sc, false, 'dailyBusiness')
        );
        setProjectFields(determineStatesForPropertyArray(sc, false, 'project'));
        setWorkEfficiencyFields(
          determineStatesForProperty(sc, false, 'workEfficiency')
        );
        setWorkQualityFields(
          determineStatesForProperty(sc, false, 'workQuality')
        );
      } else if (user.isReviewerInSc(sc)) {
        setDailyBusinessFields(
          determineStatesForPropertyArray(sc, true, 'dailyBusiness')
        );
        setProjectFields(determineStatesForPropertyArray(sc, false, 'project'));
        setWorkEfficiencyFields(
          determineStatesForProperty(sc, true, 'workEfficiency')
        );
        setWorkQualityFields(
          determineStatesForProperty(sc, true, 'workEfficiency')
        );
      }
    },
    [sc]
  );

  const handleChangeWorkEfficiency = (type, propKey, event) => {
    const values = { ...workEfficiencyFields };
    values[propKey] = event.target.value;
    wrapPropertiesIntoObject(values, propKey);
    setWorkEfficiencyFields(values);
  };

  const handleChangeWorkQuality = (type, propKey, event) => {
    const values = { ...workQualityFields };
    values[propKey] = event.target.value;
    wrapPropertiesIntoObject(values, propKey);
    setWorkQualityFields(values);
  };

  const handlePublish = withEvaluation => {
    const data = {
      dailyBusiness: dailyBusinessFields.map(mapToDTO),
      project: projectFields.map(mapToDTO),
      workEfficiency: mapToDTO(workEfficiencyFields),
      workQuality: mapToDTO(workQualityFields)
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

  const handleSave = () => {
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
      error,
      setSc,
      setIsLoading,
      afterScFetched
    );
  };

  const areAllEvaluationsFilled = () => {
    return checkEvaluationsFilledWithoutPR(
      true,
      dailyBusinessFields,
      projectFields,
      workEfficiencyFields,
      workQualityFields
    );
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
        removeSubcategory={removeSubcategory}
        isReviewer={user.isReviewerInSc(sc)}
      />
      <WorkEfficiency
        fieldsDisabled={fieldsDisabled}
        workEfficiencyFields={workEfficiencyFields}
        handleChangeWorkEfficiency={handleChangeWorkEfficiency}
        isReviewer={user.isReviewerInSc(sc)}
      />
      <WorkQuality
        fieldsDisabled={fieldsDisabled}
        workQualityFields={workQualityFields}
        handleChangeWorkQuality={handleChangeWorkQuality}
        isReviewer={user.isReviewerInSc(sc)}
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

export default injectIntl(withStyles(styles)(ScSheetWithoutPr));
