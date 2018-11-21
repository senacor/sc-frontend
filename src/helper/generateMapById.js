export default function generateMapById(
  entities,
  customIdAttribute,
  newIdAttribute
) {
  let idAttribute = customIdAttribute ? customIdAttribute : 'id';
  let newId = newIdAttribute ? newIdAttribute : 'id';

  let remove =
    newId === idAttribute
      ? () => {}
      : (result, entity) => delete result[entity[idAttribute]][idAttribute];

  const result = {};
  entities.forEach(entity => {
    result[entity[idAttribute]] = Object.assign(entity, {
      [newId]: entity[idAttribute]
    });

    remove(result, entity);
  });

  return result;
}
