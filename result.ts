/**
 * A small Result type for expected failures.
 *
 * Instead of throwing for predictable problems (bad input, missing id, invalid
 * state change), functions return either `{ ok: true, value }` or
 * `{ ok: false, error }`. Callers must check `ok` before touching `value`,
 * and the compiler enforces that.
 */
export type Ok<T> = { readonly ok: true; readonly value: T };
export type Err<E> = { readonly ok: false; readonly error: E };
export type Result<T, E = Error> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Ok<T> => ({ ok: true, value });
export const err = <E>(error: E): Err<E> => ({ ok: false, error });

/** Transform the success value, leaving errors untouched. */
export function map<T, U, E>(result: Result<T, E>, fn: (value: T) => U): Result<U, E> {
  return result.ok ? ok(fn(result.value)) : result;
}
