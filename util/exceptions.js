class Exception extends Error {
    constructor(name, message) {
        super(message);
        this.name = name;
    }

    toString() {
        return JSON.stringify({
            name: this.name,
            message: this.message
        });
    }
}

class NotFoundException extends Exception {
    constructor() {
        super('Not found', 'Object with intended id not found');
    }
}

exports.NotFoundException = NotFoundException;

class FieldException extends Exception {
    constructor(fieldName) {
        super('Field exception', `Field ${fieldName} is required`);
    }
}

exports.FieldException = FieldException;
