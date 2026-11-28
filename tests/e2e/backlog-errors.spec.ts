import { expect, test } from "@playwright/test";

test("shows an error when the API fails to save", async ({ page, request }) => {
  const created = await request.post("/api/backlog", {
    data: { title: "E2E save error", description: "x", priority: "low" },
  });
  const { id } = await created.json();

  await page.route(`**/api/backlog/${id}`, (route) => {
    if (route.request().method() === "PUT") {
      return route.fulfill({ status: 500, body: "{}" });
    }
    return route.continue();
  });

  await page.goto(`/backlog/${id}`);
  await page.getByRole("button", { name: "Save changes" }).click();

  await expect(page.getByRole("alert")).toHaveText(
    "Saving failed. Please try again.",
  );
});

test("shows an error when the API fails to delete", async ({
  page,
  request,
}) => {
  const created = await request.post("/api/backlog", {
    data: { title: "E2E delete error", description: "x", priority: "low" },
  });
  const { id } = await created.json();

  await page.route(`**/api/backlog/${id}`, (route) => {
    if (route.request().method() === "DELETE") {
      return route.fulfill({ status: 500 });
    }
    return route.continue();
  });

  await page.goto(`/backlog/${id}`);
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Delete item" }).click();

  await expect(page.getByRole("alert")).toHaveText(
    "Deleting failed. Please try again.",
  );
  await expect(page).toHaveURL(`/backlog/${id}`);
});

test("shows the error page when the network is down", async ({
  page,
  context,
  request,
}) => {
  const created = await request.post("/api/backlog", {
    data: { title: "E2E offline", description: "x", priority: "low" },
  });
  const { id } = await created.json();

  await page.goto(`/backlog/${id}`);
  await expect(
    page.getByRole("button", { name: "Save changes" }),
  ).toBeEnabled();

  await context.setOffline(true);
  await page.getByRole("button", { name: "Save changes" }).click();

  await expect(
    page.getByRole("heading", { name: "Something went wrong" }),
  ).toBeVisible();
});
