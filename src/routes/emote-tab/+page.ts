import { the7tvEmoteService } from '$lib/apis/services/7tv.emotes.service';
import { emoteService } from '$lib/apis/services/global.emotes.service';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ }) => {
	return {
		globalEmotesPromise: emoteService.getGlobalEmotes(),
		subbedEmotesPromise: emoteService.getSubbedEmotes('139916570'),
		the7tvEmotesPromise: the7tvEmoteService.get7TvEmotes('flamingo_lindo')
	};
};