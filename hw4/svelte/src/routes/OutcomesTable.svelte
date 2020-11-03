<script>
  import {categoriesStore,outcomesStore} from '../store.js';
  import Chart from '../components/Chart.svelte';
  import OutcomeDialog from '../components/OutcomeDialog.svelte';

  let outcomes = [];
  outcomesStore.subscribe(value => outcomes = value);

  let categories = [];
  categoriesStore.subscribe(value => categories = value);

  const getCategoryName = (id) => {
		let categoriesFiltered = categories.filter(category => category.id == id);
		return categoriesFiltered[0].name;
  };
  
  const showDialog = (event) => {
    document.getElementById('outcome_dialog').showModal();
  }
  
  const getFormattedSum = (value) => {
    const re = /(?=\B(?:\d{3})+(?!\d))/g;
    return `${value.toString().replace(re,' ')} руб.`;
  };
  
  const getFormattedDate = (value) => {
    return `${value.getDate()}.${value.getMonth()}.${value.getYear()}`;
  };

  const getChartData = () => {
    return outcomes.reduce( (curValue, item) => {
      const label = getCategoryName(item.category_id);
      let target = curValue.find( curValueItem => curValueItem.label === label);

      if(target != undefined) {
        target.value += item.value;
      } else {
        curValue.push({
          label: label,
          value: item.value
        });
      }

      return curValue;
    },[]);

  }

  const getChartConfig = () => {
    let dataSource = {
      "chart": {
        "caption": "Расходы по категориям",
        "subCaption": "",
        "showValues": "1",
        "showPercentInTooltip": "0",
        "numberPrefix": "",
        "enableMultiSlicing": "1",
        "theme": "fusion"
      },
      "data": getChartData()
    };

    return {
        type: 'pie3d',
        width: '100%',
        renderAt: 'chart-container',
        dataSource
    };
  }
  let chartConfig = getChartConfig();


  const addOutcome = (event) => {
    let lastId = outcomes.length + 1;
    outcomes.push({
      id:lastId,
      date:event.detail.date,
      name:event.detail.name,
      category_id:event.detail.category_id,
      value: event.detail.value
    });
    outcomesStore.set(outcomes);
    chartConfig = getChartConfig();
  }
  

</script>

<div class="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--8-col">
  <div class="mdl-cell">
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
            on:click={showDialog}>
      <i class="material-icons">add</i>
      Добавить расход
    </button>
    <OutcomeDialog  id="outcome_dialog"
                    categories={categories}
                    on:addOutcome={addOutcome} ></OutcomeDialog>
  </div>
  <table class="mdl-data-table mdl-js-data-table data-table-outcomes mdl-shadow--2dp">
    <thead>
      <tr>
        <th class="data-table-outcomes__date">Дата</th>
        <th class="data-table-outcomes__category">Категория</th>
        <th class="data-table-outcomes__name">Наименование</th>
        <th class="data-table-outcomes__value">Расход</th>
        <th class="data-table-outcomes__actions"> </th>
      </tr>
    </thead>
    <tbody>
      {#each outcomes as { id, date, category_id, name, value }, i}
      <tr>
        <td>{getFormattedDate(date)}</td>
        <td>{getCategoryName(category_id)}</td>
        <td>{name}</td>
        <td>{getFormattedSum(value)}</td>
        <td> </td>
      </tr>
      {/each}
    </tbody>
  </table>
</div>
<div class="demo-cards mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing">
  <div class="demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop">
    <Chart chartConfig={chartConfig}></Chart>
  </div>
</div>

