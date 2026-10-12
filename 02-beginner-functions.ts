// 02 - BEGINNER: Functions and parameter types

function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Optional and default parameters
function greet(name: string, greeting: string = "Hello", punctuation?: string): string {
  return `${greeting}, ${name}${punctuation ?? "!"}`;
}

// Rest parameters
function sumAll(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

// Function returning nothing
function logMessage(message: string): void {
  console.log(message);
}

// Function types
type MathOperation = (x: number, y: number) => number;
const subtract: MathOperation = (x, y) => x - y;

function applyOperation(op: MathOperation, a: number, b: number): number {
  return op(a, b);
}

console.log(add(2, 3));                 // 5
console.log(multiply(4, 5));            // 20
console.log(greet("Ada"));              // Hello, Ada!
console.log(greet("Ada", "Hi", "?"));   // Hi, Ada?
console.log(sumAll(1, 2, 3, 4));        // 10
logMessage("Functions work!");
console.log(applyOperation(subtract, 10, 4)); // 6

export {};
