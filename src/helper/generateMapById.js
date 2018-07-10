export default function generateMapById(entities) {
  const result = {};
  entities.forEach(entity => {
    result[entity.id] = entity;
  });

  return result;
}
