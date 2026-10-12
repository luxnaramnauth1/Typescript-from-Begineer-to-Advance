// 07 - INTERMEDIATE: Generics

// Generic function
function identity<T>(value: T): T {
  return value;
}

const n = identity<number>(5); // explicit type argument
const s = identity("hello");   // inferred as string

// Generic constraint: T must have a `length` property
interface HasLength {
  length: number;
}

function longest<T extends HasLength>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

console.log(longest("apple", "fig"));   // apple
console.log(longest([1, 2, 3], [4]));   // [1, 2, 3]

// Generic interface and factory
interface Box<T> {
  value: T;
  map<U>(fn: (v: T) => U): Box<U>;
}

function createBox<T>(value: T): Box<T> {
  return {
    value,
    map<U>(fn: (v: T) => U): Box<U> {
      return createBox(fn(value));
    },
  };
}

const boxed = createBox(10).map((x) => x.toString().padStart(3, "0"));
console.log(boxed.value); // "010"

// Generic class
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }
}

const numbers = new Stack<number>();
numbers.push(1);
numbers.push(2);
console.log(numbers.pop(), numbers.size); // 2 1

// keyof: K must be a real key of T
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Ada", age: 36 };
console.log(getProperty(person, "name")); // Ada
// getProperty(person, "email"); // Error: "email" is not a key of person

// Default type parameter
interface ApiResponse<T = unknown> {
  data: T;
  ok: boolean;
}

const res: ApiResponse<string> = { data: "ok", ok: true };
console.log(res);

export {};
