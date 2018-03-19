import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import withLoading from '../hoc/Loading';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

export class PR extends React.Component {
  constructor(props) {
    super();
    this.state = {
      prs: props.prs
    };
  }

  render() {
    const { prs } = this.props;
    return (
      <div>
        {prs.map(pr => {
          return (
            <List component="pr">
              <ListItem>{pr.occasion}</ListItem>
              <ListItem>{pr.employee}</ListItem>
              <ListItem>{pr.supervisor}</ListItem>
              <Divider />
            </List>
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
)(withLoading(props => props.fetchPrs())(PR));
