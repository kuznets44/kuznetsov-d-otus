<script lang="ts">
  import {categoriesStore,outcomesStore} from '../store.js';
  import Chart from '../components/Chart.svelte';
  import OutcomeDialog from '../components/OutcomeDialog.svelte';
  import type { ChartValue, Outcome, OutcomeCategory } from '../types.js';

  let outcomes: Outcome[] = [];
  outcomesStore.subscribe( value => outcomes = value);

  let categories:OutcomeCategory[] = [];
  categoriesStore.subscribe( value => categories = value);

  const getCategoryName = (id:number):string => {
		let categoriesFiltered:OutcomeCategory[] = categories.filter( (category:OutcomeCategory) => category.id == id);
		return categoriesFiltered[0].name;
  };
  
  const showDialog = ():void => {
    const dialog:any = document.getElementById('outcome_dialog');
    dialog.showModal();
  }
  
  const getFormattedSum = (value:number):string => {
    const re: RegExp = /(?=\B(?:\d{3})+(?!\d))/g;
    return `${value.toString().replace(re,' ')} руб.`;
  };
  
  const getFormattedDate = (value: Date):string => {
    return `${value.getDate()}.${value.getMonth()}.${value.getFullYear()}`;
  };

  const getChartData = ():ChartValue[] => {
    return outcomes.reduce( (curValue:ChartValue[], item:Outcome):ChartValue[] => {
      const label:string = getCategoryName(item.category_id);
      let target:ChartValue = curValue.find( (curValueItem: ChartValue) => curValueItem.label === label);

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

  const getChartConfig = ():Object => {
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
  let chartConfig:Object = getChartConfig();


  const addOutcome = (event: CustomEvent) => {
    let lastId:number = outcomes.length + 1;
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
      {#each outcomes as { date, category_id, name, value }}
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

