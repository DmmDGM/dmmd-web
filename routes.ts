// Imports
import nodePath from "node:path";
import * as excepts from "./excepts";
import * as logs from "./logs";
import * as project from "./project";

// Defines routes
export async function assets(
    inbound: Bun.BunRequest<"/assets/*">
): Promise<Response> {
    // Processes inbound
    logs.inbound(inbound);
    
    // Processes outbound
    try {
        // Verifies path
        const folder = nodePath.resolve(project.root, "./assets/");
        const target = inbound.url.split("/").slice(4).join("/");
        const path = nodePath.resolve(folder, target);
        if(!path.startsWith(folder)) excepts.raise(excepts.Label.MISSING_ASSET);

        // Fetches file
        const file = Bun.file(path);
        if(!await file.exists()) excepts.raise(excepts.Label.MISSING_ASSET);

        // Processes outbound
        const outbound = new Response(file);
        logs.outbound(outbound);
        return outbound;
    }
    catch(error) {
        // Processes outbound
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
}
export function fallback(
    inbound: Request
): Response {
    // Processes inbound
    logs.inbound(inbound);

    // Processes outbound
    const exception = new excepts.Exception(excepts.Label.MISSING_ENDPOINT);
    const outbound = Response.json({
        code: exception.code,
        message: exception.message
    }, exception.status);
    logs.outbound(outbound);
    logs.exception(exception);
    return outbound;
}
export async function resources(
    inbound: Bun.BunRequest<"/:target">
): Promise<Response> {
    // Processes inbound
    logs.inbound(inbound);
    
    // Processes outbound
    try {
        // Verifies path
        const folder = project.root;
        const target = inbound.params.target;
        if([
            "favicon.ico",
            "privacy.txt",
            "robots.txt"
        ].indexOf(target) === -1) excepts.raise(excepts.Label.MISSING_ENDPOINT);
        const path = nodePath.resolve(folder, target);
        if(!path.startsWith(folder)) excepts.raise(excepts.Label.MISSING_ENDPOINT);

        // Fetches file
        const file = Bun.file(path);
        if(!await file.exists()) excepts.raise(excepts.Label.MISSING_ENDPOINT);

        // Processes outbound
        const outbound = new Response(file);
        logs.outbound(outbound);
        return outbound;
    }
    catch(error) {
        // Processes outbound
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
}
export async function main(
    inbound: Bun.BunRequest<"/">
): Promise<Response> {
    // Processes inbound
    logs.inbound(inbound);

    // Processes outbound
    const file = Bun.file(nodePath.resolve(project.root, "./assets/html/main.html"));
    const outbound = new Response(file);
    logs.outbound(outbound);
    return outbound;
}
