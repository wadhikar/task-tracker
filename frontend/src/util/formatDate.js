/**
 * Create a string using a Date Object to give to GraphQL
 * @param dateObject
 * @returns formatted string (YYY-MM-DD) of date
 */

export default function formatDate(dateObject) {
  const month =
    dateObject.getMonth() + 1 < 10
      ? '0' + dateObject.getMonth()
      : dateObject.getMonth() + 1;
  const day =
    dateObject.getDate() < 10
      ? '0' + dateObject.getDate()
      : dateObject.getDate();
  const year = dateObject.getFullYear();

  return year + '-' + month + '-' + day;
}
