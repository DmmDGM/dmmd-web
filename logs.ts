// Imports
import chalk from "chalk";
import * as excepts from "./excepts";

// Defines print
export function format(head: string, body: string, time: number = Date.now()): string {
    // Creates stamp
    const date = new Date(time);
    const stamp = `${
        (date.getHours() === 0 ? 12 : date.getHours() % 12).toString().padStart(2, "0")
    }:${
        date.getMinutes().toString().padStart(2, "0")
    }:${
        date.getSeconds().toString().padStart(2, "0")
    } ${
        date.getHours() < 12 ? "AM" : "PM"
    }`;
    
    // Formats message
    const message = `[${stamp}] ${head} | ${body}`;
    return message;
}

// Defines logs
export function exception(exception: excepts.Exception): string {
    // Creates body
    const body = `${exception.message} (${exception.code}: ${String(exception.status)}).`;

    // Prints message
    const message = chalk.red(format("EXCEPTION", body));
    console.log(message);
    return message;
}
export function inbound(request: Request): string {
    // Creates body
    const ip = chalk.cyan(request.headers.get("CF-Connecting-IP") ?? "Localhost");
    const url = chalk.cyan(request.url);
    const body = `${ip} accessed ${url}.`;

    // Prints message
    const message = chalk.yellow(format("INBOUND", body));
    console.log(message);
    return message;
}
export function listen(port: number): string {
    // Creates body
    const url = chalk.cyan(`http://localhost:${String(port)}/`);
    const body = `Server is now listening on ${url}.`;

    // Prints message
    const message = chalk.green(format("LISTEN", body));
    console.log(message);
    return message;
}
export function outbound(response: Response): string {
    // Creates body
    const status = chalk.cyan(String(response.status));
    const ok = response.ok ? "OK" : "FAILED";
    const body = `Access responded with status ${status} (${ok}).`;

    // Prints message
    const message = (response.ok ? chalk.green : chalk.red)(format("OUTBOUND", body));
    console.log(message);
    return message;
}
