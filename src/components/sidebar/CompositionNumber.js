import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';

const styles = theme => ({
  version: {
    padding: theme.spacing.unit
  }
});

const CompositionNumber = props => {
  const [composition, setComposition] = useState('unknown');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/static/composition-number.json');
        setComposition(await res.json());
      } catch (err) {
        setComposition('localhost');
      }
    };
    fetchData();
  }, []);

  return (
    <div id="composition-number" className={props.classes.version}>
      <Typography color="textSecondary">
        {`${props.intl.formatMessage({
          id: 'compositionnumber.version'
        })} ${composition}`}
      </Typography>
    </div>
  );
};

export default injectIntl(withStyles(styles)(CompositionNumber));
