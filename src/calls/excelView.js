import { default as fetch } from '../helper/customFetch';
import { dateString } from '../helper/date';

export const downloadExcel = filter => async () => {
  let query = searchQuery(filter);
  let filename = filenameString(filter);

  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v3/hr/overview/export${query}`
  );
  if (response.ok) {
    const blob = await response.blob();
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    document.body.removeChild(a);
  }
};

const searchQuery = filter => {
  let query = '';
  if (filter) {
    let filterString = Object.keys(filter)
      .map(function(key) {
        return filter[key].searchString;
      })
      .join('&');
    query = filterString ? '?' + filterString : '';
  }
  return query;
};

const filenameString = filter => {
  let info = '';
  if (filter) {
    if (filter.competence) {
      for (let i = 0; i < filter.competence.values.length; i++) {
        info += '_' + filter.competence.values[i];
      }
    }
    if (filter.employee) {
      info += '_Mitarbeiter-' + filter.employee.values;
    }
    if (filter.supervisor) {
      info += '_Vorgesetzter-' + filter.supervisor.values;
    }
    if (filter.reviewer) {
      info += '_Bewerter-' + filter.reviewer.values;
    }
    if (filter.occasion) {
      info += '_Grund';
      for (let i = 0; i < filter.occasion.values.length; i++) {
        info += '-' + filter.occasion.values[i];
      }
    }
    if (filter.isEmployeePreparationDone) {
      info += '_Mitarbeiter ausgefuellt';
      for (let i = 0; i < filter.isEmployeePreparationDone.values.length; i++) {
        info += '-' + filter.isEmployeePreparationDone.values[i];
      }
    }
    if (filter.isReviewerPreparationDone) {
      info += '_Beurteiler ausgefuellt';
      for (let i = 0; i < filter.isReviewerPreparationDone.values.length; i++) {
        info += '-' + filter.isReviewerPreparationDone.values[i];
      }
    }
    if (filter.deadline) {
      info +=
        '_Zeitraum-' +
        filter.deadline.values.From +
        '-bis-' +
        filter.deadline.values.To;
    }
    if (filter.inProgress) {
      for (let i = 0; i < filter.inProgress.values.length; i++) {
        info += '_' + filter.inProgress.values[i];
      }
    }
    if (filter.isHumanResourceProcessingDone) {
      info += '_Hr-archiviert';
      for (
        let i = 0;
        i < filter.isHumanResourceProcessingDone.values.length;
        i++
      ) {
        info += '-' + filter.isHumanResourceProcessingDone.values[i];
      }
    }
  }
  return dateString() + '_Uebersicht-Prs' + info + '.xlsx';
};
