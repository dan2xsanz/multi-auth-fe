export const checkRequiredFields = (
  previousValues: any,
  currentValue: any,
): string[] => {
  let requiredFields: string[] = []
  Object.keys(previousValues).forEach((key) => {
    if (currentValue.hasOwnProperty(key)) {
      if (previousValues[key] === currentValue[key]) {
        requiredFields.push(key)
      }
    }
  })
  return requiredFields
}
