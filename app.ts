import { Hono } from "hono";
import { logger } from "hono/logger";

import { expensesRoute } from "./routes/expenses";

const app = new Hono();

// Middleware
app.use("*", logger());

app.get("/", (c) => {
  return c.json({ message: "Hello from bun" });
});

app.route("/api/expenses", expensesRoute);

export default app;
