import { Result, ok, err } from "./result";
import { Task, TaskStatus } from "./types";
import { NewTask } from "./validation";

export interface TaskFilter {
  readonly status?: TaskStatus["kind"];
  readonly tag?: string;
}

/**
 * An in-memory store that enforces valid status transitions:
 *   todo -> in-progress -> done
 *
 * The clock is injected so timestamps are deterministic in tests.
 */
export class TaskStore {
  private readonly tasks = new Map<string, Task>();
  private nextId = 1;

  constructor(private readonly clock: () => Date = () => new Date()) {}

  add(input: NewTask): Task {
    const task: Task = {
      id: `T${this.nextId++}`,
      title: input.title,
      priority: input.priority,
      tags: [...input.tags],
      status: { kind: "todo" },
    };
    this.tasks.set(task.id, task);
    return task;
  }

  get(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  start(id: string): Result<Task, string> {
    return this.update(id, (task) => {
      if (task.status.kind !== "todo") {
        return err(`task ${id} is already ${task.status.kind}`);
      }
      return ok({ ...task, status: { kind: "in-progress", startedAt: this.clock() } });
    });
  }

  complete(id: string): Result<Task, string> {
    return this.update(id, (task) => {
      if (task.status.kind !== "in-progress") {
        return err(`task ${id} must be in progress before it can be completed`);
      }
      return ok({ ...task, status: { kind: "done", completedAt: this.clock() } });
    });
  }

  list(filter: TaskFilter = {}): Task[] {
    return [...this.tasks.values()].filter(
      (task) =>
        (filter.status === undefined || task.status.kind === filter.status) &&
        (filter.tag === undefined || task.tags.includes(filter.tag)),
    );
  }

  /** Applies a transition and stores the result only if it succeeded. */
  private update(id: string, transition: (task: Task) => Result<Task, string>): Result<Task, string> {
    const task = this.tasks.get(id);
    if (!task) return err(`task ${id} not found`);

    const result = transition(task);
    if (result.ok) this.tasks.set(id, result.value);
    return result;
  }
}
