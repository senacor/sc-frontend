import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as actions from '../../actions';
import { formatDateForFrontend } from '../../helper/date';

class CstMembers extends Component {
  componentDidMount() {
    this.props.getCstMembers();
  }

  render() {
    const { cstMembers } = this.props;

    return (
      <List>
        {cstMembers &&
          cstMembers.map(cstMember => {
            return (
              <ListItem key={cstMember.id}>
                <Avatar>{`${cstMember.firstName.charAt(
                  0
                )}${cstMember.lastName.charAt(0)}`}</Avatar>
                <ListItemText
                  primary={`${cstMember.firstName} ${cstMember.lastName}`}
                  secondary={`Datum letztes PR: ${formatDateForFrontend(
                    cstMember.dateOfLastPr
                  )}`}
                />
              </ListItem>
            );
          })}
      </List>
    );
  }
}

export default connect(
  state => ({
    cstMembers: state.cstMembers
  }),
  {
    getCstMembers: actions.getCstMembers
  }
)(CstMembers);
