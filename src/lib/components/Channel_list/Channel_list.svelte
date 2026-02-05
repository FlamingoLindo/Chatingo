<script lang="ts">
  import AddChannel from "../Add_channel/Add_channel.svelte";
  import CustomModal from "../shared/Custom_modal/Custom_modal.svelte";
  let channels = $state({
    myChannels: [
      {
        id: 1,
        channel: "flamingo_lindo",
        isLive: true,
        newMessages: false,
        isSelected: true,
      },
      {
        id: 2,
        channel: "forsen",
        isLive: false,
        newMessages: true,
        isSelected: false,
      },
      {
        id: 3,
        channel: "nymn",
        isLive: true,
        newMessages: true,
        isSelected: false,
      },
      {
        id: 4,
        channel: "emiru",
        isLive: false,
        newMessages: false,
        isSelected: false,
      },
      {
        id: 5,
        channel: "paymoneywubby",
        isLive: true,
        newMessages: false,
        isSelected: false,
      },
      {
        id: 6,
        channel: "robcdee",
        isLive: false,
        newMessages: true,
        isSelected: false,
      },
      {
        id: 7,
        channel: "criticalrole",
        isLive: true,
        newMessages: true,
        isSelected: false,
      },
      {
        id: 8,
        channel: "qwertyuiopasdfghjklçzxcvbnm",
        isLive: true,
        newMessages: true,
        isSelected: false,
      },
    ],
  });

  let isModalOpen: boolean = $state(false);
  let selectedChannelId: number | null = $state(null);

  function selectChannel(id: number) {
    channels.myChannels.forEach((c) => {
      c.isSelected = c.id === id;
      if (c.id === id) {
        c.newMessages = false;
      }
    });
  }

  function openRemoveModal(id: number) {
    selectedChannelId = id;
    isModalOpen = true;
  }

  function removeChannel() {
    if (selectedChannelId !== null) {
      channels.myChannels = channels.myChannels.filter(
        (c) => c.id !== selectedChannelId,
      );
      if (channels.myChannels.length > 0) {
        channels.myChannels[0].isSelected = true;
      }
      isModalOpen = false;
      selectedChannelId = null;
    }
  }

  function handleWheel(event: WheelEvent) {
    event.preventDefault();
    const currentIndex = channels.myChannels.findIndex((c) => c.isSelected);
    let nextIndex;

    if (event.deltaY > 0) {
      nextIndex = (currentIndex + 1) % channels.myChannels.length;
    } else {
      nextIndex =
        (currentIndex - 1 + channels.myChannels.length) %
        channels.myChannels.length;
    }

    selectChannel(channels.myChannels[nextIndex].id);
  }
</script>

<div class="text-white text-xs flex justify-between" onwheel={handleWheel}>
  <CustomModal
    title={"Remove this channel"}
    text={"Are you sure that you want to remove this channel?"}
    bind:isModalOpen
    onConfirm={removeChannel}
  />
  <ul class="flex flex-wrap">
    {#each channels.myChannels as channel}
      <!-- Channel -->
      <button
        onclick={() => selectChannel(channel.id)}
        class="relative mr-1 p-1 min-w-24 border border-red-200 hover:bg-[#ff64676c] transition ease-in-out flex items-center {channel.isSelected
          ? 'bg-[#ffffff6c]'
          : ''} mb-1.5"
      >
        <!-- New messages -->
        <div class="absolute top-0 left-0 w-full flex items-stretch">
          <p
            class="w-full h-0.5 {channel.newMessages
              ? 'bg-white'
              : 'bg-auto'} animate-pulse mx-auto rounded-b-xl"
          ></p>
        </div>

        <!-- Left spacer to balance right side -->
        <div class="w-8"></div>

        <!-- Center: Channel name -->
        <li class="flex-1 text-center">{channel.channel}</li>

        <div class="flex items-center gap-2 w-8 justify-end">
          <!-- Is channel live -->
          <p
            class="rounded-full w-1.5 h-1.5 {channel.isLive
              ? 'bg-red-500'
              : 'bg-transparent'}"
          ></p>

          <!-- Close button -->
          {#if channel.isSelected}
            <span
              role="button"
              tabindex="0"
              class="hover:bg-[#ffffff36]"
              onclick={(e) => {
                e.stopPropagation();
                openRemoveModal(channel.id);
              }}
              onkeydown={(e) => {
                if (e.key === "Enter") {
                  e.stopPropagation();
                  openRemoveModal(channel.id);
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffffff"
                  d="M13.46 12L19 17.54V19h-1.46L12 13.46L6.46 19H5v-1.46L10.54 12L5 6.46V5h1.46L12 10.54L17.54 5H19v1.46z"
                />
              </svg>
            </span>
          {/if}
        </div>
      </button>
    {/each}

    <!-- Add new channel -->
    <AddChannel bind:channels />
  </ul>
</div>
