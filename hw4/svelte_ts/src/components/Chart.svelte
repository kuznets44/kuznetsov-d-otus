<script lang="ts">
	import FusionCharts from 'fusioncharts';
	import Charts from 'fusioncharts/fusioncharts.charts';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

  fcRoot(FusionCharts,Charts);

  export let chartConfig:Object;
</script>

<div id="chart-container" >
  <SvelteFC {...chartConfig} />
</div>

