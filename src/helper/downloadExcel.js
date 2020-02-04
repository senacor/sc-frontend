import { exportToXlsx } from '../calls/sc';
import { payrollReportXlsx } from '../calls/payrollReports';
import moment from 'moment';
import { EXCEL_NAME_DATE_FORMAT, formatLocaleDateTime } from './date';

export const downloadExcelAllScs = error => {
    const excelName = moment().format(EXCEL_NAME_DATE_FORMAT);

    let promise = exportToXlsx(error);
    handlePromise(promise, `scorecard_report_${excelName}.xlsx`);
};

export const downloadPayrollReport = (report, error) => {
    let promise = payrollReportXlsx(report.id, error);
    let filename = formatLocaleDateTime(report.date, EXCEL_NAME_DATE_FORMAT) + "_SCBewerungexport.xlsx";

    handlePromise(promise, filename);
};

const handlePromise = (promise, filename) => {
    promise.then(response => {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    });
};
