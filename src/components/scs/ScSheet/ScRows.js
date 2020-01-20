import React, { Fragment, memo } from 'react';
import { injectIntl } from 'react-intl';
import ScRow from './ScRow';

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
     fieldsAmount,
     canRemoveGoal
    return (
      <Fragment>
        {fields.map((row, index) => {
          return (
            <ScRow
              key={index}
              index={index}
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
              canRemoveGoal={canRemoveGoal}
            />
          );
        })}
      </Fragment>
    );
  },
  (prevProps, nextProps) => prevProps.fields === nextProps.fields
);

export default injectIntl(ScRows);
