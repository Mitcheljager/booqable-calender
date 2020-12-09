<script>
  import { onMount } from "svelte"

  import { daysOfTheWeek } from "../stores/daysOfTheWeek.js"
  import { monthNames } from "../stores/monthNames.js"
  import { today, currentDay, currentWeek, currentYear, viewingWeek, startDateOfWeek } from "../stores/dates.js"

  let weekNumber = $currentWeek
  $: if ($viewingWeek > 53) {
    weekNumber = $viewingWeek - 53
  } else if ($viewingWeek < 1) {
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
		startDateOfWeek.set(new Date($currentYear, 0, ($viewingWeek - 1) * 7 - ($today.getDay() - 1)))
	}
</script>

<div>
  <div>
    { $monthNames[$startDateOfWeek.getMonth()] }
    { $startDateOfWeek.getFullYear() }
  </div>

  <h1 class="title">Week { weekNumber }</h1>

  <button class="button" on:click={ () => setWeek(-1) }>← Prev week</button>
  <button class="button" on:click={ () => setWeek(1) }>Next week →</button>
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
    background: #444;
  }

  .days-header__item {
    padding: 1rem 0;
    border-right: 1px solid #666;

    &:last-child {
      border-right: 0;
    }

    &--today {
      background: dodgerblue;
    }
  }

  .days-header__date {
    font-size: .75rem;
    color: lightgray;
  }

  .title {
    margin: 1rem 0;
  }

  .button {
    display: inline-block;
    height: 2rem;
    background: #555;
    border: 0;
    border-radius: 99px;
    padding: .25rem 1rem;
    font-weight: bold;
    color: white;
    cursor: pointer;

    &:hover {
      background: gray;
    }
  }
</style>
