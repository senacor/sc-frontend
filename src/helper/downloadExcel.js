import { exportToXlsx } from '../calls/sc';
import moment from 'moment';
import { EXCEL_NAME_DATE_FORMAT } from './date';

export const downloadExcelAllScs = error => {
  const excelName = moment().format(EXCEL_NAME_DATE_FORMAT);

  let promise = exportToXlsx(error);

  promise.then(response => {
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `scorecard_report_${excelName}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  });
};
