import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { TaskStore } from "../src/taskStore";
import { summarize } from "../src/stats";

describe("TaskStore", () => {
  test("adds tasks with incrementing ids and todo status", () => {
    const store = new TaskStore();
    const a = store.add({ title: "A", priority: "low", tags: [] });
    const b = store.add({ title: "B", priority: "high", tags: [] });

    assert.equal(a.id, "T1");
    assert.equal(b.id, "T2");
    assert.deepEqual(a.status, { kind: "todo" });
  });

  test("moves a task through todo -> in-progress -> done with timestamps", () => {
    let now = new Date("2026-01-01T00:00:00Z");
    const store = new TaskStore(() => now);
    store.add({ title: "A", priority: "medium", tags: [] });

    const started = store.start("T1");
    assert.equal(started.ok, true);
    if (started.ok) {
      assert.deepEqual(started.value.status, { kind: "in-progress", startedAt: now });
    }

    now = new Date("2026-01-02T00:00:00Z");
    const done = store.complete("T1");
    assert.equal(done.ok, true);
    if (done.ok) {
      assert.deepEqual(done.value.status, { kind: "done", completedAt: now });
    }
  });

  test("rejects completing a task that was never started", () => {
    const store = new TaskStore();
    store.add({ title: "A", priority: "medium", tags: [] });

    const result = store.complete("T1");
    assert.equal(result.ok, false);
    if (!result.ok) assert.match(result.error, /must be in progress/);
  });

  test("rejects starting a task twice", () => {
    const store = new TaskStore();
    store.add({ title: "A", priority: "medium", tags: [] });
    store.start("T1");

    const second = store.start("T1");
    assert.equal(second.ok, false);
    if (!second.ok) assert.equal(second.error, "task T1 is already in-progress");
  });

  test("returns an error for unknown ids without throwing", () => {
    const store = new TaskStore();
    const result = store.start("missing");
    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.error, "task missing not found");
  });

  test("filters by status and tag", () => {
    const store = new TaskStore();
    store.add({ title: "A", priority: "low", tags: ["api"] });
    store.add({ title: "B", priority: "low", tags: ["ui"] });
    store.start("T2");

    assert.deepEqual(store.list({ status: "todo" }).map((t) => t.id), ["T1"]);
    assert.deepEqual(store.list({ tag: "ui" }).map((t) => t.id), ["T2"]);
    assert.equal(store.list().length, 2);
  });
});

describe("summarize", () => {
  test("counts statuses and open high-priority tasks", () => {
    const store = new TaskStore();
    store.add({ title: "A", priority: "high", tags: [] });
    store.add({ title: "B", priority: "high", tags: [] });
    store.add({ title: "C", priority: "low", tags: [] });
    store.start("T1");
    store.start("T2");
    store.complete("T2");

    assert.deepEqual(summarize(store.list()), {
      total: 3,
      todo: 1,
      inProgress: 1,
      done: 1,
      openHighPriority: 1,
    });
  });
});
