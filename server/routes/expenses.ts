import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1).optional(),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive().min(1),
});

type Expense = z.infer<typeof expenseSchema>;

const fakeExpenses: Expense[] = [
  { id: 1, title: "Rent", amount: 1000 },
  { id: 2, title: "Food", amount: 100 },
  { id: 3, title: "Gas", amount: 50 },
];

export const expensesRoute = new Hono()
  // Get all expenses
  .get("/", (c) => {
    return c.json({ expenses: [...fakeExpenses] });
  })

  // Get total spent amount
  .get("/total-spent", (c) => {
    const total = fakeExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    return c.json({ total });
  })

  // Create a new expense
  .post("/", zValidator("json", expenseSchema), async (c) => {
    const data = await c.req.valid("json");

    fakeExpenses.push({ ...data, id: fakeExpenses.length + 1 });

    c.status(201);
    return c.json({ expenses: [...fakeExpenses] });
  })

  // Get a single expense by ID
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));

    const expense = fakeExpenses.find((expense) => expense.id === id);

    if (!expense) {
      return c.notFound();
    }

    return c.json({ expense });
  })

  // Delete an expense by ID
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex((expense) => expense.id === id);

    if (index === -1) {
      return c.notFound();
    }

    const deletedExpense = fakeExpenses.splice(index, 1)[0];
    return c.json({ expense: deletedExpense });
  });
