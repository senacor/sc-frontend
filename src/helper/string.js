// Replacing "_" with " " and setting only first letter as capital
// Example use: pr occasion
export const modifyString = string => {
  const replacedStr =
    string.charAt(0).toUpperCase() +
    string
      .slice(1)
      .toLowerCase()
      .replace(/_/g, ' ');
  return replacedStr;
};

export const mapPosition = key => {
  const position = {
    SPECIALIST: 'Specialist',
    SENIOR_EXPERT: 'Senior Expert',
    SENIOR_MANAGEMENT: 'Senior Management',
    LEAD_EXPERT: 'Lead Expert',
    LEAD_MANAGEMENT: 'Lead Management'
  };
  return position[key];
};
