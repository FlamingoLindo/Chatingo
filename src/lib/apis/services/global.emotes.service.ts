import type { EmoteData } from "../DTO/emotes/emotes.dto";
import { TwitchApiException } from "../DTO/twitch.api.error";
import { error } from '@sveltejs/kit';
import { emotesApi } from "../emotes/twitch.emotes";

export const emoteService = {
    async getGlobalEmotes(): Promise<EmoteData[]> {
        try {
            const response = await emotesApi.getGlobalEmotes('/chat/emotes/global');
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
            console.error('Emote fetch error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            error(500, `Failed to fetch global emotes: ${errorMessage}`);
        }
    },

    async getSubbedEmotes(user_id: string): Promise<EmoteData[]> {
        try {
            let allEmotes: EmoteData[] = [];
            let cursor: string | undefined = undefined;

            do {
                const queryParams: Record<string, string> = {
                    user_id: user_id
                };

                if (cursor) {
                    queryParams.after = cursor;
                }

                const response = await emotesApi.getSubbedEmotes(
                    '/chat/emotes/user',
                    queryParams
                );

                allEmotes = allEmotes.concat(response.data);
                cursor = response.pagination?.cursor;
            } while (cursor);

            return allEmotes.filter(emote => emote.emote_type === 'subscriptions');
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
                        error(err.status, `Failed to fetch subbed emotes: ${err.message}`);
                }
            }
            console.error('Emote fetch error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            error(500, `Failed to fetch subbed emotes: ${errorMessage}`);
        }
    }
};