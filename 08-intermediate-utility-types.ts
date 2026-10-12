// 08 - INTERMEDIATE/ADVANCED: Built-in utility types

interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

// Partial<T>: every property becomes optional
function updateTodo(todo: Todo, changes: Partial<Todo>): Todo {
  return { ...todo, ...changes };
}

// Required<T>: every property becomes required
type CompleteTodo = Required<Todo>;

// Readonly<T>: no property can be reassigned
const fixed: Readonly<Todo> = { id: 1, title: "Learn", completed: false };
// fixed.title = "x"; // Error

// Pick<T, K>: keep only the listed keys
type TodoPreview = Pick<Todo, "id" | "title">;

// Omit<T, K>: remove the listed keys
type NewTodo = Omit<Todo, "id" | "completed">;

// Record<K, V>: object type with keys K and values V
type Priority = "low" | "medium" | "high";
const priorityColors: Record<Priority, string> = {
  low: "green",
  medium: "orange",
  high: "red",
};

// Extract / Exclude: filter union members
type Events = "click" | "scroll" | "keydown";
type MouseEvents = Extract<Events, "click" | "scroll">; // "click" | "scroll"
type NonClick = Exclude<Events, "click">;               // "scroll" | "keydown"

// NonNullable: remove null and undefined
type MaybeName = string | null | undefined;
type Name = NonNullable<MaybeName>; // string

// ReturnType / Parameters: derive types from functions
function createUser(name: string, age: number) {
  return { name, age, createdAt: new Date() };
}
type UserResult = ReturnType<typeof createUser>;
type CreateUserArgs = Parameters<typeof createUser>; // [name: string, age: number]

// Awaited: unwrap a Promise type
async function fetchCount(): Promise<number> {
  return 42;
}
type Count = Awaited<ReturnType<typeof fetchCount>>; // number

// ---- Using them ----
const todo: Todo = { id: 1, title: "Write tests", completed: false };
console.log(updateTodo(todo, { completed: true }));

const preview: TodoPreview = { id: todo.id, title: todo.title };
const draft: NewTodo = { title: "Draft", description: "later", completed: false } as NewTodo;
const complete: CompleteTodo = { ...todo, description: "done" };

const args: CreateUserArgs = ["Ada", 36];
const result: UserResult = createUser(...args);

const name: Name = "Ada";
const mouse: MouseEvents = "click";
const count: Count = 7;

console.log(preview, draft, complete.description, result.name, name, mouse, count);
console.log(priorityColors.high);

export {};
