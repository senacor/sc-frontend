import React from 'react';
import Typography from 'material-ui/Typography';
import * as date from '../../helper/date';

const Deadline = props => {
  if (!props.deadline) {
    return null;
  }

  return (
    <Typography component="p">
      Deadline: {date.formatMomentForFrontend(props.deadline)}
    </Typography>
  );
};

export default Deadline;
