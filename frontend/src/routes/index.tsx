import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc-client";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/")({
  component: Index,
});

async function getTotalSpent() {
  const result = await client.api.expenses["total-spent"].$get();

  if (!result.ok) throw new Error("Failed to fetch total spent");

  const totalSpent = await result.json();
  return totalSpent;
}

function Index() {
  const { data, error, isPending } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="">
      <Card className="w-[350px] m-auto">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>The total amount you've spent</CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-xs text-secondary mb-2">Total Spent Amount:</p>
          {isPending ? (
            <Skeleton className="h-8 w-28" />
          ) : (
            <h2 className="text-lg font-semibold">
              $ {data?.total.toFixed(2)}
            </h2>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
