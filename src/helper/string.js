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
