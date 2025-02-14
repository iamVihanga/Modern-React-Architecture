import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeftIcon, Loader2, PlusIcon } from "lucide-react";

import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useId } from "react";
import { toast } from "sonner";
import { client } from "@/lib/rpc-client";

export const Route = createFileRoute("/expenses/new/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const toastId = useId();

  const form = useForm({
    defaultValues: {
      title: "",
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      try {
        toast.loading("Creating expense...", { id: toastId });

        // await new Promise((r) => setTimeout(r, 2000));

        const response = await client.api.expenses.$post({ json: value });

        if (!response.ok) throw new Error("Failed to create expense");

        toast.success("Successfully created expense..!", { id: toastId });
        navigate({ to: "/expenses" });
      } catch (err) {
        toast.error("Successfully created expense..!", { id: toastId });
      }
    },
  });

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Add new Expense</CardTitle>
        <CardDescription>
          Create new expense with title and amount
        </CardDescription>
      </CardHeader>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <CardContent>
          <div className="grid gap-4">
            <form.Field
              name="title"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Title</Label>
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter expense title"
                  />
                </div>
              )}
            />

            <form.Field
              name="amount"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Amount</Label>
                  <Input
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    placeholder="Enter expense amount"
                  />
                </div>
              )}
            />
          </div>
        </CardContent>

        <Separator className="mb-5" />

        <CardFooter className="flex items-center justify-between">
          <Button type="button" asChild variant={"secondary"}>
            <Link to={"/expenses"} className="flex items-center gap-2">
              <ArrowLeftIcon className="size-4" />
              Back to Expenses
            </Link>
          </Button>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit || isSubmitting}>
                {!isSubmitting ? (
                  <PlusIcon className="size-4" />
                ) : (
                  <Loader2 className="size-4 animate-spin" />
                )}
                Create Expense
              </Button>
            )}
          />
        </CardFooter>
      </form>
    </Card>
  );
}
