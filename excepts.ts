// Defines labels
export enum Label {
    BAD_REQUEST,
    GOOS_DETECTED,
    INCOMPLETE_ENDPOINT,
    MISSING_ENDPOINT,
    MISSING_FILE,
    UNKNOWN_EXCEPTION
};

// Defines tables
export const codes: { [ label in Label ]: string } = {
    [ Label.BAD_REQUEST ]: "BAD_REQUEST",
    [ Label.GOOS_DETECTED ]: "GOOS_DETECTED",
    [ Label.INCOMPLETE_ENDPOINT ]: "INCOMPLETE_ENDPOINT",
    [ Label.MISSING_ENDPOINT ]: "MISSING_ENDPOINT",
    [ Label.MISSING_FILE ]: "MISSING_FILE",
    [ Label.UNKNOWN_EXCEPTION ]: "UNKNOWN_EXCEPTION"
};
export const messages: { [ label in Label ]: string } = {
    [ Label.BAD_REQUEST ]: "Data is invalid or incomplete. Your request could not be processed.",
    [ Label.GOOS_DETECTED ]: "Goos detected. Go lick something else.",
    [ Label.INCOMPLETE_ENDPOINT ]: "Endpoint incomplete. Please try again later.",
    [ Label.MISSING_ENDPOINT ]: "Endpoint not found.",
    [ Label.MISSING_FILE ]: "File not found.",
    [ Label.UNKNOWN_EXCEPTION ]: "Unknown exception."
};
export const statuses: { [ label in Label ]: number } = {
    [ Label.BAD_REQUEST ]: 400,
    [ Label.GOOS_DETECTED ]: 403,
    [ Label.INCOMPLETE_ENDPOINT ]: 503,
    [ Label.MISSING_ENDPOINT ]: 404,
    [ Label.MISSING_FILE ]: 404,
    [ Label.UNKNOWN_EXCEPTION ]: 500
};

// Defines exception
export class Exception extends Error {
    // Declares fields
    readonly label: Label;

    // Defines constructor
    constructor(label: Label) {
        // Initializes parent
        super(messages[label]);

        // Initializes fields
        this.label = label;
    }

    // Defines getters
    get code(): string {
        return codes[this.label];
    }
    get message(): string {
        return messages[this.label];
    }
    get status(): number {
        return statuses[this.label];
    }
}

// Defines raise
export function raise(label: Label): never {
    // Throws exception
    throw new Exception(label);
}
