export const checkRequiredFields = (
  previousValues: any,
  currentValue: any,
  excludedKeys: string[] = [], // Default to an empty array if no excluded keys are provided
): string[] => {
  let requiredFields: string[] = []

  Object.keys(previousValues).forEach((key) => {
    if (!excludedKeys.includes(key)) {
      // Check if the key is not in the excludedKeys array
      if (currentValue.hasOwnProperty(key)) {
        if (previousValues[key] === currentValue[key]) {
          requiredFields.push(key)
        }
      } else {
        requiredFields.push(key) // Consider missing keys as required
      }
    }
  })

  return requiredFields
}
