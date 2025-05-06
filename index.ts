// Imports
import * as passes from "./passes";
import * as project from "./project";
import * as logs from "./logs";

// Starts server
Bun.serve({
    development: false,
    fetch: passes.fallback,
    port: project.port,
    routes: passes.endpoints
});
logs.listen(project.port);
