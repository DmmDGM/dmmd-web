// Defines labels
export enum Label {
    MISSING_ASSET,
    MISSING_ENDPOINT,
    UNKNOWN_EXCEPTION
};

// Defines tables
export const codes: { [ label in Label ]: string } = {
    [ Label.MISSING_ASSET ]: "MISSING_ASSET",
    [ Label.MISSING_ENDPOINT ]: "MISSING_ENDPOINT",
    [ Label.UNKNOWN_EXCEPTION ]: "UNKNOWN_EXCEPTION"
};
export const messages: { [ label in Label ]: string } = {
    [ Label.MISSING_ASSET ]: "Asset not found",
    [ Label.MISSING_ENDPOINT ]: "Endpoint not found",
    [ Label.UNKNOWN_EXCEPTION ]: "Unknown exception."
};
export const statuses: { [ label in Label ]: number } = {
    [ Label.MISSING_ASSET ]: 404,
    [ Label.MISSING_ENDPOINT ]: 404,
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
