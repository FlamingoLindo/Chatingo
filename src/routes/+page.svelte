<script lang="ts">
  import ChannelList from "$lib/components/Channel_list/Channel_list.svelte";
  import CustomModal from "$lib/components/shared/Custom_modal/Custom_modal.svelte";
  import ChatInput from "../lib/components/Chat_input/Chat_input.svelte";

  let messages = $state<string[]>([]);

  function handleMessageSubmit(message: string) {
    console.log("Sending message:", message);
    messages.push(`15:03 flamingo_lindo: ${message}`);
    // Here you can call your Tauri backend or websocket to send the message
    // await invoke("send_message", { message });
  }
</script>

<main class="flex flex-col h-[calc(100vh-30px)] bg-black">
  <div class="flex-1 overflow-y-auto p-1">
    <ChannelList />

    <h1 class="text-white">15:03 flamingo_lindo: test</h1>

    {#each messages as msg}
      <h1 class="text-white">{msg}</h1>
    {/each}
  </div>

  <ChatInput onSubmit={handleMessageSubmit} />
</main>
