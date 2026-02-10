import { globalEmoteService } from '$lib/apis/services/global.emotes.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ }) => {
	const emotesPromise = globalEmoteService.getGlobalEmotes();

	return {
		emotesPromise
	};
};