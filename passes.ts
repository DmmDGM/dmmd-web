// Imports
import nodePath from "node:path";
import * as excepts from "./excepts";
import * as logs from "./logs";
import * as project from "./project";

// Defines types
export type Route = (inbound: Request) => Promise<Response> | Response;
export type Bridge = (route: Route) => Promise<Route> | Route;

// Defines bridges
export const bridges = {
    guard: ((route: Route) => {
        // Creates reroute
        const reroute: Route = async (inbound) => {
            // Processes inbound
            logs.inbound(inbound);
            
            // Processes outbound
            try {
                const outbound = await route(inbound);
                logs.outbound(outbound);
                return outbound;
            }
            catch(error) {
                const exception = error instanceof excepts.Exception ? error :
                    new excepts.Exception(excepts.Label.UNKNOWN_EXCEPTION);
                const outbound = Response.json({
                    code: exception.code,
                    message: exception.message
                }, exception.status);
                logs.outbound(outbound);
                logs.exception(exception);
                return outbound;
            }
        };
        return reroute;
    }) as Bridge
};

// Defines routes
export const routes = {
    assets: await bridges.guard(async (inbound) => {
        // Validates path
        const folder = nodePath.resolve(project.root, "./assets/");
        const target = inbound.url.split("/").slice(4).join("/");
        const path = nodePath.resolve(folder, target);
        if(!path.startsWith(folder)) excepts.raise(excepts.Label.MISSING_ASSET);
    
        // Fetches file
        const file = Bun.file(path);
        if(!(await file.exists())) excepts.raise(excepts.Label.MISSING_ASSET);
        return new Response(file);
    }) as Route,
    fallback: await bridges.guard(() => {
        // Raises exception
        excepts.raise(excepts.Label.MISSING_ENDPOINT);
    }) as Route,
    page: await bridges.guard(() => {
        // Raises exception
        excepts.raise(excepts.Label.INCOMPLETE_ENDPOINT);
    }),
    resource: await bridges.guard(async (inbound) => {
        // Validates path
        const target = inbound.url.split("/").slice(3).join("/");
        const table = {
            "favicon.ico": "favicon.ico",
            "robots.txt": "robots.txt"
        };
        if(!(target in table)) excepts.raise(excepts.Label.MISSING_RESOURCE);
        const path = nodePath.resolve(project.root, table[target as keyof typeof table]);
        if(!path.startsWith(project.root)) excepts.raise(excepts.Label.MISSING_RESOURCE);
    
        // Fetches file
        const file = Bun.file(path);
        if(!(await file.exists())) excepts.raise(excepts.Label.MISSING_RESOURCE);
        return new Response(file);
    }) as Route
}

// Defines endpoints
export const endpoints = {
    "/assets/*": routes.assets,
    "/favicon.ico": routes.resource,
    "/robots.txt": routes.resource
};
export const fallback = routes.fallback;
