export const setLocationFields = (location) => {
  let updatedFields = {}

  Object.keys(location).forEach((key) => {
    switch (key) {
      case 'lat':
        if (!updatedFields.location) {
          updatedFields.location = { type: 'Point', coordinates: [0, 0] }
        }
        updatedFields.location.coordinates[1] = location[key]
        break
      case 'lng':
        if (!updatedFields.location) {
          updatedFields.location = { type: 'Point', coordinates: [0, 0] }
        }
        updatedFields.location.coordinates[0] = location[key]
        break
      default:
        updatedFields[key] = location[key]
        break
    }
  })

  return updatedFields
}
