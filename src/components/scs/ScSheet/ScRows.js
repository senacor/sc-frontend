import React, { Fragment, memo } from 'react';
import { injectIntl } from 'react-intl';
import ScRow from './ScRow';
import { CATEGORY } from '../../../helper/scSheetData';

const ScRows = memo(
  ({
    intl,
    title,
    description,
    achievement,
    fields,
    action,
    type,
    fieldsDisabled,
    removeSubcategory,
    isReviewer,
    isScEvaluated,
    fieldsAmount,
    handleChangeWeight
  }) => {
    return (
      <Fragment>
        {fields.map((row, index) => {
          return (
            <ScRow
              key={index}
              index={index}
              isReviewer={isReviewer}
              isScEvaluated={isScEvaluated}
              removable={type === CATEGORY.PROJECT ? true : fields.length > 1}
              row={row}
              fieldsDisabled={fieldsDisabled}
              fieldsAmount={fieldsAmount}
              title={title}
              description={description}
              achievement={achievement}
              action={(type, fieldKey, e) => {
                action(type, index, fieldKey, e);
              }}
              type={type}
              removeSubcategory={removeSubcategory}
              handleChangeWeight={value => handleChangeWeight(value, index)}
            />
          );
        })}
      </Fragment>
    );
  },
  (prevProps, nextProps) => prevProps.fields === nextProps.fields
);

export default injectIntl(ScRows);
