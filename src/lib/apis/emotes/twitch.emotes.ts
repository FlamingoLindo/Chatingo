import { TwitchApiException, type TwitchApiError } from "../DTO/twitch.api.error";
import { TWITCH_API_ENDPOINT } from '$lib';

import { invoke } from '@tauri-apps/api/core';
import type { EmoteApiResponse } from "../DTO/emotes/emotes.dto";
import type { The7TvAPIResponse } from "../DTO/emotes/7tv.dto";

export interface TokenData {
    client_id: string;
    token: string;
    user_id: string;
}

let credentialsCache: TokenData | null = null;

async function getCredentials(): Promise<TokenData> {
    if (!credentialsCache) {
        credentialsCache = await invoke<TokenData>('load_tokens');
    }
    return credentialsCache;
}

class EmotesApi {
    private apiUrl: string;
    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {},
        queryParams?: Record<string, string | number>
    ): Promise<T> {

        const credentials = await getCredentials();
        let url = `${this.apiUrl}${endpoint}`;

        if (queryParams) {
            const params = new URLSearchParams();
            Object.entries(queryParams).forEach(([key, value]) => {
                params.append(key, String(value));
            });
            url += `?${params.toString()}`;
        }

        const config: RequestInit = {
            ...options,
            headers: {
                'Client-ID': credentials.client_id,
                'Authorization': `Bearer ${credentials.token}`,
                'Content-Type': 'application/json',
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

    async getGlobalEmotes(endpoint: string): Promise<EmoteApiResponse> {
        return this.request<EmoteApiResponse>(endpoint, { method: 'GET' });
    }

    async getSubbedEmotes(endpoint: string, queryParams?: Record<string, string | number>): Promise<EmoteApiResponse> {
        return this.request<EmoteApiResponse>(endpoint, { method: 'GET' }, queryParams);
    }

    async get7tvEmotes(endpoint: string, queryParams?: Record<string, string | number>): Promise<The7TvAPIResponse> {
        return this.request<The7TvAPIResponse>(endpoint, { method: 'POST' });
    }
}

export const emotesApi = new EmotesApi(TWITCH_API_ENDPOINT);