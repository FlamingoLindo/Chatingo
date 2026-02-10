import type { GlobalEmoteApiResponse } from "./DTO/emotes/global.dto";

// https://dev.twitch.tv/docs/api/reference
const GLOBAL_EMOTES = 'https://api.twitch.tv/helix';

class GlobalEmotesApi {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {},
    ): Promise<GlobalEmoteApiResponse> {
        let url = `${this.apiUrl}${endpoint}`;

        const config: RequestInit = {
            ...options,
            headers: {
                'Client-ID': '',
                'Authorization': 'Bearer ',
                ...options.headers
            }
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Request error:', error);
            throw error;
        }
    }

    async get<T>(endpoint: string): Promise<GlobalEmoteApiResponse> {
        return this.request<T>(endpoint, { method: 'GET' });
    }
}

export const globalEmotesApi = new GlobalEmotesApi(GLOBAL_EMOTES);
