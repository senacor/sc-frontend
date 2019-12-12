import React, { Fragment, memo } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import ScRow from './ScRow';

const styles = theme => ({
  scRowContainer: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    transition: '0.3s',
    '&:hover': {
      transform: 'scale(1.01)',
      border: `1px solid ${theme.palette.secondary.main}`,
      background: theme.palette.secondary.brighterGrey
    }
  },
  removeIcon: {
    position: 'relative',
    float: 'right'
  },
  textsContainer: {
    padding: theme.spacing.unit * 2
  },
  textCenter: {
    textAlign: 'center',
    margin: 'auto'
  },
  percentage: {
    margin: 'auto',
    textAlign: 'center'
  },
  percentageText: {
    paddingBottom: theme.spacing.unit
  },
  input: {
    minHeight: 150
  }
});

const ScRows = memo(
  ({
    intl,
    classes,
    title,
    description,
    achievement,
    fields,
    action,
    removeSubcategory,
    type,
    fieldsDisabled,
    dialogOpen,
    fieldsAmount
  }) => {
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

export default injectIntl(withStyles(styles)(ScRows));
