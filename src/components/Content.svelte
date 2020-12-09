<script>
  import { onMount, afterUpdate } from "svelte"

  import { orders } from "../stores/data.js"
  import { today, currentDay, currentWeek, currentYear, viewingWeek, startDateOfWeek } from "../stores/dates.js"

  $: endDate =  new Date($startDateOfWeek.getTime() + 86400000 * 6)
  $: dateArray = []
  $: days = Array(7)

  onMount(() => {
    getData()
  })

  afterUpdate(() => {
    createDateArray()
  })

  function getData() {
    const url = "https://demo.booqable.com/api/3/orders?api_key=25de2829cb40988699612bc98a118b51&filter[date][type]=query&filter[date][starts_at][gte]=2020-12-08&filter[date][starts_at][lte]=2020-12-10%2023%3A59"
    fetch(url, {
      method: "get"
    })
    .then(response => response.text())
    .then(data => {
      const parsedData = JSON.parse(data)
      orders.set(parsedData)

      console.log($orders)
    })
    .catch(() => {
      alert("Something went wrong when retrieving your data")

      orders.set(["error"])
    })
  }

  function createDateArray() {
    Array.from(days).forEach((day, i) => {
      days[i] = new Date($startDateOfWeek.getTime() + 86400000 * i)
    })
  }

  function ordersOnDate(date) {
    if ($orders.data) {
      return $orders.data.filter(order => {
        const parsedOrderDate = new Date(Date.parse(order.attributes.starts_at)).toDateString()
        return parsedOrderDate == date.toDateString()
      })
    } else {
      return []
    }
  }
</script>

{ endDate }

<div class="grid">
  { #if $orders.length == 0 }
    <div class="loading">
      <div class="spinner"></div>
    </div>
  { /if }

  { #each days as day }
    <div class="grid__column">
      { #each ordersOnDate(day) as order, i }
        <div class="grid__item" style="transform: translateY({ i * 20 }px)">{ order.attributes.starts_at }</div>
      { /each }
      { day }
    </div>
  { /each }
</div>

<style lang="scss">
  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    height: 100%;
  }

  .grid__column {
    position: relative;
    padding: 1rem 0;
    min-width: 0;
    border-right: 1px solid gray;

    &:last-child {
      border-right: 0;
    }
  }

  .grid__item {
    background: blueviolet;
  }

  .loading {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, .25);
  }

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  .spinner {
    display: block;
    width: 2rem;
    height: 2rem;

    &::after {
      content: "";
      display: block;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      border: .25rem solid white;
      border-color: white rgba(255, 255, 255, .1) rgba(255, 255, 255, .1);
      animation: spinner 750ms linear infinite;
    }
  }
</style>
