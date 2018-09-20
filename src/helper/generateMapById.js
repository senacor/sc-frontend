export default function generateMapById(entities, customIdAttribute) {
  let idAttribute = customIdAttribute ? customIdAttribute : 'id';

  const result = {};
  entities.forEach(entity => {
    result[entity[idAttribute]] = entity;
  });

  return result;
}
