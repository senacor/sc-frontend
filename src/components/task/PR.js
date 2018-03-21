import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import withLoading from '../hoc/Loading';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles/index';
import Avatar from 'material-ui/Avatar';
import Card, { CardHeader } from 'material-ui/Card';

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

export class PR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prs: props.prs
    };
  }

  render() {
    const { classes, prs } = this.props;
    return (
      <div>
        {prs.map(pr => {
          return (
            <div key={pr.id}>
              <Card className={classes.prs}>
                <CardHeader
                  avatar={
                    <Avatar src="/supervisor.jpg" className={classes.avatar} />
                  }
                  title={pr.occasion}
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

export default connect(
  state => ({
    prs: state.tasks.list,
    isLoadingPRs: state.tasks.isLoading
  }),
  {
    fetchPrs: actions.fetchPrs
  }
)(withLoading(props => props.fetchPrs())(withStyles(styles)(PR)));
