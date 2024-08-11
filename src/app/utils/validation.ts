export function validateUsername(username: string): Array<string> {
    let message = new Array<string>();
    if (username.length < 4 || username.length > 8) {
        message.push("Username must be between 4 and 8 characters long");
    }
    if (/[^a-z]/g.test(username)) {
        message.push("Username can only contain lowercase letters");
    }
    return message;
}

export function validateEmail(email: string): boolean {
    if (email) {
        const regexp = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@[a-z0-9][-a-z0-9]{0,61}[a-z0-9]?(\.(ru|com|edu|gov|rf|su))$/i;
        if (regexp.test(email)) {
            return true;
        }
    }
    return false;
}

export function validatePassword(password: string): Array<string> {
    let message = new Array<string>();
    if (password.length < 8 || password.length > 16) {
        message.push("Password must be between 8 and 16 characters long");
    }
    const spcMatches = password.match(/[-_,\.]/g);
    if (!spcMatches || spcMatches.length < 2) {
        message.push("Password must include at least 2 of the following special characters: -.,_");
    }
    const nmMatches = password.match(/[0-9]/g);
    if (!nmMatches || nmMatches.length < 2) {
        message.push("Password must include at least 2 digits");
    }
    if (!/[a-z]/.test(password)) {
        message.push("Password must include at least 1 lowercase letter");
    }
    if (!/[A-Z]/.test(password)) {
        message.push("Password must include at least 1 uppercase letter");
    }
    if (/[А-ЯЁа-яё]/.test(password)) {
        message.push("Password must not contain Cyrillic characters");
    }
    return message;
}
