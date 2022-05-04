<script lang="ts">
  import { onMount, tick } from "svelte";
  import { NinjaKeys } from "ninja-keys";
  import { Modals, closeModal, openModal } from "svelte-modals";

  import { ninjaData } from "./data";
  import Method from "./components/method/Method.svelte";
  import Info from "./components/InfoModal.svelte";
  import HomeSVG from "./components/svg/Home.svelte";
  import MenuSVG from "./components/svg/Menu.svelte";
  import InfoSVG from "./components/svg/Info.svelte";
  import GithubSVG from "./components/svg/GitHub.svelte";

  let ninja;
  let transition = true;

  let methodData = undefined;
  let urlPath = "";

  onMount(() => {
    ninja = document.querySelector("ninja-keys");
    ninja.data = ninjaData();
    // ninja.open();
  });

  async function handleSelected(event) {
    if (!event.detail.action.parent) {
      methodData = {};
      urlPath = "";
      ninja.open({ parent: `${event.detail.action.id}` });
    }

    if (event.detail.action.parent) {
      urlPath = event.detail.action.id;
      transition = true;
      methodData = { ...event.detail.action.data };
      transition = false;
      ninja.close();
    }

    return true;
  }

  function openInfo() {
    openModal(Info);
  }
</script>

<Modals>
  <div slot="backdrop" class="backdrop" on:click={closeModal} />
</Modals>

<ninja-keys
  on:selected={handleSelected}
  on:change={() => (transition = true)}
  placeholder="Qlik Sense Repository API"
/>

{#if !transition}
  <main>
    <header>
      <url-path>{urlPath}</url-path>
      <menu>
        <div on:click={() => window.location.reload()} title="Home">
          <HomeSVG />
        </div>
        <div
          on:click={() => ninja.open()}
          title="Show Endpoints (Ctrl+K or CMD+K)"
        >
          <MenuSVG />
        </div>
      </menu>
    </header>
    <methods>
      {#each Object.entries(methodData) as objectData, index}
        {#if objectData[0] != "Area"}
          <Method
            methodData={objectData[1]}
            httpMethod={objectData[0]}
            {index}
          />
        {/if}
      {/each}
    </methods>
  </main>
{:else}
  <main-page>
    <main-header>
      <a
        aria-label="github"
        href="https://github.com/countnazgul/qlik-repo-browser"
        title="Source code"
      >
        <GithubSVG />
      </a>

      <div on:click={openInfo} style="cursor: pointer;" title="About">
        <InfoSVG />
      </div>
    </main-header>
    <placeholder>
      <div>Welcome to Qlik Repository API browser!</div>
      <div>
        To start press "Cmd+K" or "Ctrl+K" or click <span
          class="link"
          on:click={() => ninja.open()}>here</span
        >
      </div>
    </placeholder>
  </main-page>
{/if}

<style>
  :global(body) {
    background-color: #262626;
    color: white;
  }
  @media screen and (prefers-color-scheme: light) {
    :global(body) {
      background-color: white;
      color: #262626;
    }
  }

  :global(html) {
    --text-color-normal: #0a244d;
    --text-color-light: #8cabd9;
  }

  :global(html[data-theme="dark"]) {
    --text-color-normal: hsl(210, 10%, 62%);
    --text-color-light: hsl(210, 15%, 35%);
    --text-color-richer: hsl(210, 50%, 72%);
    --text-color-highlight: hsl(25, 70%, 45%);
  }

  :global(.ninja-title) {
    font-weight: bolder;
  }

  ninja-keys::part(ninja-title) {
    font-weight: bolder;
  }

  header {
    display: flex;
    position: sticky;
  }

  menu {
    display: flex;
    align-self: center;
    cursor: pointer;
    gap: 10px;
  }

  url-path {
    font-weight: bold;
    font-size: 2.25em;
    flex-grow: 1;
  }

  methods {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 10px;
    overflow: auto;
  }

  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  main {
    display: grid;
    grid-template-rows: max-content auto;
    overflow: hidden;
    height: 100%;
  }

  main-page {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  main-header {
    display: flex;
    flex-direction: row-reverse;
    gap: 10px;
  }

  placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .link {
    cursor: pointer;
    color: blue;
  }
</style>
