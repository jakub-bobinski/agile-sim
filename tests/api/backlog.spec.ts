import { expect, test } from "@playwright/test";

const newItem = {
  title: "API test item",
  description: "Created by an API test.",
  priority: "medium",
};

test("GET /api/backlog returns a list of items", async ({ request }) => {
  const response = await request.get("/api/backlog");

  expect(response.status()).toBe(200);
  const items: unknown = await response.json();
  expect(Array.isArray(items)).toBe(true);
});

test("POST /api/backlog creates an item", async ({ request }) => {
  const response = await request.post("/api/backlog", { data: newItem });

  expect(response.status()).toBe(201);
  const item = await response.json();
  expect(item).toMatchObject(newItem);
  expect(typeof item.id).toBe("number");

  const getResponse = await request.get(`/api/backlog/${item.id}`);
  expect(getResponse.status()).toBe(200);
  expect(await getResponse.json()).toMatchObject(newItem);
});

test("POST /api/backlog rejects invalid data with 400", async ({ request }) => {
  const response = await request.post("/api/backlog", {
    data: { title: "x", description: "", priority: "urgent" },
  });

  expect(response.status()).toBe(400);
  const body = await response.json();
  expect(body.error).toBe("Validation failed");
  expect(body.fieldErrors).toEqual({
    title: "Title must be 3–80 characters.",
    description: "Description is required (max 300 characters).",
    priority: "Priority must be low, medium or high.",
  });
});

test("GET /api/backlog/:id returns 404 for an unknown id", async ({
  request,
}) => {
  const response = await request.get("/api/backlog/999999");

  expect(response.status()).toBe(404);
  expect(await response.json()).toEqual({ error: "Backlog item not found" });
});

test("PUT /api/backlog/:id updates an item", async ({ request }) => {
  const created = await request.post("/api/backlog", { data: newItem });
  const { id } = await created.json();

  const changes = {
    title: "API test item (edited)",
    description: "Edited by an API test.",
    priority: "high",
  };
  const response = await request.put(`/api/backlog/${id}`, { data: changes });

  expect(response.status()).toBe(200);
  expect(await response.json()).toMatchObject({ id, ...changes });
});

test("DELETE /api/backlog/:id removes an item", async ({ request }) => {
  const created = await request.post("/api/backlog", { data: newItem });
  const { id } = await created.json();

  const response = await request.delete(`/api/backlog/${id}`);
  expect(response.status()).toBe(204);

  const getResponse = await request.get(`/api/backlog/${id}`);
  expect(getResponse.status()).toBe(404);
});
