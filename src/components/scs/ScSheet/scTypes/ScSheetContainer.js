import React, { Fragment, useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import { useUserinfoContext } from '../../../../helper/contextHooks';
import cloneDeep from '../../../../helper/cloneDeep';
import { allowEditFields } from '../helperFunc';
import { CATEGORY } from '../../../../helper/scSheetData';
import ScSheetWithPr from './ScSheetWithPr';
import ScSheetWithoutPr from './ScSheetWithoutPr';

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
  const initialFieldsData = {
    title: '',
    weight: 1,
    percentage: 0,
    evaluation: 3,
    description: '',
    achievement: '',
    comment: ''
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

  return (
    <Fragment>
      {scWithPr ? (
        <ScSheetWithPr
          fieldsDisabled={fieldsDisabled}
          addSubcategory={addSubcategory}
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
