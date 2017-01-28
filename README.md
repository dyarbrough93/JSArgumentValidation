# JSArgumentValidation

Takes an arguments object, an array of types, and a function
and verifies that the number of arguments matches the number of
types, that all arguments are defined, and that all arguments 
match their respective type in the "types" array. If an instance
validation function is passed, it will be used for type validation.
If something is invalid, an appropriate error is thrown.

## Usage
```javascript
Validation.validateArguments(arguments, typesArr, func);
```
Should be called from within function. ```arguments``` is always the same
and is a reference to the arguments property of the function. ```typesArr```
is an array containing strings of types (e.g. ```['number', 'boolean']```)
and defines the argument types to validate. It can also contain
instance validation functions or booleans (see below). ```func``` is a
function reference to the function we are currently validating.

## Examples
### Basic Types
```javascript
function foo(bar /*{number}*/, baz /*{boolean}*/) {
  Validation.validateArguments(arguments, ['number', 'boolean'], foo);
}
```
This validates that ```bar ``` is a number and ```baz ```
is a boolean.
### Instance validation functions and booleans
Suppose you have an object defined as such:
```javascript
function Tuple(a, b) {
  return {
      a: a,
      b: b,
      isValidTuple: function() {
          return typeof this.a === 'number' &&
                 typeof this.b === 'number';
      }
  };
}
```
We can then use the ```isValidTuple``` method of the Tuple object in our
validation function:
```javascript
function validateTuple(tuple /*{Tuple}*/) {
  Validation.validateArguments(arguments, [tuple.isValidTuple], foo);
}
```
This will call the ```isValidTuple``` method on ```tuple``` for validation.


