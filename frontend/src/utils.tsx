export const validateWithRegex = (
  value: string,
  pattern: RegExp,
  errorMessage: string
): string => {
  if (!pattern.test(value)) {
    return errorMessage;
  }
  return "";
};
