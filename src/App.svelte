<script>
	import { onMount } from "svelte"
	import { today, currentWeek, currentYear, startDateOfWeek } from "./stores/dates.js"

	import Header from "./components/Header.svelte"
</script>

<main class="board">
	<header class="board__header">
		<Header />
	</header>

	<div class="board__content">

	</div>
</main>

<style>
	.board {
		display: grid;
		grid-template-rows: 200px auto;
		height: 100vh;
		width: 100vw;
	}

	.board__header {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: #111;
		text-align: center;
	}

	.board__content {
		background: #333;
		overflow-y: scroll;
	}
</style>
