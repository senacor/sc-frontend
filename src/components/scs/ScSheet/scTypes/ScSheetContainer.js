import React, { Fragment, useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import { useUserinfoContext, useErrorContext } from '../../../../helper/contextHooks';
import cloneDeep from '../../../../helper/cloneDeep';
import { allowEditFields } from '../helperFunc';
import { CATEGORY } from '../../../../helper/scSheetData';
import ScSheetWithPr from './ScSheetWithPr';
import ScSheetWithoutPr from './ScSheetWithoutPr';
import { addGoal, removeGoal } from '../../../../calls/sc';
import { wrapPropertiesIntoObject } from '../../../../helper/wrapping';

const styles = theme => ({
  ...theme.styledComponents,
  addProjectButton: {
    color: theme.palette.secondary.yellow
  }
});

const ScSheetContainer = ({
  sc,
  scWithPr,
  setSc,
  setIsLoading,
  afterScFetched,
  tabValue
}) => {
  const error = useErrorContext();
  const initialFieldsData = {
    title: '',
    weight: 1,
    percentage: 0,
    evaluation: { value: 3, state: 'CHANGED' },
    description: { value: '', state: 'CHANGED' },
    achievement: { value: '', state: 'CHANGED' },
    comment: { value: '', state: 'CHANGED' }
  };
  const user = useUserinfoContext();
  const [fieldsDisabled, setFieldsDisabled] = useState(true);
  const [dailyBusinessFields, setDailyBusinessFields] = useState([
    { ...initialFieldsData }
  ]);
  const [projectFields, setProjectFields] = useState([
    { ...initialFieldsData }
  ]);

  useEffect(
    () => {
      setFieldsDisabled(
        !allowEditFields(
          user.isOwnerInSc(sc),
          user.isReviewerInSc(sc),
          sc.statusSet
        )
      );
    },
    [sc, tabValue]
  );

  const validateTitles = () => {
    let arr = [];
    const textIsTruthy = string => string.length > 0;
    dailyBusinessFields.forEach(el => {
      arr.push(el.title);
    });
    projectFields.forEach(el => {
      arr.push(el.title);
    });
    return arr.every(textIsTruthy);
  };

  const handleChangePerformance = (type, i, propKey, event) => {
    if (type === CATEGORY.DAILY_BUSINESS) {
      const values = cloneDeep(dailyBusinessFields);
      const newObjectValue = { ...values[i] };
      newObjectValue[propKey] = event.target.value;

      //wrapping values into object in case of: evaluation/description/achievement/comment
      wrapPropertiesIntoObject(newObjectValue, propKey);

      values[i] = newObjectValue;
      setDailyBusinessFields(values);
    } else if (type === CATEGORY.PROJECT) {
      const values = cloneDeep(projectFields);
      const newObjectValue = { ...values[i] };
      newObjectValue[propKey] = event.target.value;

      //wrapping values into object in case of: evaluation/description/achievement/comment
      wrapPropertiesIntoObject(newObjectValue, propKey);

      values[i] = newObjectValue;
      setProjectFields(values);
    }
  };

  const addSubcategory = (type, goal) => {
    addGoal(sc.id, setSc, type, goal, error);
  };

  const removeSubcategory = (type, index) => {
    removeGoal(sc.id, setSc, type, index, error);
  };

  return (
    <Fragment>
      {scWithPr ? (
        <ScSheetWithPr
          fieldsDisabled={fieldsDisabled}
          addSubcategory={addSubcategory}
          removeSubcategory={removeSubcategory}
          sc={sc}
          tabValue={tabValue}
          validateTitles={validateTitles}
          setSc={setSc}
          setIsLoading={setIsLoading}
          afterScFetched={afterScFetched}
          handleChangePerformance={handleChangePerformance}
          projectFields={projectFields}
          setProjectFields={setProjectFields}
          dailyBusinessFields={dailyBusinessFields}
          setDailyBusinessFields={setDailyBusinessFields}
          initialFieldsData={initialFieldsData}
        />
      ) : (
        <ScSheetWithoutPr
          fieldsDisabled={fieldsDisabled}
          addSubcategory={addSubcategory}
          removeSubcategory={removeSubcategory}
          sc={sc}
          tabValue={tabValue}
          validateTitles={validateTitles}
          setSc={setSc}
          setIsLoading={setIsLoading}
          afterScFetched={afterScFetched}
          handleChangePerformance={handleChangePerformance}
          projectFields={projectFields}
          setProjectFields={setProjectFields}
          dailyBusinessFields={dailyBusinessFields}
          setDailyBusinessFields={setDailyBusinessFields}
          initialFieldsData={initialFieldsData}
        />
      )}
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(ScSheetContainer));
