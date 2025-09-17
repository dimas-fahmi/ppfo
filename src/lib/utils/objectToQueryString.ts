/**
 * Converts an object into a query string format.
 * The resulting string will have the form: `key1=value1&key2=value2&...`.
 * Both keys and values are URL-encoded to ensure proper formatting.
 *
 * @param {Record<string, any>} obj - The object to be converted into a query string.
 * @returns {string} The query string representation of the object.
 *
 * @example
 * const obj = { name: 'John', age: 30, city: 'New York' };
 * console.log(objectToQueryString(obj));  // Output: "name=John&age=30&city=New%20York"
 */
export function objectToQueryString(obj: Record<string, string>): string {
  const queryString = Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
  return queryString;
}
