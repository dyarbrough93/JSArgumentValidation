/** Borrowed from: http://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically-from-javascript **/

const REGEX_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const REGEX_FUNCTION_PARAMS = /(?:\s*(?:function\s*[^(]*)?\s*)((?:[^'"]|(?:(?:(['"])(?:(?:.*?[^\\]\2)|\2))))*?)\s*(?=(?:=>)|{)/m
const REGEX_PARAMETERS_VALUES = /\s*(\w+)\s*(?:=\s*((?:(?:(['"])(?:\3|(?:.*?[^\\]\3)))((\s*\+\s*)(?:(?:(['"])(?:\6|(?:.*?[^\\]\6)))|(?:[\w$]*)))*)|.*?))?\s*(?:,|$)/gm

/**
 * Retrieve a function's parameter names and default values
 * Notes:
 *  - parameters with default values will not show up in transpiler code (Babel) because the parameter is removed from the function.
 *  - does NOT support inline arrow functions as default values
 *      to clarify: ( name = "string", add = defaultAddFunction )   - is ok
 *                  ( name = "string", add = ( a )=> a + 1 )        - is NOT ok
 *  - does NOT support default string value that are appended with a non-standard ( word characters or $ ) variable name
 *      to clarify: ( name = "string" + b )         - is ok
 *                  ( name = "string" + $b )        - is ok
 *                  ( name = "string" + b + "!" )   - is ok
 *                  ( name = "string" + λ )         - is NOT ok
 * @param {function} func
 * @returns {Array} - An array of the given function's parameter [key, default value] pairs.
 */
function getParams(func) {

  let functionAsString = func.toString()
  let params = []
  let match
  functionAsString = functionAsString.replace(REGEX_COMMENTS, '')
  functionAsString = functionAsString.match(REGEX_FUNCTION_PARAMS)[1]
  if (functionAsString.charAt(0) === '(') functionAsString = functionAsString.slice(1, -1)
  while (match = REGEX_PARAMETERS_VALUES.exec(functionAsString)) params.push(match[1])
  return params

}
