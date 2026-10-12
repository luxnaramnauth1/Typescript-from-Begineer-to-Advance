// 09 - ADVANCED: Conditional, mapped, and template literal types

// ---- Conditional types ----
type IsString<T> = T extends string ? "yes" : "no";
type A = IsString<"hi">; // "yes"
type B = IsString<42>;   // "no"

// Distributive: conditional types split over unions
type ToArray<T> = T extends unknown ? T[] : never;
type C = ToArray<string | number>; // string[] | number[]

// infer: pull a type out of a structure
type ElementType<T> = T extends (infer E)[] ? E : T;
type D = ElementType<number[]>; // number

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type E = UnwrapPromise<Promise<boolean>>; // boolean

// Recursive conditional type
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;
type F = Flatten<number[][][]>; // number

// ---- Mapped types ----
type Nullable<T> = { [K in keyof T]: T[K] | null };

// Key remapping with `as`: build new property names
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface Product {
  name: string;
  price: number;
}

type NullableProduct = Nullable<Product>; // { name: string | null; price: number | null }
type ProductGetters = Getters<Product>;   // { getName: () => string; getPrice: () => number }

const getters: ProductGetters = {
  getName: () => "Laptop",
  getPrice: () => 999,
};

const maybe: NullableProduct = { name: null, price: 10 };

// ---- Template literal types ----
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickHandler = EventName<"click">; // "onClick"

type CSSUnit = "px" | "rem" | "%";
type Size = `${number}${CSSUnit}`;
const width: Size = "100px";
// const bad: Size = "100vh"; // Error

// ---- Deep readonly with recursion ----
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

interface Config {
  server: { host: string; port: number };
}

const config: DeepReadonly<Config> = {
  server: { host: "localhost", port: 3000 },
};
// config.server.port = 1; // Error: read-only

// ---- Type-level equality check (compile-time test) ----
type Equals<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false;

const check1: Equals<string, string> = true;
// const check2: Equals<string, number> = true; // Error

console.log(getters.getName(), width, config.server.port, maybe, check1);

export {};
