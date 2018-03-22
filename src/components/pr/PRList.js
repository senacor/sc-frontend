import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import withLoading from '../hoc/Loading';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles/index';
import Avatar from 'material-ui/Avatar';
import Card, { CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const styles = () => ({
  list: {
    color: '#4d8087',
    backgroundColor: '#63d7ff',
    fontSize: '13px'
  },
  prs: {
    marginBottom: '10px'
  }
});

export class PRList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prs: props.prs
    };
  }
  mapPROccasions = occasion => {
    switch (occasion) {
      case 'ON_DEMAND':
        return 'Auf Nachfrage';
      case 'YEARLY':
        return 'jährlich';
      case 'QUARTERLY':
        return 'vierteljährlich';
      case 'END_PROBATION':
        return 'Ende der Probezeit';
      default:
        return 'Auf Nachfrage';
    }
  };

  render() {
    const { classes, prs } = this.props;
    if (prs.length === 0) {
      return (
        <div>
          {' '}
          <Card>
            <CardHeader
              avatar={<Avatar src="/warning.png" className={classes.avatar} />}
              title="No PRs available"
            />
          </Card>
        </div>
      );
    } else {
      return (
        <div>
          {' '}
          <Typography variant="display1" paragraph>
            Performance Review Liste
          </Typography>
          {prs.map(pr => {
            return (
              <div key={pr.id}>
                <Card className={classes.prs}>
                  <CardHeader
                    avatar={
                      <Avatar
                        src="/supervisor.jpg"
                        className={classes.avatar}
                      />
                    }
                    title={`Grund der PR: ${this.mapPROccasions(pr.occasion)}`}
                    subheader={`supervisor: ${pr.supervisor}`}
                  />
                </Card>
                <Divider inset />
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default connect(
  state => ({
    prs: state.prs.prsList,
    isLoadingPRs: state.prs.isLoadingPRs
  }),
  {
    fetchPrs: actions.fetchPrs
  }
)(withLoading(props => props.fetchPrs())(withStyles(styles)(PRList)));
