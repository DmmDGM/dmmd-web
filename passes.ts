// Imports
import nodePath from "node:path";
import * as dmmd from "./dmmd";
import * as excepts from "./excepts";
import * as logs from "./logs";
import * as project from "./project";

// Defines types
export type Route = (inbound: Request, server: Bun.Server) => Promise<Response> | Response;
export type Bridge = (route: Route) => Promise<Route> | Route;

// Defines bridges
export const bridges = {
    watch: ((route: Route) => {
        // Creates reroute
        const reroute: Route = async (inbound, server) => {
            // Processes inbound
            logs.inbound(inbound);
            
            // Processes outbound
            try {
                const outbound = await route(inbound, server);
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
    api: {
        // favs: await bridges.watch(async (inbound) => {
        //     // Fetches path
        //     const target = inbound.url.split("/").slice(5).join("/");
        //     const json = (await import("./data/favs"));
        //     return Response.json(json);
        // }),
        frens: await bridges.watch(async () => {
            // Fetches data
            const data = await import("./data/frens");
            return Response.json(data);
        }) as Route,
        funni: await bridges.watch(() => {
            // Returns funni
            return new Response(":3 🎉");
        }) as Route
    },
    fallback: await bridges.watch((inbound) => {
        // Raises exception
        if(dmmd.sniffGoos(inbound)) excepts.raise(excepts.Label.GOOS_DETECTED);
        excepts.raise(excepts.Label.MISSING_ENDPOINT);
    }) as Route,
    files: {
        assets: await bridges.watch(async (inbound) => {
            // Validates path
            const folder = nodePath.resolve(project.root, "./assets/");
            const target = inbound.url.split("/").slice(4).join("/");
            const path = nodePath.resolve(folder, target);
            if(!path.startsWith(folder)) excepts.raise(excepts.Label.MISSING_FILE);
        
            // Fetches file
            const file = Bun.file(path);
            if(!(await file.exists())) excepts.raise(excepts.Label.MISSING_FILE);
            return new Response(file);
        }) as Route,
        resources: await bridges.watch(async (inbound) => {
            // Validates path
            const target = inbound.url.split("/").slice(3).join("/");
            const table = {
                "favicon.ico": "images/favicon.ico",
                "robots.txt": "texts/robots.txt"
            };
            if(!(target in table)) excepts.raise(excepts.Label.MISSING_FILE);
            const path = nodePath.resolve(project.root, "./assets/", table[target as keyof typeof table]);
            if(!path.startsWith(project.root)) excepts.raise(excepts.Label.MISSING_FILE);
        
            // Fetches file
            const file = Bun.file(path);
            if(!(await file.exists())) excepts.raise(excepts.Label.MISSING_FILE);
            return new Response(file);
        }) as Route,
        secrets: await bridges.watch(async (inbound) => {
            // Validates path
            const folder = nodePath.resolve(project.root, "./secrets/");
            const target = inbound.url.split("/").slice(4).join("/");
            const path = nodePath.resolve(folder, target);
            if(!path.startsWith(folder)) excepts.raise(excepts.Label.MISSING_FILE);
        
            // Fetches file
            const file = Bun.file(path);
            if(!(await file.exists())) excepts.raise(excepts.Label.MISSING_FILE);
            return new Response(file);
        }) as Route,
    },
    pages: {
        main: await bridges.watch(() => {
            // Fetches file
            const file = Bun.file(nodePath.resolve(project.root, "./assets/htmls/main.html"));
            return new Response(file);
        }) as Route
    }
};

// Defines endpoints
export const endpoints = {
    // Api
    // "/api/favs/*": routes.apis.favs,
    // "/api/favs": routes.apis.favs,
    "/api/frens": routes.api.frens,
    "/api/0x3A33": routes.api.funni,

    // Files
    "/assets/*": routes.files.assets,
    "/favicon.ico": routes.files.resources,
    "/robots.txt": routes.files.resources,
    "/secrets/*": routes.files.secrets,

    // Pages
    "/": routes.pages.main
};
export const fallback = routes.fallback;
