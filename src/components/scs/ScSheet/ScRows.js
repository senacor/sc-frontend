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
    removeSubcategory,
    type,
    fieldsDisabled,
    dialogOpen,
    isReviewer,
    fieldsAmount
  }) => {
    return (
      <Fragment>
        {fields.map((row, index) => {
          return (
            <ScRow
              key={index}
              index={index}
              isReviewer={isReviewer}
              row={row}
              fieldsDisabled={fieldsDisabled}
              fieldsAmount={fieldsAmount}
              title={title}
              description={description}
              achievement={achievement}
              action={(type, fieldKey, e) => {
                action(type, index, fieldKey, e);
              }}
              removeSubcategory={() => removeSubcategory(type, index)}
              type={type}
              dialogOpen={dialogOpen}
            />
          );
        })}
      </Fragment>
    );
  },
  (prevProps, nextProps) => prevProps.fields === nextProps.fields
);

export default injectIntl(ScRows);
