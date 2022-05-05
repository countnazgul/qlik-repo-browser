<script>
  import { closeModal } from "svelte-modals";

  export let isOpen;
</script>

{#if isOpen}
  <div class="modal">
    <div class="modal__content">
      <definition>
        <header>
          <name> About </name>
          <div class="modal__close" on:click={closeModal} title="Close">×</div>
        </header>

        <info>
          <div>
            Author: Stefan Stoichev ( <a
              href="https://twitter.com/countnazgul"
              target="_blank">@countnazgul</a
            >
            |
            <a href="https://sstoichev.eu" target="_blank">sstoichev.eu</a> |
            <a href="https://github.com/countnazgul" target="_blank">GitHub</a>
            |
            <a
              href="https://stackoverflow.com/users/159365/stefan-stoichev"
              target="_blank">Stack Overflow</a
            >
            )
          </div>
          <div>&nbsp;</div>
          <div>
            The data is sourced from Repository API itself by calling
            <code>/qrs/about/openapi/main</code> endpoint<br />and its based on
            <strong>QSEoW June 2020</strong>
          </div>
          <div>&nbsp;</div>
          <div>
            <strong
              >"Qlik Repository API Browser" is not affiliated with Qlik</strong
            >
          </div>
        </info>
      </definition>
    </div>
  </div>
{/if}

<style>
  definition {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto;
  }

  header {
    grid-column: 1;
    grid-row: 1;
    background-color: cyan;
    height: 40px;
    background-color: cyan;
    display: flex;
    flex-direction: row;
    font-weight: bold;
  }

  name {
    font-weight: bold;
    font-size: 20px;
    padding-left: 10px;
    flex-grow: 1;
    align-self: center;
    color: black;
  }

  .modal__close {
    color: #585858;
    text-decoration: none;
    cursor: pointer;
    width: 25px;
    align-self: auto;
    font-size: 25px;
  }

  .modal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: baseline;
    justify-content: center;
    background: rgba(77, 77, 77, 0.7);
    z-index: 100;
  }

  .modal__content {
    border-radius: 4px;
    position: relative;
    background: #fff;
    background-color: #262626;
    color: white;
    margin-top: 100px;
    margin-left: 0px;
    margin-right: 0px;
    max-height: 80%;
    overflow: auto;
    max-width: 90%;
    min-width: 50%;
  }

  info {
    grid-column: 1;
    grid-row: 2;
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
</style>
