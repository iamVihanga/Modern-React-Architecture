import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: Root,
});

function Navbar() {
  return (
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
      <Link to="/expenses" className="[&.active]:font-bold">
        Expenses
      </Link>
    </div>
  );
}

function Root() {
  return (
    <>
      <Navbar />
      <hr />
      <div className="max-w-5xl py-4 mx-auto">
        <Outlet />
      </div>
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}
