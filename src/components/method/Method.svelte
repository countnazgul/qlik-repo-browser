<script>
  import { slide } from "svelte/transition";

  import Parameter from "./Parameter.svelte";
  import Response from "./Response.svelte";

  export let httpMethod;
  export let methodData;
  export let index;

  let isDeprecated =
    methodData["x-qlik-deprecated"] || methodData.deprecated ? true : false;
  const toggle = () => (collapsed = !collapsed);

  const queryParameters = methodData.parameters
    ? methodData.parameters.filter((p) => p.in == "query")
    : [];
  const urlParameters = methodData.parameters
    ? methodData.parameters.filter((p) => p.in == "path")
    : [];
  const bodyParameters = methodData.parameters
    ? methodData.parameters.filter((p) => p.in == "body")
    : [];

  const stabilityHelpText = {
    Locked:
      "This API is extremely reliable and will not be broken unless absolutely necessary.",
    Stable: "This API is reliable and breaking changes are unlikely.",
    Experimental:
      "This API is under development. Do not rely on it. It may change or be removed in future versions.",
  };

  let collapsed = index == 0 ? false : true;
</script>

<method>
  <general class={httpMethod}>
    <http-method on:click={toggle}
      >{httpMethod.toUpperCase()}
      {#if isDeprecated}
        (deprecated)
      {/if}
    </http-method>
    <stability title={stabilityHelpText[methodData["x-qlik-stability"]]}>
      {#if methodData["x-qlik-stability"] == "Locked"}
        <span>LOCKED</span>
      {/if}

      {#if methodData["x-qlik-stability"] == "Stable"}
        <span>STABLE</span>
      {/if}

      {#if methodData["x-qlik-stability"] == "Experimental"}
        <span class="experimental">EXPERIMENTAL</span>
      {/if}
    </stability>
    <collapse on:click={toggle}>
      {#if collapsed}
        <!-- Arrow down -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          ><path
            d="M17.418 6.109c.272-.268.709-.268.979 0s.271.701 0 .969l-7.908 7.83c-.27.268-.707.268-.979 0l-7.908-7.83c-.27-.268-.27-.701 0-.969.271-.268.709-.268.979 0L10 13.25l7.418-7.141z"
          /></svg
        >
      {/if}

      {#if !collapsed}
        <!-- Arrow up -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M 17.418 14.908 C 17.69 15.176 18.127 15.176 18.397 14.908 C 18.667 14.64 18.668 14.207 18.397 13.939 L 10.489 6.109 C 10.219 5.841 9.782 5.841 9.51 6.109 L 1.602 13.939 C 1.332 14.207 1.332 14.64 1.602 14.908 C 1.873 15.176 2.311 15.176 2.581 14.908 L 10 7.767 L 17.418 14.908 Z"
          />
        </svg>
      {/if}
    </collapse>
  </general>
  {#if !collapsed}
    <content transition:slide={{ duration: 300 }}>
      {#if queryParameters.length > 0 || urlParameters.length > 0 || bodyParameters.length > 0}
        <parameters>
          <parameters-header>
            <div>Parameters</div>
          </parameters-header>
          <types>
            {#if urlParameters.length > 0}
              <url class="parameters-container">
                <div>Path</div>
                <div>
                  {#each urlParameters as parameter}
                    <Parameter {parameter} />
                  {/each}
                </div>
              </url>
            {/if}
            {#if queryParameters.length > 0}
              <query class="parameters-container">
                <div>Query</div>
                <div>
                  {#each queryParameters as parameter}
                    <Parameter {parameter} />
                  {/each}
                </div>
              </query>
            {/if}
            {#if bodyParameters.length > 0}
              <request-body>
                <div>Body</div>
                <div>
                  {#each bodyParameters as parameter}
                    <Parameter {parameter} />
                  {/each}
                </div>
              </request-body>
            {/if}
          </types>
        </parameters>
      {/if}
      {#if Object.entries(methodData.responses).length > 0}
        <responses>
          <responses-header>
            <div>Responses</div>
          </responses-header>
          <response>
            <response-header>
              <div>Status</div>
              <div>Type</div>
              <div>Format</div>
            </response-header>
            {#each Object.entries(methodData.responses) as response}
              <Response {response} />
            {/each}
          </response>
        </responses>
      {/if}
    </content>
  {/if}
</method>

<style>
  method {
    display: grid;
    grid-template-rows: auto auto;
  }

  general {
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 10px;
  }

  stability {
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: end;
  }

  collapse {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding-right: 5px;
  }

  .experimental {
    color: red;
  }

  content {
    display: grid;
    grid-template-rows: auto auto;
    border-left: 1px solid;
    border-right: 1px solid;
    border-bottom: 1px solid;
    border-color: #49cc90;
    gap: 10px;
  }

  .post {
    background-color: rgb(102, 217, 229);
    color: black;
  }

  .get {
    background-color: rgb(166, 226, 46);
    color: black;
  }

  .put {
    background-color: rgb(184, 138, 245);
    color: black;
  }

  .delete {
    background-color: rgb(253, 108, 161);
    color: black;
  }

  .deprecated {
    background-color: rgb(110, 110, 110);
    color: black;
  }

  http-method {
    display: flex;
    align-items: center;
    padding-left: 10px;
    font-size: 20px;
    font-weight: bold;
  }

  parameters {
    display: grid;
    grid-template-rows: 40px auto;
    gap: 10px;
  }

  types {
    display: flex;
    flex-direction: row;
    grid-template-columns: 1fr;
    gap: 10px;
    grid-column: 1 / span 2;
    padding-left: 10px;
  }

  parameters-header {
    grid-row: 1;
    grid-column: 1 / span 2;
    font-size: 20px;
    background-color: gray;
    display: flex;
    align-items: center;
  }

  parameters-header > div {
    padding-left: 10px;
  }

  url {
    flex-grow: 1;
  }

  url > div:first-of-type {
    border-bottom: 1px solid #353535;
  }

  query {
    flex-grow: 1;
  }

  query > div:first-of-type {
    border-bottom: 1px solid #353535;
  }

  request-body {
    flex-grow: 1;
  }

  request-body > div:first-of-type {
    border-bottom: 1px solid #353535;
  }

  .parameters-container {
    display: grid;
    grid-template-rows: 20px auto;
  }

  responses {
    display: grid;
    grid-template-rows: 40px auto;
  }

  responses-header {
    font-size: 20px;
    background-color: gray;
    display: flex;
    align-items: center;
  }

  responses-header > div {
    padding-left: 10px;
  }

  response {
    padding-left: 10px;
  }

  response-header {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #353535;
  }

  response-header > div {
    flex: 1;
  }
</style>
