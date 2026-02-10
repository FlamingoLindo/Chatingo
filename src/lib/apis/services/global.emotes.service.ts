import type { EmoteData, GlobalEmoteApiResponse } from "../DTO/emotes/global.dto";
import { globalEmotesApi } from "../twitch.emotes";

export const globalEmoteService = {
    async getGlobalEmotes(): Promise<EmoteData[]> {
        const response = await globalEmotesApi.get('/chat/emotes/global');
        return response.data;
    }
};