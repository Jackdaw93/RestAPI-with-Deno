import { Application } from "https://deno.land/x/oak/mod.ts";
import router from './routes.ts';

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.use((ctx) => {
  ctx.response.body = "Server is running port 8000!";
});

console.log("Server is running on port 8000")

await app.listen("127.0.0.1:8000");