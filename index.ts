// Imports
import * as routes from "./routes";
import * as project from "./project";
import * as logs from "./logs";

// Starts server
const server = Bun.serve({
    fetch: (request: Request) => routes.fallback(request),
    port: project.port,
    routes: {
        "/assets/*": async (request: Bun.BunRequest<"/assets/*">) =>
            await routes.assets(request),
        "/:target": async (request: Bun.BunRequest<"/:target">) =>
            await routes.resources(request),

        "/": async (request: Bun.BunRequest<"/">) =>
            await routes.main(request)
    }
}) as Bun.Server;
logs.listen(project.port);
