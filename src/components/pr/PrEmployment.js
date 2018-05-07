import React from 'react';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles/index';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

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
    const { prById } = this.props;
    const { classes } = this.props;
    console.log(prById);
    return (
      <Paper>
        {prById.employee.employment.endOfProbationPeriod ? (
          <List>
            <ListItem>
              <ListItemText>
                <div>
                  <Typography className={classes.title}>
                    Ende der Probezeit:
                  </Typography>
                  <Typography className={classes.listItems}>
                    {`${moment(
                      prById.employee.employment.endOfProbationPeriod
                    ).format('DD.MM.YY')}`}
                  </Typography>
                </div>
              </ListItemText>
            </ListItem>
          </List>
        ) : (
          ''
        )}
        <Divider />

        {prById.employee.employment.leaves.maternityLeave ? (
          <List>
            <ListItem>
              <ListItemText>
                <div>
                  <Typography className={classes.title}>
                    Mutterschutz:
                  </Typography>

                  {prById.employee.employment.leaves.maternityLeave.map(
                    maternityLeave => {
                      return (
                        <Typography
                          className={classes.listItems}
                          key={prById.employee.employment.leaves.maternityLeave.indexOf(
                            maternityLeave
                          )}
                        >
                          {`${moment(maternityLeave.from).format(
                            'DD.MM.YY'
                          )} bis ${moment(maternityLeave.to).format(
                            'DD.MM.YY'
                          )}`}
                        </Typography>
                      );
                    }
                  )}
                </div>
              </ListItemText>
            </ListItem>
          </List>
        ) : (
          ''
        )}
        <Divider />
        {prById.employee.employment.leaves.parentalLeave ? (
          <List>
            <ListItem>
              <ListItemText>
                <div>
                  <Typography className={classes.title}>Elternzeit:</Typography>

                  {prById.employee.employment.leaves.parentalLeave.map(
                    parentalLeave => {
                      return (
                        <Typography
                          className={classes.listItems}
                          key={prById.employee.employment.leaves.parentalLeave.indexOf(
                            parentalLeave
                          )}
                        >
                          {` ${moment(parentalLeave.from).format(
                            'DD.MM.YY'
                          )} bis ${moment(parentalLeave.to).format(
                            'DD.MM.YY'
                          )}`}
                        </Typography>
                      );
                    }
                  )}
                </div>
              </ListItemText>
            </ListItem>
          </List>
        ) : (
          ''
        )}
        <Divider />
        {prById.employee.employment.leaves.sabbatical ? (
          <List>
            <ListItem>
              <ListItemText>
                <div>
                  <Typography className={classes.title}>
                    Forschungsurlaub:
                  </Typography>
                  {prById.employee.employment.leaves.sabbatical.map(
                    sabbatical => {
                      return (
                        <Typography
                          className={classes.listItems}
                          key={prById.employee.employment.leaves.sabbatical.indexOf(
                            sabbatical
                          )}
                        >
                          {` ${moment(sabbatical.from).format(
                            'DD.MM.YY'
                          )} bis ${moment(sabbatical.to).format('DD.MM.YY')}`}
                        </Typography>
                      );
                    }
                  )}
                </div>
              </ListItemText>
            </ListItem>
          </List>
        ) : (
          ''
        )}
        <Divider />
        {prById.employee.employment.leaves.unpaidLeave ? (
          <List>
            <ListItem>
              <ListItemText>
                <div>
                  <Typography className={classes.title}>
                    Unbezahlter Urlaub:
                  </Typography>
                  {prById.employee.employment.leaves.unpaidLeave.map(
                    unpaidLeave => {
                      return (
                        <Typography
                          className={classes.listItems}
                          key={prById.employee.employment.leaves.unpaidLeave.indexOf(
                            unpaidLeave
                          )}
                        >
                          {` ${moment(unpaidLeave.from).format(
                            'DD.MM.YY'
                          )} bis ${moment(unpaidLeave.to).format('DD.MM.YY')}`}
                        </Typography>
                      );
                    }
                  )}
                </div>
              </ListItemText>
            </ListItem>
          </List>
        ) : (
          ''
        )}
        <Divider />
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
