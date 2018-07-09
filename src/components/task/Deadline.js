import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as date from '../../helper/date';

const Deadline = props => {
  if (!props.deadline) {
    return null;
  }

  return (
    <Typography component="p">
      Deadline: {date.formatDateForFrontend(props.deadline)}
    </Typography>
  );
};

export default Deadline;
