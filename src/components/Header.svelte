<script>
  import { daysOfTheWeek } from "../stores/daysOfTheWeek.js"
  import { today, currentDay, currentWeek, currentYear, viewingWeek, startDateOfWeek } from "../stores/dates.js"
  import { onMount } from "svelte"

  let weekNumber = $currentWeek
  $: if ($viewingWeek > 53) {
    weekNumber = $viewingWeek - 53
  } else if ($viewingWeek < 0) {
    weekNumber = $viewingWeek + 53
  } else {
    weekNumber = $viewingWeek
  }

  onMount(() => { setStartDateOfWeek() })

	function setWeek(value) {
		viewingWeek.set($viewingWeek + value)

		setStartDateOfWeek()
	}

	function setStartDateOfWeek(date = $today) {
		startDateOfWeek.set(new Date($currentYear, 0, ($viewingWeek - 1) * 7 - $today.getDay()))
	}
</script>

<h1>Current Week { weekNumber }</h1>

{ $startDateOfWeek.toDateString() }

<div>
  <button on:click={ () => setWeek(-1) }>-</button>
  <button on:click={ () => setWeek(1) }>+</button>
</div>

<div class="days-header">
  { #each $daysOfTheWeek as day, i }
    <div class="days-header__item { ($currentDay == i && $currentWeek == $viewingWeek) ? "days-header__item--today" : "" }">
      { day }

      <small class="days-header__date">{ new Date($startDateOfWeek.getTime() + (86400000 * i)).getDate() }</small>
    </div>
  { /each }
</div>

<style lang="scss">
  .days-header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border-top: 1px solid gray;
  }

  .days-header__item {
    padding: 1rem 0;
    border-right: 1px solid gray;

    &:last-child {
      border-right: 0;
    }

    &--today {
      background: dodgerblue;
    }
  }

  .days-header__date {
    display: block;
    font-size: 0.75rem;

  }
</style>
