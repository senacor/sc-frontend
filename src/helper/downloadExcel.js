import { exportToXlsx } from "../calls/sc";

export const downloadExcelAllScs = error => {
    let promise = exportToXlsx(error);

    promise.then(response => {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `scorecards.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    });
};