const getById = id => {
  return document.getElementById(id);
};
const getStyle = (el, property) => {
  return window.getComputedStyle(el, null).getPropertyValue(property);
};

export const JSS = {
  TOID: {
    LASTNAME: 'lastName',
    POSITION: 'position',
    SUPERVISOR: 'supervisorName',
    DEPARTMENT: 'department',
    OFFICE: 'officeLocation',
    DATE: 'dateCell',
    STATUS: 'scStatus'
  },
  TTID: {
    LASTNAME: 'tv_lastName',
    POSITION: 'tv_position',
    SUPERVISOR: 'tv_supervisorName',
    DEPARTMENT: 'tv_department',
    OFFICE: 'tv_officeLocation',
    DATE: 'tv_dateCell',
    STATUS: 'tv_scStatus'
  },
  CONTENT_ID: 'tableid',
  TABLE_HEADER_ID: 'tableheaderid',
  FILTER_ID: 'filterid',

  tableHeightAdaptationCallback: () => {
    const dependingEl = getById(JSS.CONTENT_ID);
    const filterEl = getById(JSS.FILTER_ID);
    if (dependingEl && filterEl) {
      const newHeight = filterEl.clientHeight;
      dependingEl.style.height = `calc(100vh - 64px - 24px - 2rem - ${newHeight}px - 16px)`;
      dependingEl.style.height = `calc(100vh - 64px - 24px - 2rem - ${newHeight}px - 16px)`;
    }
  },

  headerRowAdaptationCallback: () => {
    for (let key in JSS.TOID) {
      const valueCell = getById(JSS.TOID[key]);
      const thisCell = getById(JSS.TTID[key]);
      if (valueCell && thisCell) {
        thisCell.style.width = getStyle(valueCell, 'width');
        thisCell.style.paddingRight = getStyle(valueCell, 'padding-right');
        thisCell.style.marginRight = getStyle(valueCell, 'margin-right');
        thisCell.style.marginLeft = getStyle(valueCell, 'margin-left');
        thisCell.style.paddingLeft = getStyle(valueCell, 'padding-left');
        thisCell.getElementsByTagName('span')[0].style.width = 'inherit';
      }
    }
    const tableEl = document.getElementById(JSS.CONTENT_ID);
    if (tableEl) {
      getById(JSS.TABLE_HEADER_ID).style.top =
        '' + tableEl.getBoundingClientRect().top + 'px';
      getById(JSS.TABLE_HEADER_ID).style.width = getStyle(tableEl, 'width');
    }
  }
};
