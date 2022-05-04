<script>
  export let response;
  const status = response[0];
  const data = response[1];

  import { openModal, modals } from "svelte-modals";

  import Modal from "../DefinitionModal.svelte";
  import { getDefinitionData } from "../../data";

  $: activeModal = $modals.length;

  function handleClick(ref) {
    openModal(Modal, {
      ref: ref,
      modalsCount: activeModal,
      onOpenAnother: (ref1) => {
        handleClick(ref1);
      },
    });
  }
</script>

<!-- <Modal bind:this={modal} /> -->

<response>
  <div>
    {status}
    {#if data.description}
      &nbsp;{data.description}
    {/if}
  </div>

  <div>
    {#if data.schema}
      {#if data.schema.type}
        {#if data.schema.type == "array"}
          array[]
        {:else}
          {data.schema.type}
        {/if}
      {/if}

      {#if data.schema["$ref"]}
        object
      {/if}

      {#if !data.schema["$ref"] && !data.schema.type}
        -
      {/if}
    {:else}
      <div>-</div>
    {/if}
  </div>

  {#if data.schema}
    {#if data.schema && data.schema["$ref"]}
      <div
        class="definition"
        on:click={() => handleClick(getDefinitionData(data.schema["$ref"]))}
      >
        {getDefinitionData(data.schema["$ref"])}
      </div>
    {/if}

    {#if data.schema && data.schema.type && data.schema.type == "array" && !data.schema["$ref"]}
      <div>
        {#if data.schema.items}
          <span
            on:click={() =>
              handleClick(getDefinitionData(data.schema.items["$ref"]))}
            class="definition"
          >
            {getDefinitionData(data.schema.items["$ref"])}
          </span>
        {:else}
          {data.schema.items.type}
        {/if}
      </div>
    {/if}

    {#if data.schema && data.schema.type && data.schema.type != "array" && data.schema["$ref"]}
      <div>
        <span class="definition">
          {data.schema.items.type}
        </span>
      </div>
    {/if}

    {#if data.schema && data.schema.type && data.schema.type != "array" && !data.schema["$ref"]}
      <div>
        <span>
          {data.schema.type}
          {data.schema.format}
        </span>
      </div>
    {/if}
  {:else}
    <div>-</div>
  {/if}
</response>

<style>
  response {
    display: flex;
    flex-direction: row;
    padding: 10px 0px 10px 0px;
  }

  response > div {
    flex: 1;
  }

  .definition {
    color: #00ff86;
    text-decoration: underline dotted;
    text-underline-position: under;
    cursor: pointer;
  }
</style>
