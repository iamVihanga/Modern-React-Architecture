import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import "./index.css";

import { routeTree } from "@/routeTree.gen.ts";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

const router = createRouter({ routeTree });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster theme="dark" />
    </QueryClientProvider>
  </StrictMode>
);
