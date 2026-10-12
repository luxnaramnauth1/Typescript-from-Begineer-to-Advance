// 10 - ADVANCED: Real-world patterns
// Result type, branded types, exhaustive reducers, fluent builder, async retry

// ---- 1. Result type: explicit success/error without exceptions ----
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) return { ok: false, error: "Division by zero" };
  return { ok: true, value: a / b };
}

const r = divide(10, 2);
if (r.ok) {
  console.log("Value:", r.value);   // narrowed to the success branch
} else {
  console.log("Error:", r.error);   // narrowed to the error branch
}

// ---- 2. Branded (nominal) types: stop mixing up IDs that share a base type ----
type Brand<T, B extends string> = T & { readonly __brand: B };
type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;

const toUserId = (id: string): UserId => id as UserId;

function getUser(id: UserId): void {
  console.log("Fetching user", id);
}

getUser(toUserId("u-1"));
// const oid: OrderId = "o-1" as OrderId;
// getUser(oid); // Error: OrderId is not assignable to UserId

// ---- 3. Exhaustive reducer with discriminated union ----
type Action =
  | { type: "add"; item: string }
  | { type: "remove"; index: number }
  | { type: "clear" };

function assertNever(x: never): never {
  throw new Error(`Unexpected value: ${JSON.stringify(x)}`);
}

function reduce(state: string[], action: Action): string[] {
  switch (action.type) {
    case "add":
      return [...state, action.item];
    case "remove":
      return state.filter((_, i) => i !== action.index);
    case "clear":
      return [];
    default:
      return assertNever(action); // compile error if a case is missing
  }
}

let items: string[] = [];
items = reduce(items, { type: "add", item: "apple" });
items = reduce(items, { type: "add", item: "pear" });
items = reduce(items, { type: "remove", index: 0 });
console.log("Items:", items); // ["pear"]

// ---- 4. Fluent builder with `this` return type ----
class RequestBuilder {
  private url = "";
  private headers: Record<string, string> = {};

  setUrl(url: string): this {
    this.url = url;
    return this;
  }

  header(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }

  build(): { url: string; headers: Record<string, string> } {
    if (!this.url) throw new Error("URL is required");
    return { url: this.url, headers: { ...this.headers } };
  }
}

const request = new RequestBuilder()
  .setUrl("https://example.com/api")
  .header("Accept", "application/json")
  .build();
console.log(request);

// ---- 5. Generic async retry with exponential-style backoff ----
async function retry<T>(
  fn: () => Promise<T>,
  attempts = 3,
  delayMs = 100,
): Promise<T> {
  let lastError: unknown;

  for (let i = 1; i <= attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      await new Promise<void>((resolve) => setTimeout(resolve, delayMs * i));
    }
  }
  throw lastError;
}

let calls = 0;
async function flakyFetch(): Promise<string> {
  calls++;
  if (calls < 2) throw new Error("network glitch");
  return "data";
}

retry(flakyFetch).then((value) => console.log("Retry result:", value, "after", calls, "calls"));

export {};
