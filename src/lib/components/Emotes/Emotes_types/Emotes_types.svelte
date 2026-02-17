<script lang="ts">
  import type { PageData } from '../../../../routes/emote-tab/$types';
  import GlobalEmotes from '../Global_emotes/Global_emotes.svelte';
  import SubEmotes from '../Sub_emotes/Sub_emotes.svelte';
  import { page } from '$app/state';
  import The7tvEmotes from '../The7tvEmotes/The7tvEmotes.svelte';

  const data = $derived(page.data as PageData);

  const tabs = [
    { id: 1, label: 'Global' },
    { id: 2, label: 'Channel' },
    { id: 3, label: 'Subs' },
  ] as const;

  type Tab = (typeof tabs)[number];
  let activeTab: Tab = $state(tabs[0]);
</script>

<div class="flex justify-center mb-5 mt-3 gap-2">
  {#each tabs as tab}
    <button
      class={`w-1/2 p-1.5 text-sm border border-[#ffc9c9] hover:bg-[#763436] ${
        activeTab.id === tab.id ? 'bg-[#763436]' : 'bg-[#111111] cursor-pointer'
      }`}
      onclick={() => (activeTab = tab)}
    >
      {tab.label}
    </button>
  {/each}
</div>
{#if activeTab.label === 'Global'}
  <GlobalEmotes data={{ emotesPromise: data.globalEmotesPromise }} />
{:else if activeTab.label === 'Subs'}
  <SubEmotes data={{ emotesPromise: data.subbedEmotesPromise }} />
{:else if activeTab.label === 'Channel'}
  <The7tvEmotes data={{ emotesPromise: data.the7tvEmotesPromise }} />
{/if}
