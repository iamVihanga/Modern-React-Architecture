import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { client } from "@/lib/rpc-client";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export const Route = createFileRoute("/expenses/")({
  component: ExpensesPage,
});

async function getExpenses() {
  // await new Promise((r) => setTimeout(r, 2000));

  const res = await client.api.expenses.$get();

  if (!res.ok) throw new Error("Failed to fetch expenses");

  const data = await res.json();
  return data;
}

function ExpensesPage() {
  const { data, error, isPending } = useQuery({
    queryKey: ["get-expenses"],
    queryFn: getExpenses,
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          All Expenses {data && <span>{`(${data.expenses.length})`}</span>}
        </h1>

        <Button asChild>
          <Link to="/expenses/new">
            <PlusIcon className="size-4" />
            Add new expense
          </Link>
        </Button>
      </div>

      <Table>
        <TableCaption>A list of your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="w-full">
          {isPending &&
            Array(4)
              .fill("_")
              .map((row, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8" />
                  </TableCell>
                </TableRow>
              ))}

          {!error &&
            data?.expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.id}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell className="text-right">{expense.amount}</TableCell>
              </TableRow>
            ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
