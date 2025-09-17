/**
 * Converts an object into a query string format.
 * The resulting string will have the form: `key1=value1&key2=value2&...`.
 * Both keys and values are URL-encoded to ensure proper formatting.
 *
 * @param {Record<string, unknown>} obj - The object to be converted into a query string.
 * @returns {string} The query string representation of the object.
 *
 * @example
 * const obj = { name: 'John', age: 30, city: 'New York' };
 * console.log(objectToQueryString(obj));  // Output: "name=John&age=30&city=New%20York"
 */
export function objectToQueryString(obj: Record<string, unknown>): string {
  const queryString = Object.entries(obj)
    .filter(([_key, value]) => value !== undefined && value !== null) // Ignore undefined or null values
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    ) // Ensure everything is a string
    .join("&");
  return queryString;
}
