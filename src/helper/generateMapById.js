export default function generateMapById(entities, customIdAttribute) {
  let idAttribute = customIdAttribute ? customIdAttribute : 'id';

  const result = {};
  entities.forEach(entity => {
    result[entity[idAttribute]] = entity;
  });

  return result;
}

export function generateMapByIdAndRenameId(
  entities,
  customIdAttribute,
  newIdAttribute
) {
  let idAttribute = customIdAttribute ? customIdAttribute : 'id';
  let newId = newIdAttribute ? newIdAttribute : 'id';

  const result = {};
  entities.forEach(entity => {
    result[entity[idAttribute]] = Object.assign(entity, {
      [newId]: entity[idAttribute]
    });
    delete result[entity[idAttribute]][idAttribute];
  });

  return result;
}
