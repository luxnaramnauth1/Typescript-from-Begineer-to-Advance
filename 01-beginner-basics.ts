// 01 - BEGINNER: Variables, primitive types, and type inference

// Primitive types
let name: string = "Ada";
let age: number = 36;
let isLearning: boolean = true;

// Type inference: TypeScript works out the type from the value
let city = "London"; // inferred as string
// city = 42; // Error: Type 'number' is not assignable to type 'string'

// const vs let
const PI = 3.14159; // cannot be reassigned
let counter = 0;
counter += 1;

// Special types
let nothing: null = null;
let notDefined: undefined = undefined;
let anything: any = "could be anything"; // avoid `any` when possible
let unknownValue: unknown = "must be checked before use";

if (typeof unknownValue === "string") {
  console.log(unknownValue.toUpperCase()); // safe after narrowing
}

// Template literals
console.log(`${name} is ${age} years old`);

// Arrays of primitives
const scores: number[] = [90, 85, 77];
const tags: Array<string> = ["ts", "beginner"];

console.log(scores.length, tags[0], PI, counter, city, isLearning);
console.log(nothing, notDefined, anything);

export {};
