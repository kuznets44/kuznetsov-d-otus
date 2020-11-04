<script>
	import Header from "./components/Header.svelte";
	import OutcomesTable from "./routes/OutcomesTable.svelte";
	import OutcomesCategories from "./routes/OutcomesCategories.svelte";
	import Router from "svelte-spa-router";
	import { wrap } from "svelte-spa-router/wrap";
	import {link} from "svelte-spa-router";
	import active from "svelte-spa-router/active";

	let pageTitle = 'Расходы';

	const routes = {
		'/': wrap({
        component: OutcomesTable,
        userData: {pageTitle: 'Расходы',showSearchForm:true}
    }),
		'/category': wrap({
        component: OutcomesCategories,
        userData: {pageTitle: 'Категории расходов',showSearchForm:false}
    })
	};

	const setPageProps = (event) => {
		pageTitle = event.detail.userData.pageTitle;
	}

</script>

<div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
	<header class="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
		<Header pageTitle={pageTitle}></Header>
	</header>
	<div class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
		<header class="demo-drawer-header">
			<img src="images/money.svg" class="demo-avatar" alt="Svelte Home Finance">
		</header>
		<nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">
			<a	class="mdl-navigation__link"
					href="/"
					use:link
					use:active={{path: '/', className: 'active'}}><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>Расходы</a>
			<a	class="mdl-navigation__link"
					href="/category"
					use:link
					use:active={{path: '/category', className: 'active'}}><i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">category</i>Категории</a>
		</nav>
	</div>
	<main class="mdl-layout__content mdl-color--grey-100">
		<div class="mdl-grid demo-content">
			<Router {routes} on:routeLoaded={setPageProps}></Router>
		</div>
	</main>
</div>