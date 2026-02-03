<script lang="ts">
  import "../app.css";
  import { getCurrentWindow } from "@tauri-apps/api/window";
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();

  let appWindow = $state(getCurrentWindow());

  function minimize() {
    appWindow.minimize();
  }

  function toggleMaximize() {
    appWindow.toggleMaximize();
  }

  function close() {
    appWindow.close();
  }
</script>

<div class="titlebar">
  <div data-tauri-drag-region class="app-name">Chatingo</div>

  <div class="controls">
    <!-- Acc -->
    <button onclick={() => console.log("configs")} title="Account">
      flamingo_lindo
    </button>

    <!-- Settings -->
    <button onclick={() => console.log("configs")} title="Settings">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        ><g fill="none" stroke="#ffffff" stroke-width="2"
          ><path
            d="M14 3.269C14 2.568 13.432 2 12.731 2H11.27C10.568 2 10 2.568 10 3.269c0 .578-.396 1.074-.935 1.286q-.128.052-.253.106c-.531.23-1.162.16-1.572-.249a1.27 1.27 0 0 0-1.794 0L4.412 5.446a1.27 1.27 0 0 0 0 1.794c.41.41.48 1.04.248 1.572a8 8 0 0 0-.105.253c-.212.539-.708.935-1.286.935C2.568 10 2 10.568 2 11.269v1.462C2 13.432 2.568 14 3.269 14c.578 0 1.074.396 1.286.935q.052.128.105.253c.231.531.161 1.162-.248 1.572a1.27 1.27 0 0 0 0 1.794l1.034 1.034a1.27 1.27 0 0 0 1.794 0c.41-.41 1.04-.48 1.572-.249q.125.055.253.106c.539.212.935.708.935 1.286c0 .701.568 1.269 1.269 1.269h1.462c.701 0 1.269-.568 1.269-1.269c0-.578.396-1.074.935-1.287q.128-.05.253-.104c.531-.232 1.162-.161 1.571.248a1.27 1.27 0 0 0 1.795 0l1.034-1.034a1.27 1.27 0 0 0 0-1.794c-.41-.41-.48-1.04-.249-1.572q.055-.125.106-.253c.212-.539.708-.935 1.286-.935c.701 0 1.269-.568 1.269-1.269V11.27c0-.701-.568-1.269-1.269-1.269c-.578 0-1.074-.396-1.287-.935a8 8 0 0 0-.105-.253c-.23-.531-.16-1.162.249-1.572a1.27 1.27 0 0 0 0-1.794l-1.034-1.034a1.27 1.27 0 0 0-1.794 0c-.41.41-1.04.48-1.572.249a8 8 0 0 0-.253-.106C14.396 4.343 14 3.847 14 3.27Z"
          /><path d="M16 12a4 4 0 1 1-8 0a4 4 0 0 1 8 0Z" /></g
        ></svg
      >
    </button>

    <!-- Min -->
    <button onclick={minimize} title="Minimize">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path fill="#ffffff" d="M19 13H5v-2h14z" />
      </svg>
    </button>

    <!-- Max -->
    <button onclick={toggleMaximize} title="Maximize">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path fill="#ffffff" d="M4 4h16v16H4zm2 4v10h12V8z" />
      </svg>
    </button>

    <!-- Close -->
    <button onclick={close} title="Close">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <path
          fill="#ffffff"
          d="M13.46 12L19 17.54V19h-1.46L12 13.46L6.46 19H5v-1.46L10.54 12L5 6.46V5h1.46L12 10.54L17.54 5H19v1.46z"
        />
      </svg>
    </button>
  </div>
</div>

<div class="content">
  {@render children()}
</div>

<style>
  .content {
    padding-top: 30px;
  }
  .app-name {
    display: flex;
    align-items: center;
    padding-left: 5px;
    color: #ffffff;
    font-size: 14px;
    font-family: monospace;
  }
  .titlebar {
    height: 30px;
    background: #111111;
    user-select: none;
    display: grid;
    grid-template-columns: auto max-content;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
  .titlebar > .controls {
    font-family: monospace;

    display: flex;
  }
  .titlebar button {
    appearance: none;
    padding: 0;
    margin: 0;
    border: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    background-color: transparent;
    color: #ffffff;
  }
  .titlebar button:hover {
    background: #ffffff1a;
  }

  .titlebar button:first-child {
    width: auto;
    padding: 0 12px;
    font-size: 13px;
  }
</style>
