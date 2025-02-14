import app from "./app";

const server = Bun.serve({
  fetch: app.fetch,
});

console.log(`Server Started Running ! 🚀 (PORT: ${server.port})`);
