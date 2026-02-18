<script lang="ts">
  type SettingsGroupTypes = 'Chat' | 'Others';
  interface ISettings {
    id: string;
    group: SettingsGroupTypes;
    label: string;
  }
  const settings: ISettings[] = [
    {
      id: '1',
      group: 'Chat',
      label: 'Separate messages with lines',
    },
    {
      id: '2',
      group: 'Chat',
      label: 'Different background color',
    },
    { id: '3', group: 'Chat', label: 'Link preview' },
    { id: '4', group: 'Others', label: 'Others' },
  ];

  const grouped = Object.groupBy(settings, (s) => s.group);
</script>

<main class="flex flex-col h-full bg-black text-white">
  <div class="flex-1 overflow-auto p-4">
    {#each Object.entries(grouped) as [group, items]}
      <h1 class="mt-3.5 text-xl font-bold mb-3 border-b border-gray-700 pb-2">
        {group}
      </h1>
      {#each items as setting}
        <div class="flex items-center gap-2 mb-2">
          <input
            class="focus:outline-none focus:ring-0 accent-red-800 hover:accent-pink-500"
            type="checkbox"
            id={setting.id}
            name={setting.label}
          />
          <label for={setting.id}>{setting.label}</label>
        </div>
      {/each}
    {/each}
  </div>
</main>
