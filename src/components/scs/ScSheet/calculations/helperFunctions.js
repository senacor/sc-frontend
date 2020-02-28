export const reduceWeights = arr => {
  const value = arr.reduce((acc, obj) => {
    return acc + obj.weight;
  }, 0);
  return value;
};

export const multiplyWeightByScoreArr = (arr, useWrappedValue) => {
  const mapArr = arr.map(
    obj =>
      obj.weight * (useWrappedValue ? obj.evaluation.value : obj.evaluation)
  );
  const reducedArr = mapArr.reduce((acc, item) => acc + item);
  return reducedArr;
};

export const round = (value, precision) => {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

export const determineFinalPercentage = score => {
  if (score === 0) return 0;
  if (score <= 1.5) return 75;
  if (score < 2 && score >= 1.5) return 100;
  if (score < 2.5 && score >= 2) return 125;
  if (score < 3 && score >= 2.5) return 150;
  if (score < 3.5 && score >= 3) return 175;
  if (score < 4 && score >= 3.5) return 200;
  if (score < 4.5 && score >= 4) return 225;
  if (score < 4.8 && score >= 4.5) return 250;
  if (score >= 4.8) return 300;
  return 100;
};

export const determineFinalText = score => {
  let value;
  if (score >= 0.5 && score < 1.5) {
    value = 'scsheet.finalText.0.5';
  } else if (score >= 1.5 && score < 2.5) {
    value = 'scsheet.finalText.1.5';
  } else if (score >= 2.5 && score < 3.5) {
    value = 'scsheet.finalText.2.5';
  } else if (score >= 3.5 && score < 4.5) {
    value = 'scsheet.finalText.3.5';
  } else if (score >= 4.5) {
    value = 'scsheet.finalText.4.5';
  } else value = '';
  return value;
};
