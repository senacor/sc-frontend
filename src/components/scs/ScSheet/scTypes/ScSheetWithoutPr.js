import React, { Fragment, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import Performance from '../categories/Performance';
import WorkEfficiency from '../categories/WorkEfficiency';
import WorkQuality from '../categories/WorkQuality';
import FinalScoreSection from '../FinalScoreSection';
import { reduceWeights } from '../calculations/helperFunctions';
import { checkEvaluationsFilledWithoutPR, isReady } from '../evaluationsCheck';
import {
  calculateFinalScoreWithoutPr,
  calculatePercentageWithoutPr
} from '../calculations/scWithoutPr';
import { CATEGORY, SC_STATUS } from '../../../../helper/scSheetData';
import ButtonsBelowSheet from '../ButtonsBelowSheet';
import {
  addScStatus,
  publishScSectionData,
  savePerformanceData,
  saveWeightUpdate
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
  isSafeImportAccess,
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
      setWorkEfficiencyFields(
        determineStatesForProperty(
          sc,
          user.isReviewerInSc(sc),
          'workEfficiency',
          workEfficiencyFields
        )
      );
      setWorkQualityFields(
        determineStatesForProperty(
          sc,
          user.isReviewerInSc(sc),
          'workQuality',
          workQualityFields
        )
      );
    },
    [sc]
  );

  const handleChangeWorkEfficiency = (type, propKey, event) => {
    if (isSafeImportAccess(user, sc, 'workEfficiency')) {
      sc.initScTemplate.data.workEfficiency[propKey] = null;
    }
    const values = { ...workEfficiencyFields };
    values[propKey] = event.target.value;
    wrapPropertiesIntoObject(values, propKey);
    setWorkEfficiencyFields(values);
  };

  const handleChangeWorkQuality = (type, propKey, event) => {
    if (isSafeImportAccess(user, sc, 'workQuality')) {
      sc.initScTemplate.data.workQuality[propKey] = null;
    }
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
          afterScFetched,
          info
        );
      } else if (user.isReviewerInSc(sc)) {
        addScStatus(
          sc.id,
          SC_STATUS.REVIEWER_PUBLISHED,
          setSc,
          setIsLoading,
          error,
          afterScFetched,
          info
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
        afterScFetched,
        info
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
      sc.initScTemplate,
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
    downloadScAsPdf(sc.id, sc.deadline, sc.employee.login, error);
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

      if (type === CATEGORY.WORK_QUALITY) {
        workQualityFields.weight = value;
        setWorkQualityFields({ ...workQualityFields });
        scSpacesToUpdate.forEach(space => {
          space[type].weight = value;
        });
      }

      if (type === CATEGORY.WORK_EFFICIENCY) {
        workEfficiencyFields.weight = value;
        setWorkEfficiencyFields({ ...workEfficiencyFields });
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
        isReviewer={user.isReviewerInSc(sc)}
        handleChangeWeight={handleChangeWeight}
      />
      <WorkEfficiency
        fieldsDisabled={fieldsDisabled}
        workEfficiencyFields={workEfficiencyFields}
        handleChangeWorkEfficiency={handleChangeWorkEfficiency}
        isReviewer={user.isReviewerInSc(sc)}
        handleChangeWeight={handleChangeWeight}
        isManager={sc.classification === 'LEAD_MANAGEMENT'}
      />
      <WorkQuality
        fieldsDisabled={fieldsDisabled}
        workQualityFields={workQualityFields}
        handleChangeWorkQuality={handleChangeWorkQuality}
        isReviewer={user.isReviewerInSc(sc)}
        handleChangeWeight={handleChangeWeight}
        isManager={sc.classification === 'LEAD_MANAGEMENT'}
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

export default injectIntl(withStyles(styles)(ScSheetWithoutPr));
