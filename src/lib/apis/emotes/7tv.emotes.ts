import { The7TV_API_ENDPOINT } from '$lib';
import type { The7TvAPIResponse } from "../DTO/emotes/7tv.dto";

class The7TvEmotesApi {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async get7tvEmotes(query: string, variables: Record<string, any>): Promise<The7TvAPIResponse> {
        const config: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables
            })
        };

        try {
            const response = await fetch(this.apiUrl, config);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }
}

export const the7tvEmotesApi = new The7TvEmotesApi(The7TV_API_ENDPOINT);