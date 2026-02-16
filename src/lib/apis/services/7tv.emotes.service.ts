import { error } from '@sveltejs/kit';
import { the7tvEmotesApi } from "../emotes/7tv.emotes";
import type { The7TvAPIResponse } from "../DTO/emotes/7tv.dto";

export const the7tvEmoteService = {
    async get7TvEmotes(username: string): Promise<The7TvAPIResponse> {
        try {
            const query = `
                query GetUserEmotesByUsername($query: String!) {
                    search {
                        all(query: $query, page: 1, perPage: 1) {
                            users {
                                items {
                                    id
                                    mainConnection {
                                        platformDisplayName
                                    }
                                    style {
                                        activeEmoteSet {
                                            id
                                            name
                                            emotes {
                                                items {
                                                    emote {
                                                        id
                                                        images {
                                                            url
                                                        }
                                                        flags {
                                                            animated
                                                        }
                                                    }
                                                    alias
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            `;

            const response = await the7tvEmotesApi.get7tvEmotes(query, { query: username });
            return response;
        }
        catch (err: unknown) {
            console.error('7TV emote fetch error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            error(500, `Failed to fetch 7TV emotes: ${errorMessage}`);
        }
    }
};