export const classifications = [
  'Specialist',
  'Senior Expert',
  'Senior Management',
  'Lead Expert',
  'Lead Management'
];

export const positions = [
  'Assistant',
  'Expert',
  'Manager',
  'Partner',
  'Senior Specialist',
  'Specialist'
];

export const departments = [
  'Accounting',
  'Corporate-Controlling',
  'Finance',
  'FIS',
  'Geschäftsbereichs-Controlling',
  'HR',
  'IT Administration',
  'IT Servicedesk',
  'Legal',
  'Marketing/PR',
  'Office Services',
  'Payroll',
  'Personal Development',
  'Projektcontrolling',
  'Recruiting',
  'TBD',
  'Travel Services'
];

export const scStatuses = [
  'sc.phase.preparation',
  'sc.phase.inProgress',
  'sc.phase.ready',
  'sc.phase.closed',
  'sc.phase.archived',
  'sc.phase.noSc'
];

export const locations = [
  'Berlin',
  'Bonn',
  'Frankfurt',
  'Hamburg',
  'Košice',
  'Leipzig',
  'München',
  'Nürnberg',
  'Stuttgart',
  'Wien'
];

export const scDepartmentMenu = [
  'Accounting',
  'Corporate-Controlling',
  'Finance',
  'FIS',
  'Geschäftsbereichs-Controlling',
  'HR',
  'IT Administration',
  'IT Servicedesk',
  'Legal',
  'Marketing/PR',
  'Office Services',
  'Payroll',
  'Personal Development',
  'Projektcontrolling',
  'Recruiting',
  'Travel Services',
  'TBD'
];


export const convertToStatusEnum = filterInputsStatus => {
  return filterInputsStatus.map(statusId => {
    if (statusId === 'sc.phase.preparation') return 'INITIALIZATION';
    if (statusId === 'sc.phase.inProgress') return 'IN_PROGRESS';
    if (statusId === 'sc.phase.ready') return 'READY_TO_CLOSE';
    if (statusId === 'sc.phase.closed') return 'DONE';
    if (statusId === 'sc.phase.archived') return 'ARCHIVED';
    if (statusId === 'sc.phase.noSc') return null;
    return '';
  });
};
