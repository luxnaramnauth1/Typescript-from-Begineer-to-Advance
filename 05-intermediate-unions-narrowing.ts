// 05 - INTERMEDIATE: Union types, literal types, and type narrowing

// Union type
type ID = string | number;

function printId(id: ID): void {
  if (typeof id === "string") {
    console.log("String id:", id.toUpperCase());
  } else {
    console.log("Numeric id:", id.toFixed(0));
  }
}

// Literal types
type Heading = "north" | "south" | "east" | "west";
let heading: Heading = "north";
// heading = "up"; // Error

// Discriminated unions: each member has a literal `kind` field
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
    default: {
      // Exhaustiveness check: compile error if a new Shape kind is added and not handled
      const exhaustive: never = shape;
      return exhaustive;
    }
  }
}

// Custom type guard
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function describe(value: unknown): string {
  if (isString(value)) return `string of length ${value.length}`;
  if (Array.isArray(value)) return `array with ${value.length} items`;
  return "something else";
}

// `in` operator narrowing
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird): void {
  if ("swim" in animal) {
    animal.swim();
  } else {
    animal.fly();
  }
}

// Optional chaining and nullish coalescing
function getLength(text: string | null): number {
  return text?.length ?? 0;
}

console.log(area({ kind: "rectangle", width: 3, height: 4 })); // 12
console.log(describe([1, 2, 3]), getLength(null), heading);
printId("abc");
printId(42);
move({ swim: () => console.log("swimming") });

export {};
