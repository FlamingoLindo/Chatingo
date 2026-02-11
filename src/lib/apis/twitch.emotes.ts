import { TWITCH_API_ENDPOINT } from "$lib";
import type { GlobalEmoteApiResponse } from "./DTO/emotes/global.dto";
import { TwitchApiException, type TwitchApiError } from "./DTO/twitch.api.error";

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
                'Client-ID': 'gp762nuuoqcoxypju8c569th9wz7q5',
                'Authorization': 'Bearer nq3daki13eldswzl92tkn3k3t7ln1j',
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
