<script>
  import {categoriesStore} from '../store.js';
  import CategoryDialog from '../components/CategoryDialog.svelte';

  let categories = [];
  categoriesStore.subscribe(value => categories = value);

  const showDialog = (event) => {
    document.getElementById('category_dialog').showModal();
  }

  const addCategory = (event) => {
    let lastId = categories.length + 1;
    categories.push({
      id:lastId,
      name:event.detail.name
    });
    categoriesStore.set(categories);
  }

</script>

<div class="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid">
  <div class="mdl-cell mdl-cell--12-col mdl-grid">
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
            on:click={showDialog}>
      <i class="material-icons">add</i>
      Добавить категорию
    </button>
    <CategoryDialog on:addCategory={addCategory} id="category_dialog"></CategoryDialog>
  </div>
  <div class="mdl-cell mdl-cell--12-col mdl-grid">
    <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
      <thead>
        <tr>
          <th>ID</th>
          <th>Наименование</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each categories as { id, name }, i}
        <tr>
          <td>{id}</td>
          <td>{name}</td>
          <td></td>
        </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>