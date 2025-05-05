// Imports
import nodePath from "node:path";

// Defines constants
export const port = parseInt(process.env.PORT ?? "3000");
export const root = nodePath.resolve(import.meta.dir);
