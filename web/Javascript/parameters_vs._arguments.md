# Parameters vs. Arguments in JavaScript

When working with functions in JavaScript, it's crucial to understand the difference between **parameters** and **arguments**. Though often used interchangeably, they serve different roles within the context of a function.

## Parameters

Parameters are variables listed as part of the function definition. They act as placeholders for values that will be provided when the function is called. Parameters are declared inside the parentheses () of the function declaration or expression.

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}
```

In the example above, `name` is a parameter of the greet function. It serves as a placeholder for the actual value that will be passed when the function is invoked.

## Arguments

Arguments, on the other hand, are the actual values passed to a function when it is called. These values can be of any data type, including primitive types like strings and numbers, as well as objects and even other functions.

```javascript
greet('John');
```

In this invocation, `'John'` is an argument passed to the `greet` function. It will be assigned to the `name` parameter within the function body.

## Relationship

The number of parameters in a function signature defines the function's arity (the number of arguments the function expects). However, in JavaScript, functions are flexible, and it's possible to call a function with fewer or more arguments than the number of parameters declared.

```javascript
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // Outputs: 5
console.log(add(2));    // Outputs: NaN (Not-a-Number)
console.log(add(2, 3, 4)); // Outputs: 5 (ignores extra arguments)
```

## Summary

* Parameters are variables declared in a function's definition.
* Arguments are the actual values passed to a function when it is invoked.
* The number of parameters defines the function's arity, but JavaScript allows flexibility in the number of arguments passed.
* Parameters act as placeholders that will be assigned the values of the corresponding arguments when the function is called.