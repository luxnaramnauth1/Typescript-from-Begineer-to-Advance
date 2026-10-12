// 04 - BEGINNER: Arrays, tuples, and enums

// Arrays
const numbers: number[] = [1, 2, 3];
numbers.push(4);
const doubled = numbers.map((n) => n * 2);          // number[]
const evens = numbers.filter((n) => n % 2 === 0);   // number[]

// Readonly arrays cannot be changed
const frozen: readonly string[] = ["a", "b"];
// frozen.push("c"); // Error

// Tuples: fixed length, with a known type at each position
type RGB = [number, number, number];
const red: RGB = [255, 0, 0];

// Labeled tuple elements (TypeScript 4.0+)
type HttpResponse = [status: number, body: string];
const response: HttpResponse = [200, "OK"];
const [status, body] = response;

// Numeric enum: values are 0, 1, 2, ...
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right, // 3
}

// String enum: clearer when logged or sent over the network
enum Status {
  Pending = "PENDING",
  Done = "DONE",
}

function move(dir: Direction): string {
  return `Moving ${Direction[dir]}`; // reverse lookup for numeric enums
}

console.log(doubled, evens, red, status, body);
console.log(move(Direction.Left));  // Moving Left
console.log(Status.Done);           // DONE

export {};
