import type { EmoteData } from "../DTO/emotes/global.dto";
import { TwitchApiException } from "../DTO/twitch.api.error";
import { globalEmotesApi } from "../twitch.emotes";
import { error } from '@sveltejs/kit';

export const globalEmoteService = {
    async getGlobalEmotes(): Promise<EmoteData[]> {
        try {
            const response = await globalEmotesApi.get('/chat/emotes/global');
            return response.data;
        }
        catch (err: unknown) {
            if (err instanceof TwitchApiException) {
                switch (err.status) {
                    case 401:
                        error(401, 'Unauthorized');
                    case 429:
                        error(429, 'Rate limit exceeded. Please try again later');
                    case 500:
                        error(500, 'Twitch API server error');
                    default:
                        error(err.status, `Failed to fetch global emotes: ${err.message}`);
                }
            }
            error(500, 'Failed to fetch global emotes: Unknown error');
        }
    }
};