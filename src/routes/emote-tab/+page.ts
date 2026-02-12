import { globalEmoteService } from '$lib/apis/services/global.emotes.service';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ }) => {
	const emotesPromise = globalEmoteService.getGlobalEmotes();

	return {
		emotesPromise
	};
};