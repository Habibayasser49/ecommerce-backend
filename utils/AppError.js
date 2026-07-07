class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.statusCode = "fail";
    }
}

module.exports = AppError;