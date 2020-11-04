<script>
  import { createEventDispatcher } from 'svelte';

  export let id;

  export let name = '';

  const closeDialog = () => {
    document.getElementById(id).close();
  }

  const dispatch = createEventDispatcher();
  const addCategory = () => {
    dispatch('addCategory',{
      name: name
    });
    document.getElementById(id).close();
  }

</script>

<dialog class="mdl-dialog" id="{id}">
  <h4 class="mdl-dialog__title">Добавить категорию</h4>
  <div class="mdl-dialog__content">
    <div class="mdl-textfield mdl-js-textfield">
      <input  class="mdl-textfield__input"
              type="text"
              id="category_name"
              required
              bind:value={name}>
      <label class="mdl-textfield__label" for="category_name">Название категории</label>
    </div>
  </div>
  <div class="mdl-dialog__actions">
    <button type="button" class="mdl-button" on:click={addCategory}>ОК</button>
    <button type="button" class="mdl-button close" on:click={closeDialog}>Cancel</button>
  </div>
</dialog>