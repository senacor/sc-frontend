import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles/index';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { isSupervisor } from '../../helper/checkRole';
import * as actions from '../../actions';
import { getPrRatings, getUserroles } from '../../reducers/selector';
import { debounce } from '../../helper/debounce';

const styles = theme => ({
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '3pt 3pt',
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  },
  comment: {
    color: theme.palette.primary['400'],
    fontStyle: 'italic'
  }
});

class PrOverallComment extends Component {
  handleChangeComment = prById => event => {
    this.props.prRating.comment = event.target.value;

    this.setState({ text: event.target.value });

    this.sendComment(
      prById,
      this.props.category,
      event.target.value,
      this.props.prRating.rating,
      this.props.prRating.id
    );
  };

  sendComment = debounce(this.props.addRating, 500);

  render() {
    let {
      category,
      prRating,
      prById,
      classes,
      prVisible,
      prFinalized,
      disabledText
    } = this.props;

    let readOnlyView = () => {
      return disabledText ? (
        <TextField
          id={category}
          disabled={true}
          multiline
          fullWidth
          rows="4"
          rowsMax="4"
          margin="none"
          value={prVisible ? prRating.comment : 'Noch nicht freigegeben.'}
          onChange={this.handleChangeComment(prById)}
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
          helperText={`In welchem Umfang erfüllt die Mitarbeiterin/der Mitarbeiter die
              Anforderungen an seine aktuelle Laufbahnstufe vor dem Hintergrund
              der aktuellen Einstufung? Welche Stärken gilt es auszubauen,
              welche Lücken sollten geschlossen werden?`}
        />
      ) : (
        <Typography
          id={category + '_Description'}
          className={classes.comment}
          variant="body1"
        >
          {prVisible ? prRating.comment : 'Noch nicht freigegeben.'}
        </Typography>
      );
    };

    let insertText = () => {
      return (
        <TextField
          id={category}
          multiline
          fullWidth
          rows="4"
          rowsMax="4"
          margin="none"
          value={prRating.comment ? prRating.comment : ''}
          onChange={this.handleChangeComment(prById)}
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
          helperText={`In welchem Umfang erfüllt die Mitarbeiterin/der Mitarbeiter die
              Anforderungen an seine aktuelle Laufbahnstufe vor dem Hintergrund
              der aktuellen Einstufung? Welche Stärken gilt es auszubauen,
              welche Lücken sollten geschlossen werden?`}
        />
      );
    };

    let writingView = () => {
      return prFinalized ? null : insertText();
    };

    return (
      <List>
        <ListItem>
          <Grid container direction={'column'}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Typography component="p">
                Gesamteinschätzung Freitext (Pflichtfeld)
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              {isSupervisor(this.props.userroles) && !prFinalized
                ? writingView()
                : readOnlyView()}
            </Grid>
          </Grid>
        </ListItem>
      </List>
    );
  }
}

export const StyledComponent = withStyles(styles)(PrOverallComment);
export default connect(
  (state, props) => ({
    prRating: getPrRatings(props.category)(state),
    userroles: getUserroles(state)
  }),
  {
    addRating: actions.addRating
  }
)(StyledComponent);
