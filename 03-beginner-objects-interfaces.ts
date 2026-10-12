// 03 - BEGINNER/INTERMEDIATE: Objects, interfaces, and type aliases

interface User {
  readonly id: number;
  name: string;
  email?: string; // optional property
}

type Point = {
  x: number;
  y: number;
};

const user: User = { id: 1, name: "Grace" };
// user.id = 2; // Error: readonly

const origin: Point = { x: 0, y: 0 };

// Interfaces can extend other interfaces
interface Employee extends User {
  department: string;
  salary: number;
}

const emp: Employee = {
  id: 2,
  name: "Linus",
  department: "Kernel",
  salary: 100000,
};

// Index signatures: an object with arbitrary string keys
interface Dictionary {
  [key: string]: number;
}
const stock: Dictionary = { apples: 3, pears: 7 };

// Destructuring parameters with types and defaults
function printUser({ name, email = "n/a" }: User): void {
  console.log(name, email);
}

// Excess property check: object literals may not have unknown properties
// const bad: User = { id: 3, name: "X", role: "admin" }; // Error

// Intersection types: combine several types
type Timestamped = { createdAt: Date };
type Post = { title: string } & Timestamped;

const post: Post = { title: "Hello TS", createdAt: new Date() };

console.log(user, origin, emp.department, stock.apples, post.title);
printUser(user);

export {};
