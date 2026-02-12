import type { GlobalEmoteApiResponse } from "./DTO/emotes/global.dto";
import { TwitchApiException, type TwitchApiError } from "./DTO/twitch.api.error";
import { TWITCH_API_ENDPOINT } from '$lib';

import { invoke } from '@tauri-apps/api/core';

export interface TokenData {
    client_id: string;
    token: string;
}

let credentialsCache: TokenData | null = null;

async function getCredentials(): Promise<TokenData> {
    if (!credentialsCache) {
        credentialsCache = await invoke<TokenData>('load_tokens');
    }
    return credentialsCache;
}

class GlobalEmotesApi {
    private apiUrl: string;
    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {},
    ): Promise<GlobalEmoteApiResponse> {

        const credentials = await getCredentials();
        let url = `${this.apiUrl}${endpoint}`;
        const config: RequestInit = {
            ...options,
            headers: {
                'Client-ID': credentials.client_id,
                'Authorization': `Bearer ${credentials.token}`,
                ...options.headers
            }
        };

        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                let errorData: TwitchApiError;
                try {
                    errorData = await response.json();
                } catch {
                    errorData = {
                        error: 'API Error',
                        status: response.status,
                        message: `HTTP error! status: ${response.status}`
                    };
                }
                throw new TwitchApiException(
                    errorData.error,
                    errorData.status,
                    errorData.message
                );
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    async get<T>(endpoint: string): Promise<GlobalEmoteApiResponse> {
        return this.request<T>(endpoint, { method: 'GET' });
    }
}

export const globalEmotesApi = new GlobalEmotesApi(TWITCH_API_ENDPOINT);