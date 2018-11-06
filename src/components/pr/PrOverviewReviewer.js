import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import withLoading from '../hoc/Loading';
import { Link } from 'react-router-dom';
import { getAllPrs } from '../../reducers/selector';
import getDisplayName from '../../helper/getDisplayName';
import { formatDateForFrontend } from '../../helper/date';
import PerformanceReviewsTable from '../humanResources/PerformanceReviewsTable';
import { translateContent } from '../translate/Translate';
import { withStyles } from '@material-ui/core';
import PrOverviewReviewerDelegate from './PrOverviewReviewerDelegate';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  }
});

export class PrOverviewReviewer extends React.Component {
  getColumnDefinitions = () => {
    return [
      {
        numeric: false,
        disablePadding: false,
        label: 'Mitarbeiter',
        sortValue: entry => getDisplayName(entry['employee']),
        render: entry => {
          return (
            <Link to={`/prDetail/${entry.id}`}>
              {getDisplayName(entry['employee'])}
            </Link>
          );
        }
      },
      {
        numeric: true,
        disablePadding: true,
        label: 'Fälligkeit',
        sortValue: entry => entry['deadline'],
        render: entry => formatDateForFrontend(entry['deadline'])
      },
      {
        numeric: false,
        disablePadding: false,
        label: 'Grund',
        sortValue: entry => translateContent(entry['occasion']),
        render: entry => translateContent(entry['occasion'])
      },
      {
        numeric: false,
        disablePadding: true,
        label: 'Vorgesetzte/r',
        sortValue: entry => getDisplayName(entry['supervisor']),
        render: entry => getDisplayName(entry['supervisor'])
      },
      {
        numeric: false,
        disablePadding: true,
        label: 'Bewerter',
        sortValue: entry => getDisplayName(entry['reviewer']),
        render: entry => getDisplayName(entry['reviewer'])
      },
      {
        numeric: false,
        disablePadding: true,
        label: 'MA ausgefüllt',
        sortValue: entry =>
          entry['statuses'].includes('FILLED_SHEET_EMPLOYEE') ? 'ja' : 'nein',
        render: entry =>
          entry['statuses'].includes('FILLED_SHEET_EMPLOYEE') ? 'ja' : 'nein'
      },
      {
        numeric: false,
        disablePadding: true,
        label: 'Beurteiler ausgefüllt',
        sortValue: entry =>
          entry['statuses'].includes('FILLED_SHEET_REVIEWER') ? 'ja' : 'nein',
        render: entry =>
          entry['statuses'].includes('FILLED_SHEET_REVIEWER') ? 'ja' : 'nein'
      },
      {
        numeric: false,
        disablePadding: true,
        label: '',
        sortValue: entry => '',
        render: entry => {
          return <PrOverviewReviewerDelegate prId={entry.id} />;
        }
      }
    ];
  };

  render() {
    const columns = this.getColumnDefinitions();
    return (
      <PerformanceReviewsTable
        columnDefinition={columns}
        orderBy={1}
        data={this.props.data}
      />
    );
  }
}

export const StyledComponent = withStyles(styles)(PrOverviewReviewer);
export default connect(
  state => ({
    data: getAllPrs(state),
    isLoading: state.isLoading
  }),
  {
    fetchPrs: actions.fetchPrs
  }
)(withLoading(props => props.fetchPrs())(StyledComponent));
