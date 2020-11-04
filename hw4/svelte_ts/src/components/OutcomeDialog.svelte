<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { OutcomeCategory } from '../types.js';

  export let id:string;
  export let categories:OutcomeCategory[];
  
  let date: string,
      name: string,
      value: number,
      category_id:number;

  const closeDialog = () => {
    let dialog:HTMLDialogElement = document.getElementById(id) as HTMLDialogElement;
    dialog.close();
  }

  const dispatch = createEventDispatcher();
  const addOutcome = ():void => {
    dispatch('addOutcome',{
      date: new Date(Date.parse(date)),
      category_id: category_id,
      name: name,
      value: value
    });

    let dialog:HTMLDialogElement = document.getElementById(id) as HTMLDialogElement;
    dialog.close();
  }

</script>

<dialog class="mdl-dialog" id="{id}">
  <h4 class="mdl-dialog__title">Добавить расход</h4>
  <div class="mdl-dialog__content">
    <div class="mdl-textfield mdl-js-textfield">
      <input  class="mdl-textfield__input"
                type="date"
                id="name"
                required
                bind:value={date}>
    </div>
    <div class="mdl-textfield mdl-js-textfield">
      <input  class="mdl-textfield__input"
              type="text"
              id="name"
              required
              bind:value={name}>
      <label class="mdl-textfield__label" for="name">Название</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield">
      <input  class="mdl-textfield__input"
              type="number"
              id="value"
              required
              bind:value={value}>
      <label class="mdl-textfield__label" for="value">Сумма, руб.</label>
    </div>
    <div class="mdl-textfield mdl-js-textfield">
      <label class="mdl-textfield__label" for="category_id">Категория</label>
      <select class="mdl-textfield__input"
              type="text"
              id="value"
              required
              bind:value={category_id}>
        {#each categories as { id, name }}
          <option value={id}>{name}</option>
        {/each}
      </select>
    </div>
  </div>
  <div class="mdl-dialog__actions">
    <button type="button" class="mdl-button" on:click={addOutcome}>ОК</button>
    <button type="button" class="mdl-button close" on:click={closeDialog}>Cancel</button>
  </div>
</dialog>