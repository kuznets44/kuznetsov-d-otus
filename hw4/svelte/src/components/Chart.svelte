<script>
	import FusionCharts from 'fusioncharts';
	import Charts from 'fusioncharts/fusioncharts.charts';
  import SvelteFC, { fcRoot } from 'svelte-fusioncharts';

  fcRoot(FusionCharts,Charts);

  export let chartConfig;
</script>

<div id="chart-container" >
  <SvelteFC {...chartConfig} />
</div>

