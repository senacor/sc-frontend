import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import withLoading from '../hoc/Loading';

export class PR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prs: props.prs
    };
  }

  render() {
    const { prs } = this.props;
    return (
      <div>
        {prs.map(pr => (
          <Card key={pr.id} id="pr">
            <CardContent>
              <Typography variant="headline" component="h2">
                {pr.occasion}
              </Typography>
              <Typography component="p">{pr.employee}</Typography>
              <Typography component="p">{pr.supervisor}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}

export default connect(
  state => ({
    prs: state.prs.PRList,
    isLoadingPRs: state.prs.isLoadingPRs
  }),
  {
    fetchPrs: actions.fetchPrs
  }
)(withLoading(props => props.fetchPrs())(PR));
