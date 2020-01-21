export const wrapPropertiesIntoObject = (newObjectValue, propKey) => {
  //wrapping values into object in case of: evaluation/description/achievement/comment
  if ('evaluation,description,achievement,comment'.includes(propKey)) {
    newObjectValue[propKey] = {
      value: newObjectValue[propKey],
      state: 'CHANGED'
    };
  }
};

export const determineStatesForPropertyArray = (sc, isReviewer, property) => {
  //isReviewer: Employee = false or Reviewer = true
  //property: 'dailyBusiness' or 'project'...

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
    return {
      ...rsf[goalIndex],
      evaluation: compareField(goalIndex, 'evaluation'),
      // OLD: evaluation:
      //   typeof privateSpace[property].evaluation === 'number'
      //     ? privateSpace[property].evaluation
      //     : 1,
      description: compareField(goalIndex, 'description'),
      achievement: compareField(goalIndex, 'achievement'),
      comment: compareField(goalIndex, 'comment')
    };
  });
};

export const determineStatesForProperty = (sc, isReviewer, property) => {
  //isReviewer: Employee = false or Reviewer = true
  //property: 'skillsInTheFields', 'impactOnTeam'...

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

  return {
    ...rsf,
    evaluation: compareField('evaluation'),
    // OLD: evaluation:
    //   typeof privateSpace[property].evaluation === 'number'
    //     ? privateSpace[property].evaluation
    //     : 1,
    description: compareField('description'),
    achievement: compareField('achievement'),
    comment: compareField('comment')
  };
};

export const mapToDTO = field => {
  return {
    title: field.title,
    evaluation:
      typeof field.evaluation.value === 'number' ? field.evaluation.value : 1,
    percentage: field.percentage,
    description: field.description.value,
    achievement: field.achievement.value,
    weight: field.weight,
    comment: field.comment.value
  };
};
