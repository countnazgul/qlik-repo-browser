<script>
  //   import { openAPI } from "./openAPI_data";
  import { openModal, modals } from "svelte-modals";

  import Modal from "../DefinitionModal.svelte";
  import EnumModal from "../EnumModal.svelte";
  // import Enum from "../Enum.svelte";
  import { getDefinitionData } from "../../data";
  export let parameter;

  $: activeModal = $modals.length;

  function handleEnumClick(definition) {
    openModal(EnumModal, {
      definition,
    });
  }

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

<parameter>
  <div class:required={parameter.required}>
    {parameter.name}
    {#if parameter.required}
      <span>*</span>
    {/if}
  </div>
  {#if parameter.type}
    {#if !parameter.enum}
      <div>{parameter.type}</div>
    {:else}
      <div
        class:definition={parameter.enum}
        on:click={() => handleEnumClick(parameter)}
      >
        {parameter.type}
      </div>
    {/if}
    <!-- {#if parameter.format}
      <div>{parameter.format}</div>
    {/if} -->
  {/if}
  {#if parameter.schema && parameter.schema["$ref"]}
    <div
      class="definition"
      on:click={() => handleClick(getDefinitionData(parameter.schema["$ref"]))}
    >
      {getDefinitionData(parameter.schema["$ref"])}
    </div>
  {/if}

  {#if parameter.schema && parameter.schema.type && parameter.schema.type == "array"}
    <div>
      array [ <span
        on:click={() =>
          handleClick(getDefinitionData(parameter.schema.items["$ref"]))}
        class="definition"
      >
        {getDefinitionData(parameter.schema.items["$ref"])}
      </span>]
    </div>
  {/if}

  {#if parameter.schema && parameter.schema.type && parameter.schema.type != "array"}
    <div>
      {#if parameter.schema.items}
        array [ <span class="definition">
          {parameter.schema.items.type}
        </span>]
      {:else}
        {parameter.schema.type}
      {/if}
    </div>
  {/if}
</parameter>

<style>
  .required {
    font-weight: bold;
  }

  .required > span {
    color: red;
    font-weight: normal;
  }

  .required::after {
    color: rgba(255, 0, 0, 0.6);
    content: "required";
    font-size: 10px;
    padding-left: 1px;
    position: relative;
    top: -6px;
    font-weight: normal;
  }

  parameter {
    display: flex;
    flex-direction: row;
  }

  parameter > div {
    flex: 1;
  }

  .definition {
    color: #00ff86;
    text-decoration: underline dotted;
    text-underline-position: under;
    cursor: pointer;
  }
</style>
