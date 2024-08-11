export default function createError(errorMessage : string | string[]) : object { 
    return Object.freeze({
        errorMessage
    });
}