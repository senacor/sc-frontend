import React from 'react';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles/index';
import moment from 'moment';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  title: {
    color: theme.palette.primary['400']
  },
  listItems: {
    paddingLeft: '20px'
  }
});

class PrEmployment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prById: this.props.prById
    };
  }

  render() {
    const { prById, classes } = this.props;

    return (
      <Paper>
        {prById.employee.employment.jobGradings ? (
          <List>
            <ListItem>
              <ListItemText>
                <div>
                  <Typography className={classes.title}>
                    Berufseinstufungen:
                  </Typography>
                  {prById.employee.employment.jobGradings.map(jobGradings => {
                    return (
                      <Typography
                        className={classes.listItems}
                        key={prById.employee.employment.jobGradings.indexOf(
                          jobGradings
                        )}
                      >
                        {`Stufe ${jobGradings.salaryLevel} seit: ${moment(
                          jobGradings.validFrom
                        ).format('DD.MM.YY')}`}
                      </Typography>
                    );
                  })}
                </div>
              </ListItemText>
            </ListItem>
          </List>
        ) : (
          ''
        )}
      </Paper>
    );
  }
}
export default withStyles(styles)(PrEmployment);
