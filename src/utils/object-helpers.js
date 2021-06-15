export const updateObjectInArray = (items, itemId, objectPropertyName, newObjectProperty) => {
  return items.map(item => {
    if(item[objectPropertyName] === itemId) {
      return {...item, ...newObjectProperty}
    }
    return item;
  })
}