import { default as fetch } from '../helper/customFetch';

export const downloadExcel = async employeeIds => {
  let query = employeeIds.join();

  const response = await fetch(
    `${
      process.env.REACT_APP_API
    }/api/v3/hr/overview/export?employeeIds=${query}`
  );
  if (response.ok) {
    const blob = await response.blob();
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'PrListe.xlsx';
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    document.body.removeChild(a);
  }
};
