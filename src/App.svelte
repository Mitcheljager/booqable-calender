<script>
	import { today, currentWeek, currentYear, startDateOfWeek } from "./stores/dates.js"

	import Header from "./components/Header.svelte"
	import Content from "./components/Content.svelte"
</script>

<main class="board">
	<header class="board__header">
		<Header />
	</header>

	<div class="board__content" data-role="content">
		<Content />
	</div>
</main>

<style lang="scss">
	.board {
		display: grid;
		grid-template-rows: 200px auto;
		height: 100vh;
		width: 100vw;
		overflow: hidden;
	}

	.board__header {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-top: 1rem;
		background: #333;
		text-align: center;
	}

	.board__content {
		position: relative;
		height: 100%;
		background-image: linear-gradient(to right, #222 0%, #222 50%, #2f2f2f 50%, #2f2f2f 100%);
    background-size: #{ (100% / 7) * 2 };
		overflow-y: auto;

		&::-webkit-scrollbar {
	    width: 0;
			height: 0;
			background: transparent;
	  }
	}
</style>
