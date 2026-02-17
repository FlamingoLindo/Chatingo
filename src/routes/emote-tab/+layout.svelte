<script lang="ts">
  import '../../app.css';
  import { getCurrentWindow } from '@tauri-apps/api/window';
  import type { Snippet } from 'svelte';
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
  <div data-tauri-drag-region class="app-name">Emotes</div>
  <div class="controls">
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
    position: fixed;
    top: 30px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000000;
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
