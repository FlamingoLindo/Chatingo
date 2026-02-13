import { emoteService } from '$lib/apis/services/global.emotes.service';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ }) => {
	return {
		globalEmotesPromise: emoteService.getGlobalEmotes(),
        subbedEmotesPromise: emoteService.getSubbedEmotes('139916570')
	};
};