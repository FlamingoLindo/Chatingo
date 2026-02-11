export class TwitchApiException extends Error {
    constructor(
        public error: string,
        public status: number,
        message: string
    ) {
        super(message);
        this.name = 'TwitchApiException';
    }
}

export interface TwitchApiError {
    error: string;
    status: number;
    message: string;
}