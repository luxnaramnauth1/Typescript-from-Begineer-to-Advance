# TypeScript Lessons: Beginner to Advanced

A set of 10 standalone TypeScript files that build from basic types to advanced type-level patterns. Each file is self-contained, heavily commented, and can be read or run on its own.

## Learning path

| # | File | Level | What you learn |
|---|------|-------|----------------|
| 01 | `01-beginner-basics.ts` | Beginner | `let`/`const`, primitive types, type inference, `null`/`undefined`/`any`/`unknown`, template literals |
| 02 | `02-beginner-functions.ts` | Beginner | Typed parameters and return types, optional and default params, rest params, function types |
| 03 | `03-beginner-objects-interfaces.ts` | Beginner / Intermediate | Object types, `interface` vs `type`, `readonly`, optional properties, `extends`, index signatures, intersections |
| 04 | `04-beginner-arrays-tuples-enums.ts` | Beginner | Typed arrays, `readonly` arrays, tuples (including labeled ones), numeric and string enums |
| 05 | `05-intermediate-unions-narrowing.ts` | Intermediate | Union and literal types, discriminated unions, `switch` exhaustiveness with `never`, type guards, `in` narrowing, `?.` and `??` |
| 06 | `06-intermediate-classes.ts` | Intermediate | Classes, `private`/`protected`/`public`, `static`, `abstract` classes, `implements`, getters and setters, parameter properties |
| 07 | `07-intermediate-generics.ts` | Intermediate | Generic functions, classes and interfaces, constraints with `extends`, `keyof`, default type parameters |
| 08 | `08-intermediate-utility-types.ts` | Intermediate / Advanced | Built-in utility types: `Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`, `Extract`, `Exclude`, `NonNullable`, `ReturnType`, `Parameters`, `Awaited` |
| 09 | `09-advanced-conditional-mapped-types.ts` | Advanced | Conditional types, distributive conditionals, `infer`, recursive types, mapped types, key remapping with `as`, template literal types, compile-time type tests |
| 10 | `10-advanced-real-world-patterns.ts` | Advanced | Result type for error handling, branded (nominal) types, exhaustive reducers, fluent builder with `this` return type, generic async retry |

Suggested order: work through the files in numbered order. Try changing the code, then uncomment the lines marked `// Error` to see what the compiler reports.

## How to run

The folder includes a `tsconfig.json` (strict mode, ES2020 target). Install TypeScript, then type-check every file:

```bash
npm install -g typescript        # or: npm install --save-dev typescript
tsc -p .                         # type-check all files using tsconfig.json, emit nothing
```

To run a single file, compile it and execute the output:

```bash
tsc --strict --target ES2020 --lib ES2020,DOM 01-beginner-basics.ts    # produces 01-beginner-basics.js
node 01-beginner-basics.js
```

Or run it directly with a TypeScript runner such as `npx tsx 01-beginner-basics.ts`.

Each file ends with `export {};`. This makes it a module, so top-level names such as `name` or `describe` do not clash between files.

## Notes on the code

- **Compile-time errors are intentional in some places.** Lines like `// const bad: User = ...` are commented out because they would fail to compile. Uncomment one at a time to see the error message.
- **Some examples print output.** Files 05, 06, 07, 08, and 10 call `console.log` so you can see runtime results. Files 09 and most of 08 are mainly about types, so their values are checked at compile time.
- **`any` appears once on purpose** (file 01) to show why it should be avoided. Prefer `unknown` and narrow it.
- **Type-only code disappears at runtime.** Interfaces, type aliases, and generics are removed when compiled to JavaScript. Only classes, enums, and functions remain.

## Key ideas by level

**Beginner:** annotate values and function signatures; let inference handle the rest; prefer `const`; use `interface` or `type` to name object shapes.

**Intermediate:** model state with unions and discriminants; narrow types with checks before using them; write generics when a function should work across types while keeping them consistent.

**Advanced:** build new types from existing ones with utility types, conditional types, and mapped types; use branded types and `Result` to make invalid states hard to represent.

## Requirements

- Node.js 18 or newer (for `node` and `npx`)
- TypeScript 5.x (the files were checked with TypeScript 5.9.3 in strict mode)
