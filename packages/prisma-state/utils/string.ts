export const cleanupStr = (value: string) => value.replace(/"/g, '')

export const uncapitalize = (str: string) => str.charAt(0).toLowerCase() + str.slice(1)
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
