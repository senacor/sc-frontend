import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles/index';
import { debounce } from '../../helper/debounce';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { isSupervisor } from '../../helper/checkRole';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '5px 0px',
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  },
  nestedText: {
    paddingLeft: '0px'
  },
  nestedListItem: {
    width: '80%',
    paddingBottom: '0px'
  },
  comment: {
    paddingLeft: '24px',
    paddingRight: '24px',
    color: '#26646d',
    fontStyle: 'italic'
  }
});

class PrSheetEmployee extends React.Component {
  constructor(props) {
    super(props);

    let reflectionSet = this.props.prById.prReflectionSet.find(
      prReflection => prReflection.prReflectionField === this.props.category
    );

    this.state = {
      text: reflectionSet ? reflectionSet.text : ''
    };
  }

  handleChangeComment = (prById, category) => event => {
    this.setState({ text: event.target.value });

    let reflectionSet = prById.prReflectionSet.find(
      prReflection => prReflection.prReflectionField === category
    );

    this.sendComment(prById, category, event.target.value, reflectionSet.id);
  };

  sendComment = debounce(this.props.addEmployeeContribution, 500);

  translateCategoryName = categoryName => {
    switch (categoryName) {
      case 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT':
        return 'Reflektion Beitrag des Vorgesetzten und Umfeld zur eigenen Entwicklung';
      case 'ROLE_AND_PROJECT_ENVIRONMENT':
        return 'Rolle und Projektumfeld';
      default:
        return 'Reflektion Beitrag des Vorgesetzten und Umfeld zur eigenen Entwicklung';
    }
  };

  placeholder = categoryName => {
    switch (categoryName) {
      case 'ROLE_AND_PROJECT_ENVIRONMENT':
        return 'Beschreibung Projekt, Aufgabe und Rolle';
      case 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT':
        return 'Was ist mir für meine Entwicklung wichtig? Welchen Beitrag leistet mein Umfeld und mein Vorgesetzter, was sollte sich ändern und wie kann ich dazu beitragen?';
      default:
        return 'Was ist mir für meine Entwicklung wichtig? Welchen Beitrag leistet mein Umfeld und mein Vorgesetzter, was sollte sich ändern und wie kann ich dazu beitragen?';
    }
  };

  render() {
    const { prById, category, classes } = this.props;
    return (
      <div>
        <ListItem className={classes.nestedListItem}>
          <ListItemText secondary={this.translateCategoryName(category)} />
        </ListItem>
        <List component="div" disablePadding className={classes.nestedText}>
          <ListItem>
            {isSupervisor(this.props.userroles) ? (
              <Typography className={classes.comment} variant="body1">
                {this.state.text ? this.state.text : 'Noch kein Eintrag'}
              </Typography>
            ) : (
              <TextField
                id={category + '_CommentId'}
                multiline
                fullWidth
                rows="4"
                rowsMax="4"
                margin="none"
                helperText={this.placeholder(category)}
                value={this.state.text ? this.state.text : ''}
                onChange={this.handleChangeComment(prById, category)}
                InputProps={{
                  disableUnderline: true,
                  name: 'comment',
                  classes: {
                    input: classes.bootstrapInput
                  }
                }}
                InputLabelProps={{
                  shrink: true
                }}
                FormHelperTextProps={{
                  margin: 'none'
                }}
              />
            )}
          </ListItem>
        </List>
      </div>
    );
  }
}

export const StyledComponent = withStyles(styles)(PrSheetEmployee);
export default connect(
  state => ({
    userroles: state.userroles,
    prEmployeeContribution: state.prEmployeeContributions.prEmployeeContribution
  }),
  {
    addEmployeeContribution: actions.addEmployeeContribution
  }
)(StyledComponent);
