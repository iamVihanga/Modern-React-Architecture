import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";

import { expensesRoute } from "./routes/expenses";

const app = new Hono();

// Middleware
app.use("*", logger());

const apiRoutes = app.basePath("/api").route("/expenses", expensesRoute);

// Serve static files
app.use("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;

export type ApiRoutes = typeof apiRoutes;
