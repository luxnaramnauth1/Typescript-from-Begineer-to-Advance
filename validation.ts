import { Result, ok, err } from "./result";
import { Priority, ValidationIssue } from "./types";

/** A validated, normalized input ready to be stored. */
export interface NewTask {
  readonly title: string;
  readonly priority: Priority;
  readonly tags: readonly string[];
}

const PRIORITIES: readonly Priority[] = ["low", "medium", "high"];
const MAX_TITLE_LENGTH = 120;

function isPriority(value: unknown): value is Priority {
  return typeof value === "string" && (PRIORITIES as readonly string[]).includes(value);
}

/**
 * Validates untrusted input (for example, parsed JSON or form data).
 * Collects every issue at once so the caller can report them all together.
 */
export function validateNewTask(input: unknown): Result<NewTask, ValidationIssue[]> {
  if (typeof input !== "object" || input === null) {
    return err([{ field: "root", message: "input must be an object" }]);
  }

  const data = input as Record<string, unknown>;
  const issues: ValidationIssue[] = [];

  // Title: required, trimmed, bounded in length.
  const title = typeof data.title === "string" ? data.title.trim() : "";
  if (title.length === 0) {
    issues.push({ field: "title", message: "title is required" });
  } else if (title.length > MAX_TITLE_LENGTH) {
    issues.push({ field: "title", message: `title must be ${MAX_TITLE_LENGTH} characters or fewer` });
  }

  // Priority: optional, defaults to "medium".
  const priority: unknown = data.priority ?? "medium";
  if (!isPriority(priority)) {
    issues.push({ field: "priority", message: `priority must be one of: ${PRIORITIES.join(", ")}` });
  }

  // Tags: optional array of strings, normalized to lowercase.
  const rawTags: unknown = data.tags ?? [];
  const tagsAreValid = Array.isArray(rawTags) && rawTags.every((t) => typeof t === "string");
  if (!tagsAreValid) {
    issues.push({ field: "tags", message: "tags must be an array of strings" });
  }

  if (issues.length > 0) return err(issues);

  return ok({
    title,
    priority: priority as Priority,
    tags: (rawTags as string[]).map((t) => t.trim().toLowerCase()),
  });
}
