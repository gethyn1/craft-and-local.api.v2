export const setProducerFields = (producer) => {
  let updatedFields = {}

  Object.keys(producer).forEach((key) => {
    switch (key) {
      case 'lat':
        if (!updatedFields.location) {
          updatedFields.location = { type: 'Point', coordinates: [0, 0] }
        }
        updatedFields.location.coordinates[1] = producer[key]
        break
      case 'lng':
        if (!updatedFields.location) {
          updatedFields.location = { type: 'Point', coordinates: [0, 0] }
        }
        updatedFields.location.coordinates[0] = producer[key]
        break
      default:
        updatedFields[key] = producer[key]
        break
    }
  })

  return updatedFields
}
