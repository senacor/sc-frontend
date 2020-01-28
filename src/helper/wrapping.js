export const wrapPropertiesIntoObject = (newObjectValue, propKey) => {
  //wrapping values into object in case of: evaluation/description/achievement/comment
  if ('evaluation,description,achievement,comment'.includes(propKey)) {
    newObjectValue[propKey] = {
      value: newObjectValue[propKey],
      state: 'CHANGED'
    };
  }
};

export const determineStatesForPropertyArray = (
  sc,
  isReviewer,
  property,
  stateObject
) => {
  //isReviewer: Employee = false or Reviewer = true
  //property: 'dailyBusiness' or 'project'...
  //stateObject: 'dailyBusinessFields, projectFields' containing
  // real state with also calculated percentage. Those percentage wee need keep

  const publicSpace = isReviewer
    ? sc.publishedReviewerData
    : sc.publishedEmployeeData;
  const privateSpace = isReviewer
    ? sc.privateReviewerData
    : sc.privateEmployeeData;

  //aliases for spaces
  const rsf = privateSpace[property];
  const usf = publicSpace[property];

  //compare description, achievement, weight or comment
  const compareField = (goalIndex, field) => {
    let state;
    if (!usf[goalIndex][field] && !rsf[goalIndex][field]) state = 'PUBLISHED';

    if (usf[goalIndex][field] === rsf[goalIndex][field]) {
      state = 'PUBLISHED';
    } else {
      state = 'SAVED';
    }

    return { value: rsf[goalIndex][field], state: state };
  };

  return rsf.map((goal, goalIndex) => {
    const percentageInfo =
      stateObject && stateObject[goalIndex]
        ? { percentage: stateObject[goalIndex].percentage }
        : {};
    return {
      ...percentageInfo,
      ...rsf[goalIndex],
      evaluation: compareField(goalIndex, 'evaluation'),
      description: compareField(goalIndex, 'description'),
      achievement: compareField(goalIndex, 'achievement'),
      comment: compareField(goalIndex, 'comment')
    };
  });
};

export const determineStatesForProperty = (
  sc,
  isReviewer,
  property,
  stateObject
) => {
  //isReviewer: Employee = false or Reviewer = true
  //property: 'skillsInTheFields', 'impactOnTeam'...
  //stateObject: 'dailyBusinessFields, projectFields' containing
  // real state with also calculated percentage. Those percentage wee need keep

  const publicSpace = isReviewer
    ? sc.publishedReviewerData
    : sc.publishedEmployeeData;
  const privateSpace = isReviewer
    ? sc.privateReviewerData
    : sc.privateEmployeeData;

  //aliases for spaces
  const rsf = privateSpace[property];
  const usf = publicSpace[property];

  //compare description, achievement, weight or comment
  const compareField = field => {
    let state;

    if (!usf[field] && !rsf[field]) state = 'PUBLISHED';

    if (usf[field] === rsf[field]) {
      state = 'PUBLISHED';
    } else {
      state = 'SAVED';
    }

    return { value: rsf[field], state: state };
  };

  const percentageInfo =
    stateObject ? { percentage: stateObject.percentage } : {};
  return {
    ...percentageInfo,
    ...rsf,
    evaluation: compareField('evaluation'),
    description: compareField('description'),
    achievement: compareField('achievement'),
    comment: compareField('comment')
  };
};

export const mapToDTO = field => {
  return {
    title: field.title,
    evaluation:
      typeof field.evaluation.value === 'number' ? field.evaluation.value : 0,
    percentage: field.percentage,
    description: field.description.value,
    achievement: field.achievement.value,
    weight: field.weight,
    comment: field.comment.value
  };
};
