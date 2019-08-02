import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';

import PrOverallFulfillment from './PrOverallFulfillment';
import PrOverallComment from './PrOverallComment';
import TargetRole from './TargetRole';
import Typography from '@material-ui/core/Typography/Typography';
import { injectIntl } from 'react-intl';

const styles = {
  containerListItem: {
    display: 'flex',
    clear: 'right'
  },
  rightLegend: {
    marginRight: '6%',
    float: 'right',
    textAlign: 'blockscope'
  }
};

const PrOverallAssessment = props => {
  const {
    prById,
    classes,
    readOnly,
    isActionPerformer,
    nonActionPerformer,
    errorFlag,
    intl
  } = props;

  return (
    <div>
      <div className={classes.containerListItem}>
        <PrOverallFulfillment
          prById={prById}
          category="FULFILLMENT_OF_REQUIREMENT"
          readOnly={readOnly}
          isActionPerformer={isActionPerformer}
          nonActionPerformer={nonActionPerformer}
          openEditing={props.openEditing}
        />
      </div>
      <div className={classes.rightLegend}>
        <Typography
          variant={'caption'}
          color={'textSecondary'}
          className={classes.legendSlider}
        >
          {intl.formatMessage({
            id: 'proverallassessment.suitability'
          })}
        </Typography>
      </div>
      <div className={classes.containerListItem}>
        <TargetRole
          prById={prById}
          readOnly={readOnly}
          isActionPerformer={isActionPerformer}
          nonActionPerformer={nonActionPerformer}
          openEditing={props.openEditing}
        />
      </div>
      <div>
        <PrOverallComment
          prById={prById}
          category="FULFILLMENT_OF_REQUIREMENT"
          readOnly={readOnly}
          isActionPerformer={isActionPerformer}
          nonActionPerformer={nonActionPerformer}
          errorFlag={errorFlag}
          openEditing={props.openEditing}
        />
      </div>
    </div>
  );
};

export const StyledComponentOA = withStyles(styles)(PrOverallAssessment);
export default injectIntl(StyledComponentOA);
