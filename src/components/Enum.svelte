<script>
  export let definition;
  console.log(definition.default);
</script>

<enums>
  <general>
    <div>Type: {definition.type}</div>

    {#if definition.hasOwnProperty("default")}
      <div>Default: {definition.default}</div>
    {:else}
      <div>Default: -</div>
    {/if}
  </general>

  <enums-values>
    <enum-header>
      <div>Enum</div>
      <div>Value</div>
    </enum-header>
    {#each definition.enum as enumValue, index}
      <enum-value>
        <div>{enumValue}</div>
        <div>{definition["x-enumNames"][index]}</div>
      </enum-value>
    {/each}
  </enums-values>
</enums>

<style>
  enums {
    padding: 1em;
  }

  enums-values {
    display: flex;
    flex-direction: column;
    padding-top: 5px;
  }

  enum-value {
    display: flex;
    flex: 1;
    flex-direction: row;
  }

  enum-header {
    display: flex;
    flex: 1;
    flex-direction: row;
  }

  enum-header > div {
    flex: 1;
    border-bottom: 1px solid;
    border-top: 1px solid;
    padding-left: 5px;
  }

  enum-value > div {
    flex: 1;
    padding-left: 5px;
  }

  general > div {
    padding-left: 5px;
  }
</style>
